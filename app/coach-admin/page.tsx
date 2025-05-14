'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

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

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from('coaches').delete().eq('id', id);
    if (error) {
      alert('删除失败：' + error.message);
    } else {
      alert('已删除该教练');
      fetchCoaches();
    }
  };

  useEffect(() => {
    fetchCoaches();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-2xl font-bold mb-6">教练管理</h1>
      {coaches.length === 0 ? (
        <p>暂无教练注册记录。</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coaches.map((coach) => (
            <div key={coach.id} className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">{coach.name}</h2>
              <p className="text-gray-600 mb-1">邮箱：{coach.email}</p>
              <p className="text-gray-600 mb-1">简介：{coach.bio}</p>
              <button
                onClick={() => handleDelete(coach.id)}
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
