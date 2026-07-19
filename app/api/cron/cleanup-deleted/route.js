import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { getGraceMs } from "@/lib/gracePeriod";
import User from "@/models/User";
import Lynko from "@/models/Lynko";
import Design from "@/models/Design";
import Analytics from "@/models/Analytics";
import cloudinary from "@/lib/cloudinary";

export async function GET() {
  try {
    await connectDB();

    const GRACE_MS = getGraceMs();
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

      console.log(`Purged user ${clerkUserId} (${user.username})`);
      cleaned++;
    }

    return NextResponse.json({ cleaned });
  } catch (error) {
    console.error("Cleanup cron failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
