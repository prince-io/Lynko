import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Lynko from "@/models/Lynko";
import Design from "@/models/Design";
import Analytics from "@/models/Analytics";
import cloudinary from "@/lib/cloudinary";

const GRACE_MS =
  process.env.NODE_ENV === "production" ? 12 * 60 * 60 * 1000 : 10 * 1000;

export async function GET() {
  await connectDB();

  const cutoff = new Date(Date.now() - GRACE_MS);

  const usersToPurge = await User.find({
    isDeleted: true,
    deletionScheduledAt: { $lte: cutoff },
  }).lean();

  let cleaned = 0;

  for (const user of usersToPurge) {
    const clerkUserId = user.clerkUserId;

    await Lynko.deleteMany({ userId: clerkUserId });
    await Design.deleteOne({ clerkUserId });
    await Analytics.deleteMany({ userId: clerkUserId });
    cloudinary.uploader.destroy(`lynko/avatars/${clerkUserId}`).catch(() => {});
    await User.deleteOne({ _id: user._id });

    cleaned++;
  }

  return NextResponse.json({ cleaned });
}
