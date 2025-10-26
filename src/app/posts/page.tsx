export default async function PostsPage() {
  let posts = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ? "" : ""}/api/posts`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch posts. Status:", res.status);
      return <p>Failed to load posts.</p>;
    }

    posts = await res.json();
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
