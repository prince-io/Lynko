import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

function isValid(str) {
  return /^[a-zA-Z0-9_]{3,12}$/.test(str);
}

export async function GET(req) {
  const username = req.nextUrl.searchParams.get("username");
  if (!username)
    return new Response(
      JSON.stringify({ error: true, message: "Username is required." }),
    );

  const validity = isValid(req.nextUrl.searchParams.get("username"));
  if (!validity)
    return new Response(
      JSON.stringify({ error: true, message: "Invalid username format." }),
    );

  await connectDB();
  const exists = await User.findOne({ username });

  if (!exists)
    return new Response(
      JSON.stringify({ error: false, message: "Username is available." }),
    );

  return new Response(
    JSON.stringify({ error: true, message: "Username already exists." }),
  );
}
