"use client";

import CreateOrderModal from "@/components/orders/CreateOrderModal";
import { Button, Input, Textarea } from "@nextui-org/react";
import clsx from "clsx";
import { Check, Filter, Home, Mail, MapPin, MoreVertical, Package, Phone, Plus, Search, Send, Truck } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const MOCK_ORDERS = [
  { id: "SSE88C1", from: "Kho Long An", to: "227 Nguyễn Văn Cừ, Q5", status: "Đã giao", date: "15/11/2025" },
  { id: "SSE45B2", from: "KCN Tân Tạo", to: "Khu Công Nghệ Cao, Q9", status: "Đang giao", date: "15/11/2025" },
  { id: "SSE12A3", from: "Cảng Cát Lái", to: "KCN Sóng Thần, BD", status: "Chờ lấy hàng", date: "14/11/2025" },
  { id: "SSE99D4", from: "Kho Thủ Đức", to: "AEON Mall Bình Tân", status: "Đã hủy", date: "13/11/2025" },
  { id: "SSE75E5", from: "Quận 1", to: "Quận 7", status: "Đã giao", date: "12/11/2025" },
];
const TABS = ["Tất cả", "Chờ lấy hàng", "Đang giao", "Đã giao", "Đã hủy"];
const COUNTRIES = ["Việt Nam", "Singapore", "United States", "Australia", "Japan"];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const filterRef = useRef(null);

  // Guest request form state
  const [requestData, setRequestData] = useState({
    name: "",
    phone: "",
    email: "",
    country: "Việt Nam",
    city: "",
    weight: "",
    note: "",
  });
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOrders = MOCK_ORDERS.filter((order) => {
    // Filter by status tab
    const statusMatch = activeTab === "Tất cả" || order.status === activeTab;

    // Filter by search term
    const searchMatch = searchTerm === "" ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.to.toLowerCase().includes(searchTerm.toLowerCase());

    return statusMatch && searchMatch;
  });

  const handleCreateOrder = (formData) => {
    console.log("New Order Data from Modal:", formData);
    alert("Đơn hàng đã được tạo thành công (mock)!");
  };

  const handleRequestChange = (e) => {
    const { name, value } = e.target;
    setRequestData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    setIsSubmittingRequest(true);
    setTimeout(() => {
      setIsSubmittingRequest(false);
      setRequestSuccess(true);
      setRequestData({ name: "", phone: "", email: "", country: "Việt Nam", city: "", weight: "", note: "" });
    }, 1000);
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-3xl space-y-6 mx-auto">
        <div className="rounded-3xl bg-white p-7 shadow-md border border-slate-100">
          <p className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-[#5146ff]">
            Gửi yêu cầu gửi hàng quốc tế
          </p>
          <h1 className="mt-3 text-3xl font-bold text-[#1f2050] text-center">Chỉ mất 30 giây — SSE liên hệ tư vấn ngay</h1>
          <p className="mt-4 text-center text-lg text-[#5146ff] font-medium">Nhân viên sẽ liên hệ tư vấn ngay!</p>

          <form onSubmit={handleSubmitRequest} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                type="text"
                name="name"
                label="Họ tên"
                value={requestData.name}
                onChange={handleRequestChange}
                isRequired
                variant="faded"
                labelPlacement="outside"
                placeholder="Nguyễn Văn A"
              />
              <Input
                type="tel"
                name="phone"
                label="Số điện thoại"
                value={requestData.phone}
                onChange={handleRequestChange}
                isRequired
                variant="faded"
                labelPlacement="outside"
                placeholder="09xx xxx xxx"
                startContent={<Phone className="h-4 w-4 text-slate-400" />}
              />
              <Input
                type="email"
                name="email"
                label="Email (không bắt buộc)"
                value={requestData.email}
                onChange={handleRequestChange}
                variant="faded"
                labelPlacement="outside"
                placeholder="email@domain.com"
                startContent={<Mail className="h-4 w-4 text-slate-400" />}
              />
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-slate-700 mb-2">
                  Quốc gia nhận
                </label>
                <div className="relative">
                  <select
                    id="country"
                    name="country"
                    value={requestData.country}
                    onChange={(e) => setRequestData((prev) => ({ ...prev, country: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-[#5146ff] focus:ring-[#5146ff]/50 appearance-none"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              <Input
                type="text"
                name="city"
                label="Thành phố nhận"
                value={requestData.city}
                onChange={handleRequestChange}
                isRequired
                variant="faded"
                labelPlacement="outside"
                placeholder="VD: San Francisco"
              />
              <Input
                type="number"
                name="weight"
                label="Cân nặng dự kiến (kg)"
                value={requestData.weight}
                onChange={handleRequestChange}
                min="0"
                step="0.1"
                isRequired
                variant="faded"
                labelPlacement="outside"
                placeholder="VD: 2.5"
              />
            </div>
            <div>
              <Textarea
                name="note"
                label="Ghi chú hàng hóa (tuỳ chọn)"
                value={requestData.note}
                onChange={handleRequestChange}
                rows={3}
                variant="faded"
                labelPlacement="outside"
                placeholder="Hàng dễ vỡ, liên hệ giờ hành chính..."
              />
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 pt-2">
              <Button
                type="submit"
                color="primary"
                variant="solid"
                startContent={<Send className="h-4 w-4" />}
                isLoading={isSubmittingRequest}
                className="px-6 py-3 text-sm font-semibold"
              >
                {isSubmittingRequest ? "Đang gửi..." : "Gửi yêu cầu ngay"}
              </Button>
            </div>
            <p className="text-center md:text-right text-xs text-slate-500">Nhân viên SSE sẽ liên hệ trong 5–10 phút để hỗ trợ.</p>
          </form>

          {requestSuccess && (
            <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
              <p className="font-semibold">Cảm ơn bạn!</p>
              <p>Nhân viên SSE sẽ liên hệ trong 5–10 phút để tư vấn và báo giá.</p>
              <p className="mt-2 text-xs text-emerald-700">Hotline: 0909 951 549 • Zalo: SSE Express</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6 md:gap-8">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1f2050] sm:text-3xl">Đơn hàng</h1>
            <p className="mt-1 text-sm text-slate-500 sm:text-base">Quản lý, tạo mới và theo dõi tất cả các yêu cầu gửi hàng của bạn.</p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 rounded-full bg-[#5146ff] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#5146ff]/30 transition-transform hover:scale-105 shrink-0"
          >
            <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden xs:inline">Tạo đơn hàng</span>
            <span className="xs:hidden">Tạo</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="relative flex-1 sm:max-w-md">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 sm:h-5 sm:w-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm mã đơn, điểm đi/đến..."
              className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5146ff]/20 sm:py-3 sm:pl-11 sm:text-base"
            />
          </div>
          <div className="relative flex-shrink-0" ref={filterRef}>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 sm:px-4 sm:py-3 whitespace-nowrap"
            >
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Bộ lọc</span>
              <span className="sm:hidden">Lọc</span>
            </button>
            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                    Theo ngày tạo
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                    Theo trạng thái
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                    Theo điểm đi/đến
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="border-b border-slate-200">
          <nav className="-mb-px flex overflow-x-auto scrollbar-hide">
            {TABS.map((tab, index) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={clsx(
                  "flex-shrink-0 whitespace-nowrap border-b-2 py-3 px-2 text-xs sm:text-sm font-medium sm:px-3 flex items-center gap-1.5 sm:gap-2 min-w-0",
                  index === TABS.length - 1 ? "mr-0" : "sm:mr-0 mr-3",
                  activeTab === tab
                    ? "border-[#5146ff] text-[#5146ff]"
                    : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700"
                )}
              >
                <Package className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="truncate">{tab}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="space-y-4">
        {filteredOrders.length > 0 ? filteredOrders.map((order) => <OrderCard key={order.id} order={order} />) : <EmptyState />}
      </div>

      <CreateOrderModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateOrder}
      />
    </div>
  );
}

function OrderCard({ order }) {
  const STATUS_MAP = {
    "Đã giao": { icon: Check, color: "text-green-600", bg: "bg-green-100/80" },
    "Đang giao": { icon: Truck, color: "text-blue-600", bg: "bg-blue-100/80" },
    "Chờ lấy hàng": { icon: Package, color: "text-amber-600", bg: "bg-amber-100/80" },
    "Đã hủy": { icon: Package, color: "text-red-600", bg: "bg-red-100/80" },
  };
  const StatusIcon = STATUS_MAP[order.status]?.icon || Package;
  const statusColor = STATUS_MAP[order.status]?.color || "text-slate-600";
  const statusBg = STATUS_MAP[order.status]?.bg || "bg-slate-100";

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-lg border border-slate-100 hover:border-[#5146ff]/30 sm:p-5">
      {/* Mobile-first: Clean vertical layout */}
      <div className="space-y-3">
        {/* Header row: Order ID, Status, Menu */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#5146ff]/10 flex-shrink-0">
              <Package className="h-5 w-5 text-[#5146ff]" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-[#5146ff] truncate">{order.id}</p>
              <p className="text-xs text-slate-500 mt-0.5">Ngày tạo: {order.date}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <div className={clsx("flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-semibold flex-shrink-0", statusBg, statusColor)}>
              <StatusIcon className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{order.status}</span>
            </div>
            <button className="text-slate-400 hover:text-slate-600 p-1">
              <MoreVertical className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>

        {/* Location info - stacked, concise */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="flex items-start gap-2.5">
            <Home className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-slate-500 leading-tight">Từ</p>
              <p className="text-sm text-slate-700 truncate">{order.from}</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <MapPin className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-slate-500 leading-tight">Đến</p>
              <p className="text-sm text-slate-700 truncate">{order.to}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const EmptyState = () => (
  <div className="text-center rounded-2xl bg-white p-12 shadow-sm border border-slate-100">
    <Image src="/don-hang-empty.png" alt="Empty orders" width={120} height={120} className="mx-auto" />
    <h3 className="mt-4 text-lg font-semibold text-[#1f2050]">Chưa có đơn hàng</h3>
    <p className="mt-1 text-slate-500">Bạn sẽ thấy danh sách đơn ở đây sau khi tạo đơn mới.</p>
  </div>
);
