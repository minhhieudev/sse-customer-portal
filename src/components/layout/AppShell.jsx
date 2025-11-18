"use client";

import Link from "next/link";
import Header from "./Header";

export default function AppShell({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EAF2FB] via-white to-[#FDF7EC] font-sans text-slate-900 flex flex-col">
      <Header />
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">{children}</main>
      <Footer />
    </div>
  );
}

function Footer() {
  const SUPPORT_LINKS = [
    { href: "/faq", label: "Trung tâm hỗ trợ" },
    { href: "/privacy", label: "Chính sách bảo mật" },
    { href: "/terms", label: "Điều khoản sử dụng" },
  ];

  return (
    <footer className="w-full border-t border-slate-200/80 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left lg:px-8 text-sm text-slate-600">
        <div className="space-y-1">
          <p className="text-base font-bold text-[#004B9A]">CÔNG TY TNHH CHUYỂN PHÁT NHANH SÀI GÒN SPEED</p>
          <p>Địa chỉ: Số 124/11 Cộng Hoà, Phường Tân Sơn Nhất, TP. Hồ Chí Minh</p>
          <p>Hotline: <a href="tel:0889741931" className="font-semibold text-[#004B9A]">0889 741 931</a></p>
          <p className="text-slate-500">© {new Date().getFullYear()} Saigon Speed Logistics. All rights reserved.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {SUPPORT_LINKS.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-[#004B9A]">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
