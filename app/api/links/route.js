import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Lynko from "@/models/Lynko";

export async function GET(req) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const links = await Lynko.find({ userId }).sort({ order: 1 });

  return NextResponse.json(links);
}

export async function POST(req) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  await connectDB();

  const link = await Lynko.create({
    userId,
    title: body.title,
    url: body.url,
    order: body.order ?? 0,
    isActive: true,
  });

  return NextResponse.json(link, { status: 201 });
}
