"use client";

import Link from "next/link";
import Header from "./Header";
import { useUIStore } from "@/stores/useUIStore";
import CreateOrderModal from "@/components/orders/CreateOrderModal";
import { useToast } from "@/hooks/useToast";
import { Suspense } from "react";
import ModalTriggerFromQuery from "@/components/utils/ModalTriggerFromQuery";
import Image from "next/image";
import { Facebook, Youtube, Send, PhoneCall } from "lucide-react";

export default function AppShell({ children }) {
  const { isCreateOrderModalOpen, closeCreateOrderModal } = useUIStore();
  const { showToast } = useToast();

  const handleOrderSubmit = (formData) => {
    console.log("New Order Submitted:", formData);
    showToast("ORDER_CREATED_SUCCESS");
    closeCreateOrderModal();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EAF2FB] via-white to-[#FDF7EC] text-slate-900 flex flex-col">
      <Suspense>
        <ModalTriggerFromQuery />
      </Suspense>
      <Header />
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">{children}</main>
      <CreateOrderModal
        isOpen={isCreateOrderModalOpen}
        onClose={closeCreateOrderModal}
        onSubmit={handleOrderSubmit}
      />
    </div>
  );
}

export function Footer() {
  const serviceLinks = [
    { href: "/orders", label: "Tạo đơn hàng" },
    { href: "/tracking", label: "Tra cứu đơn hàng" },
    { href: "/services", label: "Bảng giá dịch vụ" },
  ];

  const supportLinks = [
    { href: "/faq", label: "Trung tâm hỗ trợ" },
    { href: "/privacy", label: "Chính sách bảo mật" },
    { href: "/terms", label: "Điều khoản sử dụng" },
  ];

  const socialLinks = [
    { href: "#", icon: Facebook, label: "Facebook" },
    { href: "#", icon: Youtube, label: "Youtube" },
    { href: "#", icon: Send, label: "Zalo" },
  ];

  return (
    <footer className="bg-brand-blue text-white pt-16 pb-8">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row gap-10 md:gap-12 lg:gap-8 items-center lg:items-start">
          {/* Brand Column - Takes more space */}
          <div className="flex-1 lg:max-w-md text-center lg:text-left">
            <Link href="/" className="flex items-center gap-3 mb-6 justify-center lg:justify-start">
              <div className="bg-white p-1 rounded-xl">
                <Image src="/logo-app.png" alt="Saigon Speed Logo" width={48} height={48} className="rounded-lg" />
              </div>
              <div>
                <span className="block text-xl font-bold tracking-tight">SAIGON SPEED</span>
                <span className="block text-xs text-blue-200 tracking-widest uppercase">Logistics Solution</span>
              </div>
            </Link>
            <p className="text-blue-100 leading-relaxed mb-6 text-sm md:text-base">
              Saigon Speed Logistics - Đối tác tin cậy trong lĩnh vực chuyển phát nhanh. Chúng tôi cam kết mang đến giải pháp vận chuyển tối ưu, nhanh chóng và an toàn nhất cho khách hàng. Dịch vụ 24/7.
            </p>

          </div>

          {/* Links Section - Flexible middle section */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap md:flex-nowrap gap-8 md:gap-10 lg:gap-12 flex-1 text-center lg:text-left">
            {/* Dịch vụ */}
            <div className="flex-1 min-w-[150px]">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2 justify-center lg:justify-start">
                <span className="h-1 w-6 bg-brand-orange rounded-full"></span>
                Dịch vụ
              </h3>
              <ul className="space-y-4">
                {serviceLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-blue-100 transition hover:text-brand-orange hover:translate-x-1 inline-block">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hỗ trợ */}
            <div className="flex-1 min-w-[150px]">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2 justify-center lg:justify-start">
                <span className="h-1 w-6 bg-brand-orange rounded-full"></span>
                Hỗ trợ
              </h3>
              <ul className="space-y-4">
                {supportLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-blue-100 transition hover:text-brand-orange hover:translate-x-1 inline-block">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kết nối */}
            <div className="flex-1 min-w-[150px]">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2 justify-center lg:justify-start">
                <span className="h-1 w-6 bg-brand-orange rounded-full"></span>
                Kết nối
              </h3>
              <div className="flex gap-3 flex-wrap justify-center lg:justify-start">
                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-brand-orange hover:-translate-y-1"
                  >
                    <social.icon className="h-6 w-6" />
                    <span className="sr-only">{social.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Contact Info & Newsletter Row */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 mt-8 items-center md:items-start">
          {/* Contact Info */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-brand-orange">
                <PhoneCall className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-blue-200 uppercase font-semibold">Hotline</p>
                <a href="tel:0889741931" className="text-lg font-bold hover:text-brand-orange transition">0889 741 931</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-brand-orange">
                <Send className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-blue-200 uppercase font-semibold">Email</p>
                <a href="mailto:support@saigonspeed.vn" className="hover:text-brand-orange transition">support@saigonspeed.vn</a>
              </div>
            </div>
          </div>

          {/* Newsletter - Responsive width */}
          <div className="w-full md:w-96 lg:w-80 flex-shrink-0">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2 justify-center md:justify-start">
              <span className="h-1 w-6 bg-brand-orange rounded-full"></span>
              Đăng ký nhận tin
            </h3>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10 sm:mt-0 mt-4">
              <p className="text-sm text-blue-200 mb-2 text-center md:text-left">Nhận ưu đãi mới nhất từ chúng tôi</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="flex-1 min-w-0 bg-white/10 border-0 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-blue-200/50 focus:ring-2 focus:ring-brand-orange focus:bg-white/20 focus:outline-none"
                />
                <button className="flex-shrink-0 bg-brand-orange text-white rounded-lg px-4 py-2.5 hover:bg-brand-orange/90 transition flex items-center justify-center">
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Footer Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-blue-200/60">
          <p>&copy; {new Date().getFullYear()} Saigon Speed Logistics. All Rights Reserved.</p>
          <div className="flex gap-6">
            <span>Điều khoản</span>
            <span>Bảo mật</span>
            <span>Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
}