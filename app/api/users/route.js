import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";

export async function GET(req) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const user = await User.findOne({ clerkUserId: userId });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function POST(req) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const user = await User.findOne({ clerkUserId: userId });

  if (user.profilePic) {
    const oldFilePath = path.join(process.cwd(), "public", user.profilePic);
    try {
      await unlink(oldFilePath);
    } catch (err) {}
  }

  const formData = await req.formData();
  const file = formData.get("file");

  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json(
      { error: "Only image files are allowed" },
      { status: 400 },
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const ext = file.type.split("/")[1];
  const timestamp = Date.now();
  const filename = `${userId}_${timestamp}.${ext}`;

  const uploadDir = path.join(process.cwd(), "public/uploads/avatars");
  await mkdir(uploadDir, { recursive: true });

  const filePath = path.join(uploadDir, filename);
  await writeFile(filePath, buffer);

  const imagePath = `/uploads/avatars/${filename}`;
  const updatedUser = await User.findOneAndUpdate(
    { clerkUserId: userId },
    { profilePic: imagePath },
    { new: true },
  );

  return NextResponse.json(updatedUser);
}

export async function PUT(req) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const { username, bio } = await req.json();

  const user = await User.findOne({ clerkUserId: userId });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (username !== undefined) user.username = username;
  if (bio !== undefined) user.bio = bio;

  await user.save();

  return NextResponse.json(
    {
      message: "Profile updated successfully",
      user,
    },
    { status: 200 },
  );
}
