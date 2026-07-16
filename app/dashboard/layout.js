import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/mongodb";
import { getGraceMs } from "@/lib/gracePeriod";
import User from "@/models/User";
import DashboardWrapper from "@/components/dashboard/DashboardWrapper";

const GRACE_MS = getGraceMs();

async function generateUniqueUsername() {
  let username;
  let exists = true;

  while (exists) {
    username = `user_${Math.random().toString(36).slice(2, 14)}`;
    exists = await User.exists({ username });
  }

  return username;
}

export default async function DashboardLayout() {
  const { userId } = await auth();
  if (!userId)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <p className="text-lg opacity-70">
          Hey! Sign in to get to your dashboard.
        </p>
      </div>
    );

  await connectDB();

  let userDoc = await User.findOne({ clerkUserId: userId }).lean();

  const isServerAction = !!(await headers()).get("next-action");

  if (userDoc?.isDeleted && !isServerAction) {
    const scheduledAt = userDoc.deletionScheduledAt?.getTime();
    if (scheduledAt && new Date() < new Date(scheduledAt + GRACE_MS)) {
      await User.updateOne(
        { _id: userDoc._id },
        { $set: { isDeleted: false, deletionScheduledAt: null } },
      );
      userDoc.isDeleted = false;
      userDoc.deletionScheduledAt = null;
    } else {
      redirect("/");
    }
  }

  if (!userDoc) {
    const username = await generateUniqueUsername();

    const newUser = await User.create({
      clerkUserId: userId,
      username,
    });

    userDoc = newUser.toObject();
  }

  const USER = {
    ...userDoc,
    _id: userDoc._id.toString(),
  };

  return <DashboardWrapper user={USER} />;
}
