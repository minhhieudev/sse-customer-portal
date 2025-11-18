"use client";

import Link from "next/link";
import Header from "./Header";

export default function AppShell({ children }) {
  return (
    <div className="min-h-screen bg-[#F7F8FC] font-sans text-[#1f2050] flex flex-col">
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
    <footer className="w_full border-t border-slate-200/80 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-8 text-center sm:flex-row sm:justify-between sm:text-left lg:px-8 text-sm text-slate-500">
        <p>© {new Date().getFullYear()} SSE Logistics. All rights reserved.</p>
        <div className="flex flex-wrap justify-center gap-6">
          {SUPPORT_LINKS.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-[#5146ff]">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
