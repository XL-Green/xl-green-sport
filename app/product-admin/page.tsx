'use client';

import React, { useState } from 'react';

export default function ProductAdminPage() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    type: '租赁'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem('productAdmin') || '[]');
    existing.push({ ...product, price: Number(product.price) });
    localStorage.setItem('productAdmin', JSON.stringify(existing));
    alert('商品添加成功');
    setProduct({ name: '', description: '', price: '', type: '租赁' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">添加新商品</h2>

        <input
          type="text"
          name="name"
          placeholder="商品名称"
          value={product.name}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <input
          type="text"
          name="description"
          placeholder="商品描述"
          value={product.description}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="价格"
          value={product.price}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
          min={0}
        />

        <select
          name="type"
          value={product.type}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="租赁">租赁</option>
          <option value="购买">购买</option>
          <option value="租赁/购买">租赁/购买</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition"
        >
          添加商品
        </button>
      </form>
    </div>
  );
}
