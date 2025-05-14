'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const translations = {
  zh: {
    home: '首页',
    coachBooking: '教练预约',
    outdoorEquipment: '户外用品',
    login: '登录/注册',
    logout: '退出登录',
    welcome: '欢迎你',
    headerTitle: '享受户外运动，轻松预约教练和装备',
    headerSubtitle: '一站式平台，为你的户外体验提供最专业的服务',
    popularCoaches: '热门教练',
    popularCoachesDesc: '探索最受欢迎的专业户外教练，快速预约课程',
    equipmentRental: '户外装备租赁',
    equipmentRentalDesc: '高品质户外装备，租赁与购买灵活选择',
    quickRegister: '快速注册',
    quickRegisterDesc: '立即注册，开始你的户外探险之旅',
    footer: '© 2025 XL Green Sport. 保留所有权利。',
    myOrders: '我的订单'
  }
};

export default function Home() {
  const [lang, setLang] = useState('zh');
  const t = translations[lang as keyof typeof translations];
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    alert('已退出登录');
  };

  return (
    <div className="font-sans min-h-screen bg-gray-100 text-black">
      <header className="bg-green-700 text-white py-4 shadow">
        <nav className="container mx-auto flex justify-between items-center px-6">
          <div className="text-xl font-bold">XL Green Sport</div>
          <ul className="flex gap-4 items-center">
            <li><Link href="/">{t.home}</Link></li>
            <li><Link href="/coaches">{t.coachBooking}</Link></li>
            <li><Link href="/products">{t.outdoorEquipment}</Link></li>
            {user ? (
              <>
                <li>{t.welcome}：{user.email}</li>
                <li><Link href="/orders">{t.myOrders}</Link></li>
                <li><button onClick={handleLogout} className="underline"> {t.logout}</button></li>
              </>
            ) : (
              <>
                <li><Link href="/login">{t.login}</Link></li>
                <li><Link href="/register">注册</Link></li>
              </>
            )}
          </ul>
          <select className="text-black" value={lang} onChange={(e) => setLang(e.target.value)}>
            <option value="zh">中文</option>
          </select>
        </nav>
      </header>

      <main className="container mx-auto py-10 px-6">
        <section className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">{t.headerTitle}</h1>
          <p className="text-gray-700">{t.headerSubtitle}</p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/coaches" className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition block">
            <h2 className="text-2xl font-semibold">{t.popularCoaches}</h2>
            <p className="text-gray-600">{t.popularCoachesDesc}</p>
          </Link>

          <Link href="/products" className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition block">
            <h2 className="text-2xl font-semibold">{t.equipmentRental}</h2>
            <p className="text-gray-600">{t.equipmentRentalDesc}</p>
          </Link>

          <Link href="/coach-register" className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition block">
            <h2 className="text-2xl font-semibold">{t.quickRegister}</h2>
            <p className="text-gray-600">{t.quickRegisterDesc}</p>
          </Link>
        </section>
      </main>

      <footer className="bg-gray-800 text-gray-400 py-4">
        <div className="container mx-auto text-center">
          {t.footer}
        </div>
      </footer>
    </div>
  );
}
