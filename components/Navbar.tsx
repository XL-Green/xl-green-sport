'use client';

import { useEffect, useState } from 'react';

export default function Navbar() {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      setCurrentUser(JSON.parse(stored));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    location.reload();
  };

  return (
    <header className="bg-green-700 text-white py-4 shadow">
      <nav className="container mx-auto flex justify-between items-center px-6">
        <div className="text-xl font-bold">XL Green Sport</div>
        <ul className="flex gap-4 items-center">
          <li><a href="/">首页</a></li>
          <li><a href="/coaches">教练预约</a></li>
          <li><a href="/products">户外用品</a></li>
          {currentUser ? (
            <>
              <li>欢迎你：{currentUser.email}</li>
              <li><a href="/orders">我的订单</a></li>
              <li>
                <button onClick={handleLogout} className="underline">退出登录</button>
              </li>
            </>
          ) : (
            <>
              <li><a href="/login">登录</a></li>
              <li><a href="/register">注册</a></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
