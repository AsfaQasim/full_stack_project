"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  imageUrl?: string;
  createdAt: string;
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {post.imageUrl && (
        <div className="relative h-48">
          <Image
            src={post.imageUrl}
            alt={post.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
        <p className="text-gray-700 mb-4">{post.content.substring(0, 100)}...</p>
        <div className="flex items-center text-gray-500 text-sm">
          <span>By {post.author}</span>
          <span className="mx-2">•</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <Link href={`/posts/${post._id}`} className="text-blue-500 hover:underline mt-4 inline-block">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
