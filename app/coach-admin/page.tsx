'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Navbar from '@/components/Navbar';

export default function CoachAdminPage() {
  const [coaches, setCoaches] = useState<any[]>([]);

  const fetchCoaches = async () => {
    const { data, error } = await supabase.from('coaches').select('*').order('id', { ascending: false });
    if (error) {
      alert('加载教练信息失败：' + error.message);
    } else {
      setCoaches(data || []);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    const { error } = await supabase.from('coaches').update({ status }).eq('id', id);
    if (error) {
      alert('更新状态失败：' + error.message);
    } else {
      alert(`已将教练申请标记为：${status}`);
      fetchCoaches();
    }
  };

  useEffect(() => {
    fetchCoaches();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="p-10">
        <h1 className="text-2xl font-bold mb-6">教练申请管理</h1>
        {coaches.length === 0 ? (
          <p>暂无教练申请。</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coaches.map((coach) => (
              <div key={coach.id} className="bg-white p-6 rounded shadow">
                <h2 className="text-xl font-semibold mb-2">{coach.name}</h2>
                <p className="text-gray-600 mb-1">联系方式：{coach.contact}</p>
                <p className="text-gray-600 mb-1">简介：{coach.bio}</p>
                <p className="text-gray-600 mb-1">状态：{coach.status || '待审核'}</p>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => updateStatus(coach.id, '已通过')}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    通过
                  </button>
                  <button
                    onClick={() => updateStatus(coach.id, '已拒绝')}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    拒绝
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
