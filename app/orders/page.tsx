'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      const { email } = JSON.parse(stored);
      setUserEmail(email);
      fetchUserOrders(email);
    }
  }, []);

  const fetchUserOrders = async (email: string) => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_email', email)
      .order('id', { ascending: false });
    if (error) {
      alert('加载订单失败：' + error.message);
    } else {
      setOrders(data || []);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-2xl font-bold mb-6">我的订单</h1>
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
