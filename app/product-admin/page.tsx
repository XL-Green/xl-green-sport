'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function ProductAdminPage() {
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    type: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.from('products').insert([form]);
    if (error) {
      alert('添加失败: ' + error.message);
    } else {
      alert('商品添加成功！');
      setForm({ name: '', price: '', description: '', type: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md max-w-md mx-auto space-y-4">
        <h1 className="text-xl font-bold">添加商品</h1>
        <input name="name" placeholder="名称" value={form.name} onChange={handleChange} required className="w-full border p-2" />
        <input name="price" placeholder="价格" value={form.price} onChange={handleChange} required className="w-full border p-2" />
        <input name="description" placeholder="描述" value={form.description} onChange={handleChange} required className="w-full border p-2" />
        <input name="type" placeholder="类型（购买/租赁）" value={form.type} onChange={handleChange} required className="w-full border p-2" />
        <button type="submit" className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-800">添加</button>
      </form>
    </div>
  );
}
