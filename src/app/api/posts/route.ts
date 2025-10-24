import { NextResponse } from "next/server";
import connectDB from "../../../../lib/dbConnect";
import Post from "../../../../models/Post";


export async function GET() {
  try {
    await connectDB();

    const posts = await Post.find();
    return NextResponse.json(posts, { status: 200 });
  } catch (error: any) {
    console.error(" API Error in /api/posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts", details: error.message },
      { status: 500 }
    );
  }
}
