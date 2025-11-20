"use client";

import clsx from "clsx";
import { CheckCircle2, Clock3, Plus, Ticket, LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMemo, useState } from "react";

const MOCK_VOUCHERS = [
  {
    code: "SSEFREESHIP",
    title: "Miễn phí vận chuyển",
    description: "Đơn hàng nội thành từ 200K",
    expiry: "30/11/2025",
    status: "Sẵn sàng",
    discount: "Free",
    color: "from-blue-500 to-cyan-500",
  },
  {
    code: "SSEGIAM10",
    title: "Giảm 10% đơn hàng",
    description: "Tối đa 50K cho đơn quốc tế",
    expiry: "15/12/2025",
    status: "Sẵn sàng",
    discount: "10%",
    color: "from-purple-500 to-pink-500",
  },
  {
    code: "WELCOME2025",
    title: "Ưu đãi thành viên mới",
    description: "Giảm 25K cho đơn đầu tiên",
    expiry: "31/10/2025",
    status: "Đã dùng",
    discount: "25K",
    color: "from-slate-400 to-slate-500",
  },
  {
    code: "SINHNHAT",
    title: "Mừng sinh nhật khách hàng",
    description: "Giảm 20% toàn bộ dịch vụ",
    expiry: "01/11/2025",
    status: "Sẵn sàng",
    discount: "20%",
    color: "from-orange-500 to-red-500",
  },
  {
    code: "BLACKFRIDAY",
    title: "Black Friday Sale",
    description: "Giảm 50% phí vận chuyển",
    expiry: "28/11/2025",
    status: "Sẵn sàng",
    discount: "50%",
    color: "from-red-500 to-pink-600",
  },
  {
    code: "HETHAN2025",
    title: "Voucher hết hạn",
    description: "Giảm 15K cho đơn hàng",
    expiry: "31/08/2025",
    status: "Hết hạn",
    discount: "15K",
    color: "from-yellow-400 to-orange-500",
  },
];

const STATUS_MAP = {
  "Sẵn sàng": { bg: "bg-emerald-100", text: "text-emerald-600", dot: "bg-emerald-500" },
  "Đã dùng": { bg: "bg-slate-100", text: "text-slate-500", dot: "bg-slate-400" },
  "Hết hạn": { bg: "bg-red-100", text: "text-red-500", dot: "bg-red-500" },
};

const TABS = ["Sẵn sàng", "Đã dùng", "Hết hạn"];

export default function VouchersPage() {
  const [activeTab, setActiveTab] = useState("Sẵn sàng");
  const [keyword, setKeyword] = useState("");
  const isLoggedIn = useAuthStore((state) => state.isAuthenticated);


  const filteredVouchers = useMemo(() => {
    return MOCK_VOUCHERS.filter((v) => v.status === activeTab && v.code.toLowerCase().includes(keyword.toLowerCase().trim()));
  }, [activeTab, keyword]);

  // If not logged in, show login prompt
  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
          <LogIn className="h-10 w-10 text-slate-400" />
        </div>
        <h2 className="text-2xl font-bold text-[#1f2050]">Vui lòng đăng nhập</h2>
        <p className="mt-2 text-slate-500">Bạn cần đăng nhập để xem và quản lý voucher của mình.</p>
        <Link
          href="/auth"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#5146ff] px-6 py-3 text-lg font-semibold text-white shadow-md shadow-[#5146ff]/30 transition hover:shadow-lg hover:scale-105"
        >
          <LogIn className="h-5 w-5" />
          Đăng nhập ngay
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1f2050]">Ví Voucher</h1>
          <p className="mt-1 text-slate-500">Quản lý mã ưu đãi & khuyến mãi của bạn.</p>
        </div>
        <div className="flex w-full max-w-xl flex-col gap-2 rounded-2xl bg-white p-2 shadow-lg shadow-indigo-500/10 sm:flex-row sm:items-center">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Nhập mã voucher..."
            className="flex-1 rounded-xl bg-slate-50 px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
          />
          <button className="flex items-center justify-center gap-2 rounded-xl bg-[#5146ff] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#5146ff]/25 transition hover:bg-[#4137d8]">
            <Plus className="h-4 w-4" />
            <span>Thêm</span>
          </button>
        </div>
      </div>

      <div className="border-b border-slate-200">
        <nav className="-mb-px flex space-x-4 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                "whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition",
                activeTab === tab
                  ? "bg-[#5146ff]/10 text-[#5146ff] shadow-sm"
                  : "text-slate-500 hover:bg-slate-100"
              )}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {filteredVouchers.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredVouchers.map((voucher) => (
            <VoucherCard key={voucher.code} voucher={voucher} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

const VoucherCard = ({ voucher }) => {
  const statusStyle = STATUS_MAP[voucher.status] || STATUS_MAP["Đã dùng"];
  const isReady = voucher.status === "Sẵn sàng";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className={`absolute inset-y-0 left-0 w-2 bg-gradient-to-b ${voucher.color}`}></div>
      <div className="flex flex-col gap-4 p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white shadow-sm overflow-hidden">
            <Image src="/voucher.png" alt="Voucher" width={64} height={64} className="object-cover w-full h-full" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">{voucher.code}</span>
              <span className={clsx("inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold", statusStyle.bg, statusStyle.text)}>
                <span className={clsx("h-1.5 w-1.5 rounded-full", statusStyle.dot)}></span>
                {voucher.status}
              </span>
            </div>
            <h3 className="mt-1 text-lg font-bold text-[#1f2050]">{voucher.title}</h3>
            <p className="text-sm text-slate-500">{voucher.description}</p>
          </div>
          <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${voucher.color} text-white font-bold text-lg`}>{voucher.discount}</div>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-600">
          <span className="flex items-center gap-1">
            <Clock3 className="h-4 w-4 text-slate-400" />
            Hết hạn: {voucher.expiry}
          </span>
          {isReady ? (
            <button className="flex items-center gap-1 rounded-full bg-[#5146ff] px-3 py-1 text-xs font-semibold text-white shadow hover:shadow-md">
              <CheckCircle2 className="h-3 w-3" />
              Sử dụng
            </button>
          ) : (
            <span className="text-xs font-semibold text-slate-400">{voucher.status}</span>
          )}
        </div>
      </div>
    </div>
  );
};

const EmptyState = () => (
  <div className="col-span-full rounded-3xl border border-slate-100 bg-white p-12 text-center shadow-sm">
    <Ticket className="mx-auto h-12 w-12 text-slate-300" />
    <h3 className="mt-4 text-lg font-semibold text-[#1f2050]">Không có voucher</h3>
    <p className="mt-1 text-slate-500">Bạn không có voucher nào trong mục này.</p>
  </div>
);

