import mongoose from "mongoose";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Analytics from "@/models/Analytics";

function getDateThreshold(period) {
  const now = new Date();
  switch (period) {
    case "1h":
      return new Date(now.getTime() - 60 * 60 * 1000);
    case "1d":
      return new Date(now.getTime() - 24 * 60 * 60 * 1000);
    case "7d":
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    case "30d":
      return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    default:
      return new Date(now.getTime() - 24 * 60 * 60 * 1000);
  }
}

function getGranularity(period) {
  switch (period) {
    case "1h":
      return "minute";
    case "1d":
      return "hour";
    case "7d":
      return "day";
    case "30d":
    case "all":
      return "day";
    default:
      return "hour";
  }
}

function generateDateRange(start, end, unit) {
  const dates = [];
  const cursor = new Date(start);

  if (unit === "minute") {
    const ms = 10 * 60 * 1000;
    cursor.setTime(Math.floor(cursor.getTime() / ms) * ms);
  }

  while (cursor <= end) {
    dates.push(new Date(cursor));
    switch (unit) {
      case "minute":
        cursor.setMinutes(cursor.getMinutes() + 10);
        break;
      case "hour":
        cursor.setHours(cursor.getHours() + 1);
        break;
      case "week":
        cursor.setDate(cursor.getDate() + 7);
        break;
      default:
        cursor.setDate(cursor.getDate() + 1);
    }
  }

  return dates;
}

function formatDate(date, unit) {
  if (unit === "minute") {
    return date.toISOString().slice(0, 16) + ":00.000Z";
  }
  if (unit === "hour") {
    return date.toISOString().slice(0, 13) + ":00:00.000Z";
  }
  if (unit === "week") {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    d.setDate(diff);
    d.setHours(0, 0, 0, 0);
    return d.toISOString();
  }
  return date.toISOString().slice(0, 10) + "T00:00:00.000Z";
}

export async function GET(req) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const period = searchParams.get("period") || "30d";
  const linkId = searchParams.get("linkId") || "all";
  const manualGranularity = searchParams.get("granularity");

  const validPeriods = ["1h", "1d", "7d", "30d", "all"];
  if (!validPeriods.includes(period)) {
    return NextResponse.json(
      { error: "period must be 1h, 1d, 7d, 30d, or all" },
      { status: 400 },
    );
  }

  await connectDB();

  const dateThreshold = period === "all"
    ? new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
    : getDateThreshold(period);
  const granularity = manualGranularity || getGranularity(period);

  const match = { userId, timestamp: { $gte: dateThreshold } };
  if (linkId && linkId !== "all") {
    match.linkId = new mongoose.Types.ObjectId(linkId);
  }

  const dateTrunc = { date: "$timestamp", unit: granularity };
  if (granularity === "minute") dateTrunc.binSize = 10;

  const pipeline = [
    { $match: match },
    {
      $group: {
        _id: {
          $dateTrunc: dateTrunc,
        },
        clicks: {
          $sum: { $cond: [{ $eq: ["$eventType", "link_click"] }, 1, 0] },
        },
        views: {
          $sum: { $cond: [{ $eq: ["$eventType", "page_view"] }, 1, 0] },
        },
      },
    },
    { $sort: { _id: 1 } },
    {
      $project: {
        _id: 0,
        date: "$_id",
        clicks: 1,
        views: 1,
      },
    },
  ];

  const results = await Analytics.aggregate(pipeline);

  const dataMap = {};
  for (const row of results) {
    dataMap[row.date.toISOString()] = {
      clicks: row.clicks,
      views: row.views,
    };
  }

  const now = new Date();
  const dateRange = generateDateRange(dateThreshold, now, granularity);
  const data = dateRange.map((d) => {
    const key = formatDate(d, granularity);
    const entry = dataMap[key] || { clicks: 0, views: 0 };
    return { date: key, clicks: entry.clicks, views: entry.views };
  });

  return NextResponse.json({ data, granularity, period });
}
