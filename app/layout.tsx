import type { Metadata } from "next";
import { GeistSans, GeistMono } from "next/font/google";
import "./globals.css";

const geistSans = GeistSans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = GeistMono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "XL Green Sport",
  description: "由 create next app 生成",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = typeof window !== "undefined" ? localStorage.getItem("currentUser") : null;

  return (
    <html lang="zh">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* 顶部导航 */}
        <nav className="bg-white px-6 py-3 flex justify-between items-center shadow text-sm text-black">
          {/* 左侧：首页 */}
          <div>
            <a href="/" className="hover:underline font-semibold text-green-700">
              XL Green Sport
            </a>
          </div>

          {/* 右侧：登录/注册/我的订单 */}
          <div className="flex gap-4 items-center">
            {typeof window !== "undefined" && user ? (
              <>
                <span className="text-gray-700">你好，{JSON.parse(user).email}</span>
                <a href="/orders" className="hover:underline">我的订单</a>
                <button
                  onClick={() => {
                    localStorage.removeItem("currentUser");
                    location.reload();
                  }}
                  className="text-red-600 hover:underline"
                >
                  退出
                </button>
              </>
            ) : (
              <>
                <a href="/login" className="hover:underline">登录</a>
                <a href="/register" className="hover:underline">注册</a>
              </>
            )}
          </div>
        </nav>

        {/* 页面主体 */}
        {children}
      </body>
    </html>
  );
}
