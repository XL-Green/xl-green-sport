import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "XL Green Sport",
  description: "享受户外运动，轻松预约教练和装备",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <nav className="bg-green-700 text-white flex justify-between items-center px-4 py-2 text-sm">
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:underline font-semibold">首页</Link>
          </div>
          <div className="text-lg font-bold">XL Green Sport</div>
          <div className="flex items-center gap-4">
            <Link href="/orders" className="hover:underline">我的订单</Link>
            <Link href="/login" className="hover:underline">登录</Link>
            <Link href="/register" className="hover:underline">注册</Link>
            <select className="bg-green-600 border border-white rounded px-1 text-black">
              <option>中文</option>
              <option>English</option>
              <option>Français</option>
            </select>
          </div>
        </nav>

        <main className="min-h-screen bg-gray-100">
          {children}
        </main>

        <footer className="bg-gray-800 text-white text-center py-4">
          © 2025 XL Green Sport. 保留所有权利。
        </footer>
      </body>
    </html>
  );
}
