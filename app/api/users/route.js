import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import cloudinary from "@/lib/cloudinary";

const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,12}$/;

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

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
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

  let bytes;
  try {
    bytes = await file.arrayBuffer();
  } catch {
    return NextResponse.json({ error: "Failed to read file" }, { status: 400 });
  }

  const buffer = Buffer.from(bytes);

  let uploadResult;
  try {
    uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "lynko/avatars",
            public_id: userId,
            overwrite: true,
            resource_type: "image",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        )
        .end(buffer);
    });
  } catch {
    return NextResponse.json(
      {
        error:
          "Failed to upload image. File may be too large or the service is unavailable.",
      },
      { status: 500 },
    );
  }

  const updatedUser = await User.findOneAndUpdate(
    { clerkUserId: userId },
    { profilePic: uploadResult.secure_url },
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

  if (username !== undefined && !USERNAME_REGEX.test(username)) {
    return NextResponse.json(
      {
        error:
          "Pick a username 3–12 characters long, using only letters, numbers, and underscores.",
      },
      { status: 400 },
    );
  }

  if (username !== undefined) {
    const existing = await User.findOne({
      username,
      clerkUserId: { $ne: userId },
    });
    if (existing) {
      return NextResponse.json(
        { error: "Username already taken." },
        { status: 409 },
      );
    }
  }

  if (bio !== undefined && bio.length > 500) {
    return NextResponse.json(
      { error: "Bio must be 500 characters or fewer." },
      { status: 400 },
    );
  }

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

export async function DELETE() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  try {
    const deletionScheduledAt = new Date();

    await User.updateOne(
      { clerkUserId: userId },
      { $set: { isDeleted: true, deletionScheduledAt } },
    );

    return NextResponse.json({
      success: true,
      scheduledFor: deletionScheduledAt.toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to schedule account deletion" },
      { status: 500 },
    );
  }
}
