"use client";
import { useState } from "react";

export default function Page() { 
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, image }),
    });

    if (res.ok) {
      alert("Post created!");
    } else {
      alert("Error creating post");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-4 max-w-lg mx-auto">
      <input
        className="border p-2 w-full"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="border p-2 w-full"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        type="submit"
      >
        Create Post
      </button>
    </form>
  );
}
