"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  PackageCheck,
  CheckCircle,
  Package,
  MoreVertical,
  Copy,
  FileText,
  RotateCcw,
  Printer,
  Loader2,
} from "lucide-react";
import clsx from "clsx";

const MOCK_TRACKING_RESULT = {
  code: "SSE123456789",
  status: "Đang giao hàng",
  statusCode: "in_transit",
  eta: "Thứ Sáu, 17/11/2025",
  origin: "Kho SSE Bình Dương",
  destination: "227 Nguyễn Văn Cừ, P4, Q5, TP.HCM",
  sender: "Công ty ABC",
  recipient: "Trần Minh Quân",
  weight: "2.5 kg",
  value: "250.000 VNĐ",
  route: [
    {
      status: "Đang giao hàng",
      location: "Bưu cục phát Quận 5",
      time: "09:15 15/11/2025",
      isCurrent: true,
    },
    {
      status: "Đã đến bưu cục phát",
      location: "Bưu cục phát Quận 5",
      time: "04:00 15/11/2025",
      isCurrent: false,
    },
    {
      status: "Đang trung chuyển",
      location: "Trung tâm khai thác TP.HCM",
      time: "21:00 14/11/2025",
      isCurrent: false,
    },
    {
      status: "Đã rời kho nguồn",
      location: "Kho SSE Bình Dương",
      time: "19:30 14/11/2025",
      isCurrent: false,
    },
    {
      status: "Đã lấy hàng thành công",
      location: "Kho SSE Bình Dương",
      time: "18:30 14/11/2025",
      isCurrent: false,
    },
    {
      status: "Đã tạo đơn hàng",
      location: "Hệ thống",
      time: "16:00 14/11/2025",
      isCurrent: false,
    },
  ],
};

