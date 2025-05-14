'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    alert('已退出登录');
    window.location.href = '/';
  };

  return (
    <nav className="bg-green-700 text-white flex justify-between items-center px-4 py-2 text-sm">
      {/* 左侧 */}
      <div className="flex items-center gap-4">
        <Link href="/" className="hover:underline font-semibold">首页</Link>
      </div>

      {/* 中间 */}
      <div className="text-lg font-bold">XL Green Sport</div>

      {/* 右侧 */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span>欢迎你：{user.email}</span>
            <Link href="/orders" className="hover:underline">我的订单</Link>
            <button onClick={handleLogout} className="hover:underline text-red-200">退出登录</button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:underline">登录</Link>
            <Link href="/register" className="hover:underline">注册</Link>
          </>
        )}
        <select className="bg-green-600 border border-white rounded px-1 text-black">
          <option>中文</option>
          <option>English</option>
          <option>Français</option>
        </select>
      </div>
    </nav>
  );
}
