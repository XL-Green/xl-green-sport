'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ProductListPage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('productAdmin');
    if (stored) {
      setProducts(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">户外装备</h1>
      {products.length === 0 ? (
        <p className="text-center text-gray-500">暂无商品，请在后台添加。</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div key={index} className="bg-white rounded shadow p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-1">{product.description}</p>
              <p className="text-green-700 font-bold mb-1">￥{product.price}</p>
              <p className="text-sm text-gray-500">{product.type}</p>
              <Link
                href={`/products/${index + 1}`}
                className="text-blue-600 underline text-sm block mt-2"
              >
                查看详情
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