export default function TrackingPage() {
  const [trackingId, setTrackingId] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    if (code && !trackingId && !result) {
      setTrackingId(code);
      setIsLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        setResult({ ...MOCK_TRACKING_RESULT, code });
        setIsLoading(false);
      }, 1200);
    }
  }, [searchParams, trackingId, result]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!trackingId) return;
    setIsLoading(true);
    setTimeout(() => {
      setResult(MOCK_TRACKING_RESULT);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="mx-auto max-w-6xl flex flex-col gap-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[#1f2050]">Tra cứu hành trình đơn hàng</h1>
        <p className="mt-3 text-slate-500">
          Nhập mã vận đơn để xem trạng thái chi tiết và lộ trình giao nhận.
        </p>
      </div>

      <form
        onSubmit={handleSearch}
        className="flex flex-col gap-3 rounded-3xl bg-white p-4 shadow-xl shadow-indigo-500/10 sm:flex-row sm:items-center"
      >
        <div className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-[#5146ff] focus-within:ring-2 focus-within:ring-[#5146ff]/15">
          <div className="flex items-center gap-3">
            <Search className="h-5 w-5 text-slate-400" />
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="Nhập mã vận đơn của bạn (VD: SSE88C1)..."
              className="w-full bg-transparent text-base text-slate-700 placeholder:text-slate-400 focus:outline-none"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#5146ff] to-[#6b5aff] px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/40 disabled:opacity-60"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          <span>{isLoading ? "Đang tìm..." : "Tra cứu"}</span>
        </button>
      </form>

      <div>
        {isLoading && <p className="text-center text-slate-500">Đang tải dữ liệu...</p>}
        {!isLoading && !result && <EmptyState />}
        {!isLoading && result && <TrackingResult data={result} />}
      </div>
    </div>
  );
}

const EmptyState = () => (
  <div className="text-center rounded-3xl bg-white p-12 shadow-sm border border-slate-100">
    <img
      src="/tra-cuu.png"
      alt="Tra cứu vận đơn"
      width="200"
      height="160"
      className="mx-auto"
    />
    <h3 className="mt-6 text-lg font-semibold text-[#1f2050]">Chưa có thông tin hiển thị</h3>
    <p className="mt-1 text-slate-500">
      Vui lòng nhập mã vận đơn vào ô tra cứu phía trên để xem kết quả.
    </p>
  </div>
);

const TrackingResult = ({ data }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handle = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const getStatusColor = (status) => {
    if (status === "in_transit") return "bg-blue-100 text-blue-700 border-blue-200";
    if (status === "delivered") return "bg-green-100 text-green-700 border-green-200";
    if (status === "pending") return "bg-amber-100 text-amber-700 border-amber-200";
    return "bg-slate-100 text-slate-700 border-slate-200";
  };

  const menuActions = [
    { icon: Copy, label: "Sao chép mã", action: () => navigator.clipboard.writeText(data.code) },
    { icon: Printer, label: "In hóa đơn", action: () => window.print() },
    { icon: FileText, label: "Xem chi tiết", action: () => {} },
    { icon: RotateCcw, label: "Sắp xếp lại", action: () => {} },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 sm:p-7 shadow-xl shadow-indigo-500/12 border border-slate-100">
        <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-[0.2em]">
              <Package className="h-4 w-4" />
              <span>Mã đơn</span>
            </div>
            <p className="text-3xl font-bold text-[#1f2050]">{data.code}</p>
            <div className="flex flex-wrap gap-2 text-xs text-slate-600">
              <ChipBadge>Ngăn: {data.origin}</ChipBadge>
              <ChipBadge>Đích: {data.destination}</ChipBadge>
              <ChipBadge>ETA: {data.eta}</ChipBadge>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={clsx(
                "rounded-full border px-4 py-2 text-sm font-semibold",
                getStatusColor(data.statusCode)
              )}
            >
              {data.status}
            </span>
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="rounded-full border border-slate-200 p-2 text-slate-500 hover:bg-slate-50"
              >
                <MoreVertical className="h-5 w-5" />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-lg shadow-indigo-500/10">
                  {menuActions.map((action) => (
                    <button
                      key={action.label}
                      onClick={action.action}
                      className="flex w-full items-center gap-2 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <action.icon className="h-4 w-4 text-slate-400" />
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <InfoBox label="Ngăn" value={data.origin} />
          <InfoBox label="Đích" value={data.destination} />
          <InfoBox label="Cân nặng" value={data.weight} />
          <InfoBox label="Giá trị khai báo" value={data.value} />
          <InfoBox label="Trạng thái" value={data.status} accent />
          <InfoBox label="Dự kiến giao" value={data.eta} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.45fr_1fr]">
        <div className="rounded-3xl bg-white p-6 shadow-lg shadow-indigo-500/10 border border-slate-100">
          <div className="flex items-center gap-2 pb-4">
            <Package className="h-5 w-5 text-indigo-500" />
            <h3 className="text-lg font-bold text-[#1f2050]">Lộ trình giao nhận</h3>
          </div>
          <div className="space-y-4">
            {data.route.map((item, index) => (
              <div key={index} className="relative flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={clsx(
                      "flex h-9 w-9 items-center justify-center rounded-full border-2",
                      item.isCurrent ? "border-emerald-500 bg-emerald-50 text-emerald-500" : "border-slate-200 bg-slate-50 text-slate-400"
                    )}
                  >
                    {item.isCurrent ? <CheckCircle className="h-4 w-4" /> : <PackageCheck className="h-4 w-4" />}
                  </div>
                  {index !== data.route.length - 1 && <div className="flex-1 w-[2px] bg-slate-200"></div>}
                </div>
                <div
                  className={clsx(
                    "flex-1 rounded-xl border px-4 py-3 shadow-sm",
                    item.isCurrent ? "border-emerald-200 bg-emerald-50/70" : "border-slate-100 bg-slate-50"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-[#1f2050]">{item.status}</p>
                    <span className="text-xs text-slate-500">{item.time}</span>
                  </div>
                  <p className="text-sm text-slate-600">{item.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-blue-600 p-6 text-white shadow-lg shadow-indigo-500/30">
            <p className="text-sm uppercase tracking-[0.2em] text-indigo-100">Tóm tắt</p>
            <p className="mt-2 text-2xl font-bold">{data.status}</p>
            <p className="mt-2 text-indigo-100/90 text-sm">Đơn hàng đang trên lộ trình giao đến bạn.</p>
            <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
              <SummaryBadge label="Khai báo" value={data.value} />
              <SummaryBadge label="Cân nặng" value={data.weight} />
              <SummaryBadge label="Dự kiến" value={data.eta} />
            </div>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-lg shadow-indigo-500/10 border border-slate-100 space-y-3">
            <h4 className="text-sm font-bold text-[#1f2050]">Ngăn / Đích</h4>
            <InfoRow label="Ngăn" value={data.origin} />
            <InfoRow label="Đích" value={data.destination} />
            <InfoRow label="Người gửi" value={data.sender} />
            <InfoRow label="Người nhận" value={data.recipient} />
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoBox = ({ label, value, accent = false }) => (
  <div
    className={clsx(
      "rounded-2xl border px-4 py-3 shadow-sm",
      accent ? "border-indigo-200 bg-indigo-50/70" : "border-slate-100 bg-slate-50"
    )}
  >
    <p className="text-xs text-slate-500">{label}</p>
    <p className="text-sm font-semibold text-[#1f2050]">{value}</p>
  </div>
);

const SummaryBadge = ({ label, value }) => (
  <div className="rounded-xl bg-white/10 px-3 py-2 text-xs">
    <p className="text-indigo-100/80">{label}</p>
    <p className="font-semibold text-white">{value}</p>
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3 py-2">
    <span className="text-xs text-slate-500">{label}</span>
    <span className="text-sm font-semibold text-[#1f2050]">{value}</span>
  </div>
);

const ChipBadge = ({ children }) => (
  <span className="rounded-full bg-slate-100 px-3 py-1">{children}</span>
);
