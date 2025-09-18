import { Inter } from 'next/font/google';
import '../globals.css';
import { ReactNode } from "react";
import Nav from '../components/admin/nav/Nav';
const inter = Inter({ subsets: ['latin'] });

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className={inter.className}>
      <Nav/>
      {children}
    </div>
  );
}