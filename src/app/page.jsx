"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Send, Truck, Shield, Clock, ArrowRight, Package, Ticket, Bell } from "lucide-react";
import Header from "@/components/layout/Header";

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check for logged-in user from localStorage
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const userObj = JSON.parse(storedUser);
        if (userObj?.email) {
          setIsLoggedIn(true);
        }
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f8fc] to-[#e6e9f4] font-inter">
      <Header />
      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-[#1f2050] to-[#2d3b6f] px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
          <div className="absolute inset-0 bg-[url('/customer.png')] bg-cover bg-center opacity-10"></div>
          <div className="relative mx-auto max-w-7xl text-center">
            <h1 className="text-4xl font-bold text-white sm:text-6xl lg:text-7xl">
              Quản lý vận chuyển
              <span className="bg-gradient-to-r from-[#5146ff] to-[#6b5aff] bg-clip-text text-transparent">
                {" "}dễ dàng hơn
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300 sm:text-xl">
              Nền tảng toàn diện để tạo đơn hàng, theo dõi vận đơn và quản lý vận chuyển của bạn.
              Trải nghiệm dịch vụ giao nhận chuyên nghiệp từ SSE Logistics.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/orders"
                className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#5146ff] to-[#6b5aff] px-8 py-4 text-lg font-bold text-white shadow-xl shadow-[#5146ff]/40 transition hover:shadow-2xl hover:scale-105"
              >
                <span>{isLoggedIn ? 'Tạo đơn hàng' : 'Tạo yêu cầu'}</span>
                <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/tracking"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                Tra cứu vận đơn
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-[#1f2050] sm:text-4xl">
                Tại sao chọn SSE?
              </h2>
              <p className="mt-4 text-lg text-slate-500">
                Chúng tôi mang đến giải pháp giao vận toàn diện với công nghệ tiên tiến.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              <FeatureCard
                icon={Truck}
                title="Giao nhận nhanh chóng"
                description="Mạng lưới phủ sóng toàn quốc với thời gian giao hàng tối ưu."
              />
              <FeatureCard
                icon={Shield}
                title="An toàn & Bảo mật"
                description="Hệ thống theo dõi thời gian thực đảm bảo hàng hóa luôn được bảo vệ."
              />
              <FeatureCard
                icon={Clock}
                title="Hỗ trợ 24/7"
                description="Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ bạn bất kỳ lúc nào."
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 md:grid-cols-3">
              <StatItem number="500K+" label="Đơn hàng thành công" />
              <StatItem number="98%" label="Tỷ lệ giao đúng hạn" />
              <StatItem number="24/7" label="Hỗ trợ khách hàng" />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-[#1f2050] sm:text-4xl">
                Dịch vụ của chúng tôi
              </h2>
              <p className="mt-4 text-lg text-slate-500">
                Đáp ứng mọi nhu cầu vận chuyển từ cá nhân đến doanh nghiệp.
              </p>
            </div>
            <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ServiceCard
                icon={Package}
                title="Giao hàng nội địa"
                description="Phủ sóng khắp Việt Nam với tốc độ nhanh và giá cả hợp lý."
                href="/orders"
              />
              <ServiceCard
                icon={Ticket}
                title="Vouchers ưu đãi"
                description="Nhiều chương trình khuyến mãi giảm giá hấp dẫn."
                href="/vouchers"
              />
              <ServiceCard
                icon={Bell}
                title="Thông báo tức thời"
                description="Cập nhật trạng thái đơn hàng theo thời gian thực."
                href="/tracking"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-[#5146ff] to-[#6b5aff] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Bắt đầu với SSE ngay hôm nay!
            </h2>
            <p className="mt-4 text-lg text-indigo-100">
              Tạo tài khoản miễn phí và trải nghiệm dịch vụ giao vận hàng đầu.
            </p>
            <Link
              href="/orders/create"
              className="mt-8 group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-lg font-bold text-[#5146ff] shadow-xl transition hover:shadow-2xl hover:scale-105"
            >
              <span>{isLoggedIn ? 'Tạo đơn hàng ngay' : 'Tạo yêu cầu ngay'}</span>
              <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <Link href="/" className="flex items-center gap-2">
                <Image src="/logo-navbar.png" alt="SSE" width={40} height={40} />
                <span className="text-xl font-bold">SSE Portal</span>
              </Link>
              <p className="mt-4 text-slate-300">
                Dịch vụ logistics hàng đầu Việt Nam.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Dịch vụ</h3>
              <ul className="mt-4 space-y-2 text-slate-300">
                <li><Link href="/orders" className="hover:text-white">Tạo đơn hàng</Link></li>
                <li><Link href="/tracking" className="hover:text-white">Tra cứu vận đơn</Link></li>
                <li><Link href="/vouchers" className="hover:text-white">Ưu đãi</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Hỗ trợ</h3>
              <ul className="mt-4 space-y-2 text-slate-300">
                <li><Link href="/faq" className="hover:text-white">Trung tâm hỗ trợ</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Bảo mật</Link></li>
                <li><Link href="/terms" className="hover:text-white">Điều khoản</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Liên hệ</h3>
              <p className="mt-4 text-slate-300">
                Hotline: 1900-xxxx<br />
                Email: support@sse.vn
              </p>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-700 pt-8 text-center text-slate-400">
            <p>© {new Date().getFullYear()} SSE Logistics. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-8 text-center transition hover:shadow-lg hover:shadow-slate-200/50">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#5146ff]/10">
        <Icon className="h-8 w-8 text-[#5146ff]" />
      </div>
      <h3 className="mt-6 text-xl font-bold text-[#1f2050]">{title}</h3>
      <p className="mt-2 text-slate-500">{description}</p>
    </div>
  );
}

function StatItem({ number, label }) {
  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-[#5146ff]">{number}</div>
      <div className="mt-2 text-slate-600">{label}</div>
    </div>
  );
}

function ServiceCard({ icon: Icon, title, description, href }) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-lg hover:shadow-slate-200/50"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#5146ff]/10">
          <Icon className="h-6 w-6 text-[#5146ff]" />
        </div>
        <ArrowRight className="h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-1" />
      </div>
      <h3 className="mt-4 text-xl font-bold text-[#1f2050]">{title}</h3>
      <p className="mt-2 text-slate-500">{description}</p>
    </Link>
  );
}
