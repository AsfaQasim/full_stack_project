export default async function PostsPage() {
  const baseUrl =
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";


  let posts = [];

  try {
    const res = await fetch(`${baseUrl}/api/posts`, {
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      console.error("Failed to fetch posts. Status:", res.status);
      return <p>Failed to load posts</p>;
    }

    const data = await res.json();
    posts = Array.isArray(data) ? data : data.posts || [];

    console.log("Posts fetched:", posts.length);
  } catch (err) {
    console.error("Error fetching posts:", err);
    return <p>Something went wrong while fetching posts.</p>;
  }

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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
