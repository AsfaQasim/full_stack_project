export default async function PostsPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "https://full-stack-project-fawn-two.vercel.app"}/api/posts`, {
    cache: "no-store",
    next: { revalidate: 0 },
  });


  if (!res.ok) {
    console.error("Failed to fetch posts. Status:", res.status);
    return <p>Failed to load posts</p>;
  }

  const data = await res.json();
  const posts = Array.isArray(data) ? data : data.posts || [];

  return (
    <div className="grid gap-6">
      {posts.length > 0 ? (
        posts.map((post: any) => (
          <div key={post._id} className="bg-white shadow rounded p-4">
            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-2">
              {post.content ? post.content.slice(0, 100) : "No content available"}
            </p>
            <p className="text-sm text-gray-400">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>

  );
}
