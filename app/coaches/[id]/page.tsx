'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

const coachData = {
  1: { name: '张教练', bio: '专注登山徒步10年', price: 200 },
  2: { name: '李教练', bio: '滑雪教练，经验丰富', price: 180 },
  3: { name: '王教练', bio: '专业攀岩与高空挑战导师', price: 220 }
};

export default function CoachBookingPage() {
  const { id } = useParams();
  const router = useRouter();
  const coach = coachData[Number(id)];
  const [selectedTime, setSelectedTime] = useState('');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem('currentUser');
    if (!stored) {
      alert('请先登录才能预约课程');
      router.push('/login');
    } else {
      setUser(JSON.parse(stored));
    }
  }, [router]);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTime) {
      alert('请选择时间');
      return;
    }

    const newOrder = {
      coachName: coach.name,
      date: new Date().toLocaleDateString(),
      time: selectedTime,
      price: coach.price
    };

    const existing = JSON.parse(localStorage.getItem('coachOrders') || '[]');
    existing.push(newOrder);
    localStorage.setItem('coachOrders', JSON.stringify(existing));

    alert(`预约成功：${coach.name} - ${selectedTime}`);
    setSelectedTime('');
  };

  if (!coach) return <div className="p-10">找不到该教练。</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form onSubmit={handleBooking} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">预约 {coach.name}</h1>
        <p className="mb-4 text-gray-600">{coach.bio}</p>

        <label className="block mb-2">选择时间：</label>
        <select
          className="w-full border p-2 mb-4 rounded"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          required
        >
          <option value="">请选择一个时间段</option>
          <option value="上午 9:00">上午 9:00</option>
          <option value="下午 1:00">下午 1:00</option>
          <option value="晚上 6:00">晚上 6:00</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition"
        >
          确认预约
        </button>
      </form>
    </div>
  );
}
