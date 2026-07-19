import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/mongodb";
import Design from "@/models/Design";

const defaultDesign = {
  theme: "lemonade",
  font: "inter",
  size: [
    "md:text-lg text-sm",
    "md:text-base text-xs",
    "md:text-sm text-xs",
    "text-xs",
  ],
  radius: "rounded-none",
  border: "",
  avatar: "",
  background: "bg-primary",
  buttonStyle: "btn btn btn-accent",
  buttonRadius: "rounded-none",
};

export async function GET(req) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const design = await Design.findOneAndUpdate(
    { clerkUserId: userId },
    {
      $setOnInsert: {
        clerkUserId: userId,
        customization: defaultDesign,
      },
    },
    {
      new: true,
      upsert: true,
    },
  );

  return NextResponse.json(design.customization);
}

export async function POST(req) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const design = await req.json();

  const user = await Design.findOne({ clerkUserId: userId });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (design !== undefined) user.customization = design;

  await user.save();

  return NextResponse.json(
    {
      message: "Customizations saved successfully",
      user,
    },
    { status: 200 },
  );
}
