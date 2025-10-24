import { NextResponse } from "next/server";
import connectDB from "../../../../lib/dbConnect";
import Post from "../../../../models/Post";

export async function GET() {
  try {
    await connectDB();
    const posts = await Post.find();
    return NextResponse.json(posts, { status: 200 });
  } catch (error: any) {
    console.error("❌ API Error in GET /api/posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts", details: error.message },
      { status: 500 }
    );
  }
}

// ✅ Add this POST handler
export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const newPost = new Post({
      title: body.title,
      content: body.content,
      author: body.author || "Anonymous",
    });

    await newPost.save();

    return NextResponse.json(
      { message: "Post created successfully", post: newPost },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ API Error in POST /api/posts:", error);
    return NextResponse.json(
      { error: "Failed to create post", details: error.message },
      { status: 500 }
    );
  }
}
