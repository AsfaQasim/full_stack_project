"use client";
import { useState } from "react";

export default function Page() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);

      const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      if (!image) {
        alert("Please select an image");
        return;
      }
  
      const formData = new FormData();
      formData.append("file", image);
  
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
  
      if (!uploadRes.ok) {
        alert("Error uploading image");
        return;
      }
  
      const { url } = await uploadRes.json();
  
      const postData = {
        title,
        content,
        image: url,
      };
  
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
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
        type="file"
        className="border p-2 w-full"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
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
