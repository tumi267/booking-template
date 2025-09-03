import { Inter } from 'next/font/google';
import '../globals.css';
import { ReactNode } from "react";
const inter = Inter({ subsets: ['latin'] });

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className={inter.className}>

      {children}
    </div>
  );
}