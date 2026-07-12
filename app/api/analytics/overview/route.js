import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Analytics from "@/models/Analytics";
import Lynko from "@/models/Lynko";

function getDateThreshold(period) {
  if (period === "all") return new Date(0);
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
    case "90d":
      return new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
    default:
      return new Date(now.getTime() - 24 * 60 * 60 * 1000);
  }
}

export async function GET(req) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const period = searchParams.get("period") || "30d";

  const validPeriods = ["1h", "1d", "7d", "30d", "all"];
  if (!validPeriods.includes(period)) {
    return NextResponse.json(
      { error: "period must be 1h, 1d, 7d, 30d, or all" },
      { status: 400 },
    );
  }

  await connectDB();

  const dateThreshold = getDateThreshold(period);
  const match = { userId, timestamp: { $gte: dateThreshold } };

  const [totalPageViews, totalLinkClicks, uniqueLinksClicked] =
    await Promise.all([
      Analytics.countDocuments({ ...match, eventType: "page_view" }),
      Analytics.countDocuments({ ...match, eventType: "link_click" }),
      Analytics.distinct("linkId", {
        ...match,
        eventType: "link_click",
        linkId: { $ne: null },
      }),
    ]);

  const topLinkAgg = await Analytics.aggregate([
    { $match: { ...match, eventType: "link_click", linkId: { $ne: null } } },
    { $group: { _id: "$linkId", clicks: { $sum: 1 } } },
    { $sort: { clicks: -1 } },
    { $limit: 5 },
    {
      $lookup: {
        from: "lynkos",
        localField: "_id",
        foreignField: "_id",
        as: "link",
      },
    },
    { $unwind: { path: "$link", preserveNullAndEmptyArrays: true } },
    {
      $project: {
        linkId: { $toString: "$_id" },
        title: "$link.title",
        url: "$link.url",
        clicks: 1,
      },
    },
  ]);

  return NextResponse.json({
    totalPageViews,
    totalLinkClicks,
    uniqueLinksClicked: uniqueLinksClicked.length,
    topLinks: topLinkAgg,
    period,
  });
}
