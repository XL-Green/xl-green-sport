'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const coachList = [
  {
    id: 1,
    name: '张教练',
    bio: '专注登山徒步10年，带你探索自然之美。',
    avatar: 'https://via.placeholder.com/150'
  },
  {
    id: 2,
    name: '李教练',
    bio: '滑雪教练，经验丰富，适合初学者与进阶者。',
    avatar: 'https://via.placeholder.com/150'
  },
  {
    id: 3,
    name: '王教练',
    bio: '专业攀岩与高空挑战项目导师。',
    avatar: 'https://via.placeholder.com/150'
  }
];

export default function CoachListPage() {
  const router = useRouter();

  const goToBooking = (id: number) => {
    router.push(`/coaches/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-8">选择教练预约课程</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coachList.map((coach) => (
          <div key={coach.id} className="bg-white shadow-md rounded-lg p-6 text-center">
            <img src={coach.avatar} alt={coach.name} className="mx-auto rounded-full w-24 h-24 mb-4" />
            <h2 className="text-xl font-semibold">{coach.name}</h2>
            <p className="text-gray-600 mb-4">{coach.bio}</p>
            <button
              onClick={() => goToBooking(coach.id)}
              className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
            >
              预约
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
