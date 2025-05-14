'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const productList = [
  {
    id: 1,
    name: '登山背包',
    price: 30,
    image: 'https://via.placeholder.com/150',
    type: '可租赁'
  },
  {
    id: 2,
    name: '帐篷（双人）',
    price: 80,
    image: 'https://via.placeholder.com/150',
    type: '可购买'
  },
  {
    id: 3,
    name: '登山杖',
    price: 20,
    image: 'https://via.placeholder.com/150',
    type: '租赁/购买'
  }
];

export default function ProductListPage() {
  const router = useRouter();

  const goToDetail = (id: number) => {
    router.push(`/products/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-8">户外用品商城</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productList.map((item) => (
          <div key={item.id} className="bg-white shadow rounded-lg p-6 text-center">
            <img src={item.image} alt={item.name} className="mx-auto w-24 h-24 mb-4" />
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-gray-500">{item.type}</p>
            <p className="text-green-700 font-bold mb-4">￥{item.price}</p>
            <button
              onClick={() => goToDetail(item.id)}
              className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
            >
              查看详情
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
