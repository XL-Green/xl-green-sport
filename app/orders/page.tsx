'use client';
import React, { useEffect, useState } from 'react';

export default function OrdersPage() {
  const [coachOrders, setCoachOrders] = useState<any[]>([]);
  const [productOrders, setProductOrders] = useState<any[]>([]);

  useEffect(() => {
    const coachStored = localStorage.getItem('coachOrders');
    if (coachStored) setCoachOrders(JSON.parse(coachStored));

    const productStored = localStorage.getItem('productOrders');
    if (productStored) setProductOrders(JSON.parse(productStored));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-8">我的订单</h1>

      {/* 教练订单 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">教练预约记录</h2>
        {coachOrders.length === 0 ? (
          <p className="text-gray-500">暂无预约记录。</p>
        ) : (
          <div className="space-y-4">
            {coachOrders.map((order, index) => (
              <div key={index} className="bg-white p-4 rounded shadow">
                <p><strong>教练：</strong>{order.coachName}</p>
                <p><strong>日期：</strong>{order.date}</p>
                <p><strong>时间：</strong>{order.time}</p>
                <p><strong>价格：</strong>￥{order.price}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 商品订单 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">用品租赁/购买记录</h2>
        {productOrders.length === 0 ? (
          <p className="text-gray-500">暂无记录。</p>
        ) : (
          <div className="space-y-4">
            {productOrders.map((order, index) => (
              <div key={index} className="bg-white p-4 rounded shadow">
                <p><strong>商品：</strong>{order.itemName}</p>
                <p><strong>类型：</strong>{order.type}</p>
                {order.type === '租赁' ? (
                  <p><strong>租赁天数：</strong>{order.days} 天</p>
                ) : (
                  <p><strong>购买数量：</strong>{order.quantity} 件</p>
                )}
                <p><strong>总价：</strong>￥{order.price}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
