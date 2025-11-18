"use client";

import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Truck,
  Package,
  Bell,
  Ticket,
} from "lucide-react";
import { useState } from "react";

// --- MOCK DATA ---
const RECENT_ORDERS = [
  { id: "SSE45B2", to: "Khu Công Nghệ Cao, Q9", status: "Đang giao" },
  { id: "SSE12A3", to: "KCN Sóng Thần, BD", status: "Chờ lấy hàng" },
  { id: "SSE88C1", to: "227 Nguyễn Văn Cừ, Q5", status: "Đã giao" },
];

const NOTIFICATIONS = [
  {
    icon: Ticket,
    text: "Bạn vừa nhận được voucher giảm 10%.",
    time: "2 giờ trước",
  },
  {
    icon: Package,
    text: "Đơn hàng SSE45B2 đã bắt đầu giao.",
    time: "8 giờ trước",
  },
  {
    icon: Bell,
    text: "Hệ thống sẽ bảo trì vào 23:00 hôm nay.",
    time: "1 ngày trước",
  },
];

// --- COMPONENTS ---

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Top Section: Welcome & Main Tracking */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#1f2050]">
          Chào mừng đến với SSE Portal
        </h1>
        <p className="mt-2 text-lg text-slate-500">
          Nền tảng quản lý đơn hàng và vận chuyển dành cho bạn.
        </p>
      </div>
      <div className="mx-auto max-w-4xl">
        <TrackingCard />
      </div>

      {/* Middle Section: Dashboard Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentOrdersWidget />
        <NotificationsWidget />
      </div>

      {/* Bottom Section: Action Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ActionCard
          href="/orders"
          imageSrc="/don-hang.png"
          title="Tạo đơn hàng mới"
          description="Bắt đầu gửi hàng chỉ với vài bước đơn giản."
        />
        <ActionCard
          href="/vouchers"
          imageSrc="/voucher.png"
          title="Ưu đãi & Vouchers"
          description="Xem và quản lý các mã giảm giá của bạn."
        />
        <ActionCard
          href="/faq"
          imageSrc="/FAQ.png"
          title="Trung tâm hỗ trợ"
          description="Tìm câu trả lời cho các thắc mắc của bạn."
        />
      </div>
    </div>
  );
}

function TrackingCard() {
  const [trackingCode, setTrackingCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (trackingCode.trim()) {
      window.location.href = `/tracking?code=${encodeURIComponent(trackingCode.trim())}`;
    }
  };

  return (
    <div className="rounded-2xl bg-white p-8 shadow-[0_20px_50px_rgba(81,70,255,0.1)]">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
          <Truck className="h-6 w-6 text-[#5146ff]" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-[#1f2050]">
            Tra cứu vận đơn
          </h2>
          <p className="text-slate-500">
            Nhập mã vận đơn để theo dõi hành trình đơn hàng của bạn.
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-2 sm:flex-row sm:gap-4">
        <input
          type="text"
          value={trackingCode}
          onChange={(e) => setTrackingCode(e.target.value)}
          placeholder="Nhập mã vận đơn (VD: SSE123456)"
          className="w-full rounded-full bg-[#f7f7fd] px-5 py-3 text-slate-600 outline-none ring-1 ring-transparent transition focus:ring-2 focus:ring-[#5146ff]/50"
          required
        />
        <button
          type="submit"
          disabled={!trackingCode.trim()}
          className="group flex items-center justify-center flex-shrink-0 gap-2 rounded-full bg-gradient-to-r from-[#5146ff] to-[#6b5aff] px-6 py-3 text-sm font-bold text-white shadow-[0_15px_35px_rgba(81,70,255,0.4)] transition-all hover:shadow-[0_20px_45px_rgba(81,70,255,0.6)] hover:scale-105 hover:from-[#4137d8] hover:to-[#5146ff] min-w-[140px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <span>Tra cứu ngay</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </form>
    </div>
  );
}

function RecentOrdersWidget() {
  const STATUS_STYLES = {
    "Đang giao": "bg-blue-100 text-blue-600",
    "Chờ lấy hàng": "bg-amber-100 text-amber-600",
    "Đã giao": "bg-green-100 text-green-600",
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 h-full">
      <h3 className="text-lg font-bold text-[#1f2050]">Đơn hàng gần đây</h3>
      <div className="mt-4 space-y-4">
        {RECENT_ORDERS.map((order) => (
          <Link
            href="/tracking"
            key={order.id}
            className="block rounded-lg p-4 transition hover:bg-slate-50"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-[#5146ff]">{order.id}</p>
                <p className="text-sm text-slate-500">Đến: {order.to}</p>
              </div>
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  STATUS_STYLES[order.status]
                }`}
              >
                {order.status}
              </span>
            </div>
          </Link>
        ))}
      </div>
      <Link
        href="/orders"
        className="mt-4 flex items-center text-sm font-semibold text-[#5146ff]"
      >
        <span>Xem tất cả đơn hàng</span>
        <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function NotificationsWidget() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 h-full">
      <h3 className="text-lg font-bold text-[#1f2050]">Thông báo</h3>
      <div className="mt-4 space-y-4">
        {NOTIFICATIONS.map((noti, index) => (
          <div
            key={index}
            className="flex items-start gap-4 rounded-lg p-4 transition hover:bg-slate-50"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-[#5146ff]">
              <noti.icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm text-slate-700">{noti.text}</p>
              <p className="text-xs text-slate-400">{noti.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActionCard({ href, imageSrc, title, description }) {
  return (
    <Link
      href={href}
      className="group flex justify-between rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm transition hover:border-indigo-200 hover:shadow-lg"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50">
        <img src={imageSrc} alt={title} width="40" height="40" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-[#1f2050]">{title}</h3>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
        <div className="flex mt-1 items-center text-sm font-semibold text-[#5146ff]">
          <span>Đi đến</span>
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
