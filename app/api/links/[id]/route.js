import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Lynko from "@/models/Lynko";
import Analytics from "@/models/Analytics";

const TITLE_MAX = 100;
const URL_MAX = 2048;

function validateLink(body) {
  if (!body.title || !body.title.trim()) {
    return "Link title is required.";
  }
  if (body.title.length > TITLE_MAX) {
    return `Link title must be ${TITLE_MAX} characters or fewer.`;
  }
  if (!body.url || !body.url.trim()) {
    return "Link URL is required.";
  }
  if (body.url.length > URL_MAX) {
    return `Link URL must be ${URL_MAX} characters or fewer.`;
  }
  return null;
}

export async function PUT(req, { params }) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const error = validateLink(body);
  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  const data = await params;
  const ID = await data.id;
  await connectDB();

  const updated = await Lynko.findOneAndUpdate(
    { _id: ID, userId },
    {
      title: body.title,
      url: body.url,
      order: body.order,
      isActive: body.isActive,
    },
    { new: true },
  );

  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

export async function DELETE(req, { params }) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await params;
  const ID = await data.id;
  await connectDB();

  const deleted = await Lynko.findOneAndDelete({
    _id: ID,
    userId,
  });

  if (!deleted) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await Analytics.deleteMany({ linkId: ID, eventType: "link_click" });

  return NextResponse.json({ success: true });
}
