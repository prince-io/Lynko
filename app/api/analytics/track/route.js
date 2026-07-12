import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Analytics from "@/models/Analytics";

export async function POST(req) {
  try {
    const body = await req.json();
    const { eventType, userId, linkId, metadata } = body;

    if (!eventType || !["link_click", "page_view"].includes(eventType)) {
      return NextResponse.json(
        { error: "eventType must be 'link_click' or 'page_view'" },
        { status: 400 },
      );
    }

    if (!userId || typeof userId !== "string") {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 },
      );
    }

    if (eventType === "link_click" && !linkId) {
      return NextResponse.json(
        { error: "linkId is required for link_click events" },
        { status: 400 },
      );
    }

    await connectDB();

    const doc = await Analytics.create({
      userId,
      eventType,
      linkId: linkId || null,
      metadata: {
        referrer: metadata?.referrer || "",
        country: metadata?.country || "",
        device: metadata?.device || "",
      },
    });

    return NextResponse.json(
      { success: true, id: doc._id.toString() },
      { status: 201 },
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
