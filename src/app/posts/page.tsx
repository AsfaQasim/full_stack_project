export default async function PostsPage() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL
      ? `https://${process.env.NEXT_PUBLIC_BASE_URL}`
      : "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/posts`, { cache: "no-store" });

  if (!res.ok) {
    console.error("Failed to fetch posts. Status:", res.status);
    return <p>Failed to load posts</p>;
  }

  const data = await res.json();
  const posts = Array.isArray(data) ? data : data.posts || [];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">All Posts</h1>
      <div className="grid gap-6">
        {posts.length > 0 ? (
          posts.map((post: any) => (
            <div key={post._id} className="bg-white shadow rounded p-4">
              {post.image && (
                <img src={post.image} alt={post.title} className="rounded mb-3" />
              )}
              <h2 className="text-2xl font-semibold">{post.title}</h2>
              <p className="text-gray-600">{post.content?.slice(0, 100)}...</p>
            </div>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </div>
  );
}
