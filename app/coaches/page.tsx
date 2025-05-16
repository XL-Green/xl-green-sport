'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function CoachAdminPage() {
  const [coaches, setCoaches] = useState<any[]>([]);
  const [selectedCoach, setSelectedCoach] = useState<any | null>(null);
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const [notes, setNotes] = useState('');

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

  const handleAppointmentSubmit = async () => {
    if (!startDateTime || !endDateTime || !selectedCoach) {
      alert('请选择起始和结束时间');
      return;
    }

    const userStr = localStorage.getItem('currentUser');
    const userEmail = userStr ? JSON.parse(userStr).email : '';

    const { error } = await supabase.from('coach_appointments').insert([
      {
        coach_id: selectedCoach.id,
        user_email: userEmail,
        start_datetime: startDateTime,
        end_datetime: endDateTime,
        notes,
      },
    ]);

    if (error) {
      alert('预约失败：' + error.message);
    } else {
      alert('预约成功！');
      setSelectedCoach(null);
      setStartDateTime('');
      setEndDateTime('');
      setNotes('');
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
                  <button
                    onClick={() => setSelectedCoach(coach)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    预约
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedCoach && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow w-96">
              <h2 className="text-xl font-bold mb-4">预约：{selectedCoach.name}</h2>
              <label className="block mb-2">开始时间</label>
              <input
                type="datetime-local"
                value={startDateTime}
                onChange={(e) => setStartDateTime(e.target.value)}
                className="w-full border p-2 mb-3 rounded"
              />
              <label className="block mb-2">结束时间</label>
              <input
                type="datetime-local"
                value={endDateTime}
                onChange={(e) => setEndDateTime(e.target.value)}
                className="w-full border p-2 mb-3 rounded"
              />
              <textarea
                placeholder="备注（选填）"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full border p-2 mb-3 rounded"
              />
              <div className="flex justify-end gap-2">
                <button onClick={handleAppointmentSubmit} className="bg-green-600 text-white px-4 py-2 rounded">提交</button>
                <button onClick={() => setSelectedCoach(null)} className="bg-gray-300 px-4 py-2 rounded">取消</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
