'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

const productData = {
  1: { name: '登山背包', price: 30, description: '轻便耐用，适合1-3日徒步旅行', type: '租赁' },
  2: { name: '帐篷（双人）', price: 80, description: '防风防雨，适合2人露营', type: '购买' },
  3: { name: '登山杖', price: 20, description: '可调节长度，稳定可靠', type: '租赁/购买' }
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const product = productData[id as keyof typeof productData];
  const [mode, setMode] = useState(product?.type === '购买' ? '购买' : '租赁');
  const [value, setValue] = useState('');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem('currentUser');
    if (!stored) {
      alert('请先登录才能下单');
      router.push('/login');
    } else {
      setUser(JSON.parse(stored));
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value) {
      alert('请输入数量或天数');
      return;
    }

    const newOrder =
      mode === '购买'
        ? {
            itemName: product.name,
            type: '购买',
            quantity: Number(value),
            price: product.price * Number(value)
          }
        : {
            itemName: product.name,
            type: '租赁',
            days: Number(value),
            price: product.price * Number(value)
          };

    const existing = JSON.parse(localStorage.getItem('productOrders') || '[]');
    existing.push(newOrder);
    localStorage.setItem('productOrders', JSON.stringify(existing));

    alert(`下单成功！${product.name} 已${mode} ${value} ${mode === '购买' ? '件' : '天'}。`);
    setValue('');
  };

  if (!product) return <div className="p-10">找不到该商品。</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-green-700 font-bold mb-4">￥{product.price} / {mode === '购买' ? '件' : '天'}</p>

        {product.type === '租赁/购买' && (
          <div className="mb-4">
            <label className="mr-4">
              <input
                type="radio"
                value="租赁"
                checked={mode === '租赁'}
                onChange={() => setMode('租赁')}
              /> 租赁
            </label>
            <label className="ml-4">
              <input
                type="radio"
                value="购买"
                checked={mode === '购买'}
                onChange={() => setMode('购买')}
              /> 购买
            </label>
          </div>
        )}

        <input
          type="number"
          placeholder={mode === '购买' ? '购买数量' : '租赁天数'}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
          required
          min={1}
        />

        <button
          type="submit"
          className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition"
        >
          确认{mode}
        </button>
      </form>
    </div>
  );
}
