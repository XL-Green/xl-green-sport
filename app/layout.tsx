import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "XL Green Sport",
  description: "Created by XL Green",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className={`${inter.variable} antialiased`}>
        <nav className="bg-white shadow px-4 py-3 flex justify-between items-center text-sm text-black">
          <a href="/" className="hover:underline">首页</a>
          <div className="flex gap-4">
            <a href="/orders" className="hover:underline">我的订单</a>
            <a href="/login" className="hover:underline">登录</a>
            <a href="/register" className="hover:underline">注册</a>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
