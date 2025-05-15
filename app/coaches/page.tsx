'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Navbar from '@/components/Navbar';

export default function CoachesPage() {
  const [coaches, setCoaches] = useState<any[]>([]);

  useEffect(() => {
    const fetchCoaches = async () => {
      const { data, error } = await supabase
        .from('coaches')
        .select('*')
        .eq('status', '已通过'); // ✅ 只显示已通过的教练
      if (error) {
        alert('加载教练失败：' + error.message);
      } else {
        setCoaches(data || []);
      }
    };

    fetchCoaches();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="p-10">
        <h1 className="text-2xl font-bold mb-6">可预约的教练</h1>
        {coaches.length === 0 ? (
          <p>暂无可预约教练。</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coaches.map((coach) => (
              <div key={coach.id} className="bg-white p-6 rounded shadow">
                <h2 className="text-xl font-semibold mb-2">{coach.name}</h2>
                <p className="text-gray-600 mb-1">邮箱：{coach.email}</p>
                <p className="text-gray-600 mb-1">简介：{coach.bio}</p>
                {/* 如果你有预约功能按钮，可以加在这里 */}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
