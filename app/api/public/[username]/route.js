import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Lynko from "@/models/Lynko";
import Design from "@/models/Design";

export async function GET(req, { params }) {
  const data = await params;
  const username = await data.username;

  await connectDB();

  const userDoc = await User.findOne({ username }).lean();

  if (!userDoc) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const USER = {
    ...userDoc,
    _id: userDoc._id.toString(),
  };

  const linksDocs = await Lynko.find({ userId: USER.clerkUserId })
    .sort({ order: 1 })
    .lean();

  const LINKS = linksDocs.map((link) => ({
    ...link,
    _id: link._id.toString(),
  }));

  const designDoc = await Design.findOne({
    clerkUserId: USER.clerkUserId,
  })
    .select("customization")
    .lean();

  const DESIGN = designDoc?.customization || null;

  return NextResponse.json({
    user: USER,
    links: LINKS,
    design: DESIGN,
  });
}
