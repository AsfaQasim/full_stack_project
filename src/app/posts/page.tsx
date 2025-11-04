import Image from "next/image";

export default async function PostsPage() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/posts`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.status}`);
    }

    const data = await res.json();
    const posts = Array.isArray(data) ? data : data.posts || [];

    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">All Posts</h1>
        {posts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          <div className="grid gap-6">
            {posts.map((post: any) => (
              <div key={post._id} className="bg-white shadow rounded p-4">
                <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-2">{post.content}</p>
                <p className="text-sm text-gray-400">
                  {new Date(post.createdAt).toLocaleString()}
                </p>
                <Image src={post.image} alt="" width={200} height={200}/>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  } catch (err) {
    console.error("Error fetching posts:", err);
    return <p>Something went wrong while fetching posts.</p>;
  }
}
