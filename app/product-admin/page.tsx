'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Navbar from '@/components/Navbar';

export default function ProductAdminPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('租赁'); // 默认值

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 校验
    if (!name || !price || !type) {
      alert('请填写所有必填项');
      return;
    }

    const { error } = await supabase.from('products').insert([
      {
        name,
        description,
        price: parseFloat(price),
        type,
      }
    ]);

    if (error) {
      alert('添加失败：' + error.message);
    } else {
      alert('商品添加成功');
      setName('');
      setDescription('');
      setPrice('');
      setType('租赁');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="p-10 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">添加商品</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
          <div>
            <label className="block mb-1">商品名称 *</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">商品描述</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1">价格（每件 或 每天）*</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border p-2 rounded"
              required
              min={0}
            />
          </div>

          <div>
            <label className="block mb-1">商品类型 *</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border p-2 rounded"
              required
            >
              <option value="租赁">租赁</option>
              <option value="购买">购买</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800"
          >
            添加商品
          </button>
        </form>
      </main>
    </div>
  );
}
