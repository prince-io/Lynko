import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

function isValid(str) {
  return /^[a-zA-Z0-9_]{3,12}$/.test(str);
}

export async function GET(req) {
  const username = req.nextUrl.searchParams.get("username");
  if (!username)
    return NextResponse.json(
      { error: true, message: "Username is required." },
      { status: 400 },
    );

  const validity = isValid(username);
  if (!validity)
    return NextResponse.json(
      { error: true, message: "Invalid username format." },
      { status: 400 },
    );

  await connectDB();
  const exists = await User.findOne({ username });

  if (!exists)
    return NextResponse.json(
      { error: false, message: "Username is available." },
    );

  return NextResponse.json(
    { error: true, message: "Username already exists." },
    { status: 409 },
  );
}
