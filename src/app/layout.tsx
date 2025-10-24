// src/app/layout.tsx
import Navbar from "../../components/Navbar";
import "./globals.css";
import Providers from "./Providers";



export const metadata = {
  title: "Full Stack Blog",
  description: "A modern blog built with Next.js, MongoDB, and Tailwind CSS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <Providers>
          <Navbar />
          <main className="max-w-5xl mx-auto mt-8 px-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
