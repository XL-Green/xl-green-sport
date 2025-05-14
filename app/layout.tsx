import './globals.css';
import { ReactNode } from 'react';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'XL Green Sport',
  description: '享受户外运动，轻松预约教练和装备',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh">
      <body className="font-sans min-h-screen bg-gray-100 text-black">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
