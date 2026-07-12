import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Analytics from "@/models/Analytics";

export async function GET(req) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const match = {
    userId,
    eventType: "link_click",
    linkId: { $ne: null },
  };

  const pipeline = [
    { $match: match },
    { $group: { _id: "$linkId", clicks: { $sum: 1 } } },
    { $sort: { clicks: -1 } },
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
  ];

  const results = await Analytics.aggregate(pipeline);
  const total = results.reduce((sum, r) => sum + r.clicks, 0);

  const links = results.map((r) => ({
    linkId: r.linkId,
    title: r.title || "Unknown",
    url: r.url || "",
    clicks: r.clicks,
    percentage: total > 0 ? Math.round((r.clicks / total) * 10000) / 100 : 0,
  }));

  return NextResponse.json({ links, total });
}
