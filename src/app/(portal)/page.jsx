"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight, Truck, Package, LifeBuoy, Ticket, Search } from "lucide-react";
import { useState } from "react";

// --- COMPONENTS ---

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center bg-gradient-to-b from-blue-50 via-white to-white py-16 px-6 rounded-3xl">
        <h1 className="text-4xl font-bold text-brand-blue font-display sm:text-5xl md:text-6xl">
          Chào Mừng Đến Với SSE Portal
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          Nền tảng tất cả trong một để quản lý, theo dõi và tối ưu hóa mọi nhu cầu vận chuyển của bạn.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/orders/create"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-orange px-8 py-3 text-base font-bold text-white shadow-lg shadow-brand-orange/30 transition hover:bg-opacity-90 hover:shadow-xl"
          >
            Tạo Vận Đơn Mới
          </Link>
          <Link
            href="#tracking"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-base font-bold text-brand-blue shadow-md border border-slate-200 transition hover:bg-slate-100 hover:shadow-lg"
          >
            Theo Dõi Đơn Hàng
          </Link>
        </div>
      </section>

      {/* Main Tracking Card */}
      <section id="tracking" className="mx-auto max-w-4xl scroll-mt-20">
        <TrackingCard />
      </section>

      {/* Action Cards Section */}
      <section>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <ActionCard
            href="/orders"
            icon={Package}
            title="Quản Lý Đơn Hàng"
            description="Xem lịch sử, trạng thái và chi tiết tất cả các đơn hàng của bạn ở một nơi."
          />
          <ActionCard
            href="/vouchers"
            icon={Ticket}
            title="Ưu Đãi & Vouchers"
            description="Khám phá và áp dụng các mã giảm giá độc quyền để tiết kiệm chi phí."
          />
          <ActionCard
            href="/contact"
            icon={LifeBuoy}
            title="Trung Tâm Hỗ Trợ"
            description="Cần giúp đỡ? Liên hệ với chúng tôi hoặc tìm câu trả lời trong mục FAQ."
          />
        </div>
      </section>
    </div>
  );
}

function TrackingCard() {
  const [trackingCode, setTrackingCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (trackingCode.trim()) {
      // Assuming you have a tracking page at /tracking
      window.location.href = `/tracking?code=${encodeURIComponent(trackingCode.trim())}`;
    }
  };

  return (
    <div className="rounded-2xl bg-white p-8 shadow-2xl shadow-brand-blue/10 border border-slate-100">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue/10">
          <Truck className="h-7 w-7 text-brand-blue" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-brand-blue">
            Tra Cứu Vận Đơn Nhanh
          </h2>
          <p className="text-slate-500">
            Nhập mã vận đơn để theo dõi hành trình chi tiết.
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-4">
        <input
          type="text"
          value={trackingCode}
          onChange={(e) => setTrackingCode(e.target.value)}
          placeholder="Nhập mã vận đơn (VD: SSE123456)"
          className="w-full rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-slate-700 outline-none ring-2 ring-transparent transition focus:ring-brand-blue/50 focus:border-brand-blue"
          required
        />
        <button
          type="submit"
          disabled={!trackingCode.trim()}
          className="group flex items-center justify-center flex-shrink-0 gap-2 rounded-full bg-brand-blue px-8 py-3 text-sm font-bold text-white shadow-lg shadow-brand-blue/30 transition-all hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Search className="h-4 w-4" />
          <span>Tra Cứu</span>
        </button>
      </form>
    </div>
  );
}

function ActionCard({ href, icon: Icon, title, description }) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm transition hover:border-brand-orange hover:shadow-lg hover:-translate-y-1"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
        <Icon className="h-8 w-8" />
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-bold text-brand-blue">{title}</h3>
        <p className="mt-1 text-slate-500">{description}</p>
        <div className="mt-4 flex items-center text-sm font-semibold text-brand-orange">
          <span>Đi đến</span>
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1 ml-1" />
        </div>
      </div>
    </Link>
  );
}