'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function OrdersAdminPage() {
  const [orders, setOrders] = useState<any[]>([]);

  const fetchOrders = async () => {
    const { data, error } = await supabase.from('orders').select('*').order('id', { ascending: false });
    if (error) {
      alert('加载订单失败：' + error.message);
    } else {
      setOrders(data || []);
    }
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from('orders').delete().eq('id', id);
    if (error) {
      alert('删除失败：' + error.message);
    } else {
      alert('订单已删除');
      fetchOrders();
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-2xl font-bold mb-6">订单管理</h1>
      {orders.length === 0 ? (
        <p>暂无订单。</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">{order.product_name}</h2>
              <p className="text-gray-600 mb-1">类型：{order.type}</p>
              {order.type === '购买' ? (
                <p className="text-gray-600 mb-1">数量：{order.quantity}</p>
              ) : (
                <>
                  <p className="text-gray-600 mb-1">起始：{order.rental_start}</p>
                  <p className="text-gray-600 mb-1">结束：{order.rental_end}</p>
                </>
              )}
              <button
                onClick={() => handleDelete(order.id)}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                删除
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
