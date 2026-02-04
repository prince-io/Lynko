import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardContent from "@/components/DashboardContent";

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

  return (
    <>
      <Navbar />
      <div className="dashboard-container md:min-h-screen">
        <div className="flex-1 p-4">
          <DashboardContent User={USER} />
        </div>
      </div>
      <Footer />
    </>
  );
}
