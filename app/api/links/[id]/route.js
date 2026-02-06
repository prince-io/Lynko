import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Lynko from "@/models/Lynko";

export async function PUT(req, { params }) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
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

  return NextResponse.json({ success: true });
}
