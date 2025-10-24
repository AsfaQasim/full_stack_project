import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../../lib/authOptions";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-black text-gray-900 dark:text-gray-100 transition-colors duration-500">
       {/* Hero Section */}
  <div className="max-w-3xl text-center px-6">
    <h1 className="text-5xl sm:text-7xl font-extrabold leading-tight mb-6 tracking-tight animate-fade-in">
      <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Full Stack Blog
      </span>
    </h1>

    <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed animate-fade-in-delay">
      A modern space for developers to <strong>share ideas</strong>, <strong>build projects</strong>, 
      and <strong>grow together</strong>. Powered by <span className="text-indigo-600 dark:text-indigo-400">Next.js</span>, 
      <span className="text-blue-600 dark:text-blue-400"> MongoDB</span>, and 
      <span className="text-purple-600 dark:text-purple-400"> Tailwind CSS</span>.
    </p>

    {/* CTA Buttons */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      {session ? (
        <Link
          href="/posts"
          className="relative px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg hover:shadow-blue-500/40 transform hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
        >
          <span className="relative z-10">Explore Posts</span>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Link>
      ) : (
        <Link
          href="/api/auth/signin"
          className="relative px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-500 to-green-600 shadow-lg hover:shadow-emerald-500/40 transform hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
        >
          <span className="relative z-10">Sign In to Continue</span>
          <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Link>
      )}
    </div>
  </div>

  {/* Decorative Wave Divider */}
  <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
    <svg
      className="relative block w-[calc(100%+1.3px)] h-20 text-blue-600/10 dark:text-blue-400/10"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
    >
      <path
        d="M321.39 56.44c58.13-10.79 114.9-30.87 172.31-41.94 86.55-16.37 175.75-11.84 261.79 9.37 63.08 15.64 124.88 38.48 189.53 47.88 56.45 8.12 112.48 6.39 168.31-2.22V120H0V95.78c107.3-22.21 214.86-38.97 321.39-39.34z"
        fill="currentColor"
      ></path>
    </svg>
  </div>

  {/* Footer */}
  <footer className="mt-20 text-sm text-gray-500 dark:text-gray-500">
    © {new Date().getFullYear()}{" "}
    <span className="font-medium text-gray-700 dark:text-gray-300">
      Full Stack Blog
    </span>{" "}
    — Crafted with ❤️ by{" "}
    <span className="font-semibold text-blue-600 dark:text-blue-400">
      Asifa
    </span>
  </footer>
</section>
  )}