'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CoachRegisterPage() {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [price, setPrice] = useState('');
  const [photo, setPhoto] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !bio || !price) {
      alert('请填写所有必填项');
      return;
    }

    const newCoach = {
      name,
      bio,
      price: Number(price),
      photo,
    };

    const existing = JSON.parse(localStorage.getItem('coaches') || '[]');
    existing.push(newCoach);
    localStorage.setItem('coaches', JSON.stringify(existing));

    alert('提交成功！等待平台审核后上线。');
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 text-black">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 py-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4">教练注册</h1>

        <label className="block mb-2">姓名 *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border w-full p-2 rounded mb-4"
          required
        />

        <label className="block mb-2">个人简介 *</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="border w-full p-2 rounded mb-4"
          required
        />

        <label className="block mb-2">每次教学收费（元） *</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border w-full p-2 rounded mb-4"
          required
          min={0}
        />

        <label className="block mb-2">照片链接（可选）</label>
        <input
          type="text"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          className="border w-full p-2 rounded mb-4"
        />

        <button
          type="submit"
          className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition"
        >
          提交注册申请
        </button>
      </form>
    </div>
  );
}
