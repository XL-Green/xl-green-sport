'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function CoachRegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from('coaches').insert([{ name, email, bio }]);
    if (error) {
      alert('提交失败：' + error.message);
    } else {
      setSuccess(true);
      setName('');
      setEmail('');
      setBio('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">教练注册</h2>

        {success && <p className="text-green-600 text-center mb-4">注册成功！我们会尽快联系你。</p>}

        <input
          type="text"
          placeholder="姓名"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />
        <input
          type="email"
          placeholder="邮箱"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />
        <textarea
          placeholder="个人介绍"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          rows={4}
        ></textarea>
        <button type="submit" className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition">
          提交
        </button>
      </form>
    </div>
  );
}
