'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Navbar from '@/components/Navbar';

export default function CoachesPage() {
  const [coaches, setCoaches] = useState<any[]>([]);
  const [selectedCoach, setSelectedCoach] = useState<any | null>(null);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const fetchCoaches = async () => {
      const { data, error } = await supabase
        .from('coaches')
        .select('*')
        .eq('status', '已通过')
        .order('id', { ascending: false });

      if (error) {
        alert('加载教练失败：' + error.message);
      } else {
        setCoaches(data || []);
      }
    };

    fetchCoaches();
  }, []);

  const handleAppointmentSubmit = async () => {
    if (!appointmentDate || !selectedCoach) {
      alert('请选择预约日期');
      return;
    }

    const userStr = localStorage.getItem('currentUser');
    const userEmail = userStr ? JSON.parse(userStr).email : '';

    const { error } = await supabase.from('coach_appointments').insert([
      {
        coach_id: selectedCoach.id,
        user_email: userEmail,
        appointment_date: appointmentDate,
        notes,
      },
    ]);

    if (error) {
      alert('预约失败：' + error.message);
    } else {
      alert('预约成功！');
      setSelectedCoach(null);
      setAppointmentDate('');
      setNotes('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="p-10">
        <h1 className="text-2xl font-bold mb-6">教练预约</h1>
        {coaches.length === 0 ? (
          <p>暂无可预约的教练。</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coaches.map((coach) => (
              <div key={coach.id} className="bg-white p-6 rounded shadow">
                <h2 className="text-xl font-semibold mb-2">{coach.name}</h2>
                <p className="text-gray-600 mb-1">联系方式：{coach.contact}</p>
                <p className="text-gray-600 mb-1">简介：{coach.bio}</p>
                <button
                  onClick={() => setSelectedCoach(coach)}
                  className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  预约
                </button>
              </div>
            ))}
          </div>
        )}

        {selectedCoach && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow w-96">
              <h2 className="text-xl font-bold mb-4">预约：{selectedCoach.name}</h2>
              <input
                type="date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
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
