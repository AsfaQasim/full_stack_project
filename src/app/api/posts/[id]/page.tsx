"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditPostPage() {
  const { id } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/posts/${id}`);
      const post = await res.json();
      setTitle(post.title);
      setContent(post.content);
    })();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    if (res.ok) router.push("/posts");
    else alert("Failed to update post");
  };

  const handleDelete = async () => {
    if (confirm("Delete this post?")) {
      await fetch(`/api/posts/${id}`, { method: "DELETE" });
      router.push("/posts");
    }
  };

  return (
    <form
      onSubmit={handleUpdate}
      className="bg-white shadow p-6 rounded flex flex-col gap-3"
    >
      <h1 className="text-2xl font-bold mb-2">Edit Post</h1>

      <input
        className="border p-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter title"
      />

      <textarea
        className="border p-2 rounded"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter content"
      />

      <div className="flex gap-3">
        <button
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          type="submit"
        >
          Save
        </button>
        <button
          type="button"
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </form>
  );
}
