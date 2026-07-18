import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Lynko from "@/models/Lynko";

const TITLE_MAX = 100;
const URL_MAX = 2048;

export async function GET(req) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const links = await Lynko.find({ userId }).sort({ order: 1 });

  return NextResponse.json(links);
}

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

export async function POST(req) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const error = validateLink(body);
  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  await connectDB();

  const linkCount = await Lynko.countDocuments({ userId });
  if (linkCount >= 20) {
    return NextResponse.json(
      { error: "Maximum 20 links allowed" },
      { status: 400 },
    );
  }

  const link = await Lynko.create({
    userId,
    title: body.title,
    url: body.url,
    order: body.order ?? 0,
    isActive: true,
  });

  return NextResponse.json(link, { status: 201 });
}
