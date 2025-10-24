"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { JSX } from "react";

export default function Navbar(): JSX.Element {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link href="/" className="font-bold text-xl">
        FullStack Blog
      </Link>

      <div className="flex items-center gap-4">
        <Link href="/posts" className="hover:underline">
          Posts
        </Link>

        {session ? (
          <>
            <Link href="/posts/new" className="hover:underline">
              New Post
            </Link>
            <button
              onClick={() => signOut()}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}
