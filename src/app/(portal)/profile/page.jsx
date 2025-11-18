"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { User, MapPin, Shield, Bell, CreditCard, Save, Plus, Mail, Lock, LogIn, Edit, Trash2, MessageSquare, Package, Ticket, Truck } from "lucide-react";
import clsx from "clsx";

const TABS = [
  { name: "Thông tin chung", icon: User },
  { name: "Sổ địa chỉ", icon: MapPin },
  { name: "Bảo mật", icon: Shield },
  { name: "Cài đặt thông báo", icon: Bell },
  { name: "Thông báo", icon: MessageSquare },
  { name: "Thanh toán", icon: CreditCard },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("Thông tin chung");
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

  const renderContent = useMemo(() => {
    if (activeTab === "Thông tin chung") return <GeneralInfo />;
    if (activeTab === "Sổ địa chỉ") return <AddressBook />;
    if (activeTab === "Bảo mật") return <SecuritySettings />;
    if (activeTab === "Thông báo") return <Notifications />;
    return <ComingSoon tab={activeTab} />;
  }, [activeTab]);

  // If not logged in, show login prompt
  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
          <LogIn className="h-10 w-10 text-slate-400" />
        </div>
        <h2 className="text-2xl font-bold text-[#1f2050]">Vui lòng đăng nhập</h2>
        <p className="mt-2 text-slate-500">Bạn cần đăng nhập để xem và quản lý hồ sơ của mình.</p>
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
      <div>
        <h1 className="text-3xl font-bold text-[#1f2050]">Hồ sơ của bạn</h1>
        <p className="mt-1 text-slate-500">Quản lý thông tin cá nhân, địa chỉ và cài đặt bảo mật.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-4 xl:grid-cols-4">
        <aside className="md:col-span-1 xl:col-span-1 order-1 md:order-1">
          {/* Navigation */}
          <nav className="sticky top-20 md:top-0 z-10 bg-white/95 backdrop-blur-lg border border-slate-200 px-2 py-2 md:bg-white md:backdrop-blur-none md:border-slate-100 md:rounded-2xl md:shadow-sm md:border md:p-4">
            <div className="flex overflow-x-auto md:flex-col md:space-y-1 gap-2 md:gap-0">
              {TABS.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={clsx(
                    "flex-shrink-0 md:flex-1 flex flex-col md:flex-row items-center justify-center md:justify-start gap-2 rounded-xl px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm font-medium transition-all duration-200 whitespace-nowrap md:whitespace-normal",
                    activeTab === tab.name
                      ? "bg-[#5146ff] text-white shadow-lg shadow-[#5146ff]/30"
                      : "text-slate-600 hover:bg-indigo-50 hover:text-[#1f2050]"
                  )}
                >
                  <tab.icon className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                  <span className="text-xs md:text-sm">{tab.name}</span>
                </button>
              ))}
            </div>
          </nav>
        </aside>

        <main className="md:col-span-3 xl:col-span-3 order-2 md:order-2">
          <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-slate-100">
            {renderContent}
          </div>
        </main>
      </div>
    </div>
  );
}

const FormRow = ({ label, children }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-slate-600">{label}</label>
    {children}
  </div>
);

const FormInput = (props) => (
  <input
    {...props}
    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-800 transition duration-200 placeholder:text-slate-400 focus:border-[#5146ff]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5146ff]/20"
  />
);

const GeneralInfo = () => (
  <form className="space-y-6">
    <div className="flex flex-col gap-4 sm:gap-6">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="relative h-20 w-20 flex-shrink-0 sm:h-28 sm:w-28">
          <Image src="/profile.png" alt="Avatar" fill className="rounded-full bg-slate-200 object-cover" />
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <button type="button" className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#5146ff] to-[#6b5aff] px-3 py-2 text-xs sm:text-sm font-medium text-white shadow-md shadow-[#5146ff]/30 transition hover:shadow-lg hover:scale-105 w-full">
            <User className="h-4 w-4" />
            Thay đổi ảnh
          </button>
          <button type="button" className="flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 hover:border-slate-300 w-full">
            <svg className="h-4 w-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Xóa ảnh
          </button>
          <p className="text-xs text-slate-400">JPG, GIF hoặc PNG. Tối đa 1MB.</p>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
      <FormRow label="Họ và tên">
        <FormInput type="text" defaultValue="Khách hàng SSE" />
      </FormRow>
      <FormRow label="Tên công ty (nếu có)">
        <FormInput type="text" defaultValue="Công ty TNHH SSE" />
      </FormRow>
      <FormRow label="Email">
        <FormInput type="email" defaultValue="customer@sse.vn" disabled />
      </FormRow>
      <FormRow label="Số điện thoại">
        <FormInput type="tel" defaultValue="0987654321" />
      </FormRow>
    </div>
    <div className="flex flex-col gap-2 sm:flex-row sm:gap-3 pt-2">
      <button type="submit" className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#5146ff] to-[#6b5aff] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#5146ff]/30 transition-transform hover:scale-105 hover:shadow-xl w-full sm:w-auto">
        <Save className="h-5 w-5" />
        <span>Lưu thay đổi</span>
      </button>
      <button type="button" className="flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition w-full sm:w-auto">
        <RotateCcwIcon />
        <span>Khôi phục</span>
      </button>
    </div>
  </form>
);

const AddressBook = () => (
  <div className="space-y-5">
    <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-xl font-bold text-[#1f2050]">Sổ địa chỉ</h2>
      <button type="button" className="flex items-center justify-center sm:justify-start gap-2 rounded-full bg-gradient-to-r from-[#5146ff] to-[#6b5aff] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[#5146ff]/30 transition hover:shadow-lg hover:scale-105 w-full sm:w-auto">
        <Plus className="h-4 w-4 flex-shrink-0" />
        <span>Thêm địa chỉ</span>
      </button>
    </div>

    <div className="space-y-3">
      {[{
        label: "Văn phòng công ty",
        address: "227 Nguyễn Văn Cừ, Phường 4, Quận 5, TP.HCM",
        isDefault: true,
      }, {
        label: "Kho hàng",
        address: "Lô A1, KCN Sóng Thần, Dĩ An, Bình Dương",
        isDefault: false,
      }].map((item) => (
        <div key={item.label} className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <p className="font-semibold text-[#1f2050]">{item.label}</p>
                <p className="text-sm text-slate-600">{item.address}</p>
              </div>
              {item.isDefault && <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 w-fit">Mặc định</span>}
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
              <button className="flex items-center justify-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-100 hover:border-blue-300 transition w-full sm:w-auto">
                <Edit className="h-4 w-4" />
                Sửa
              </button>
              <button className="flex items-center justify-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-700 hover:bg-red-100 hover:border-red-300 transition w-full sm:w-auto">
                <Trash2 className="h-4 w-4" />
                Xóa
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SecuritySettings = () => (
  <form className="space-y-6">
    <h2 className="text-xl font-bold text-[#1f2050]">Bảo mật</h2>
    <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
      <FormRow label="Mật khẩu hiện tại">
        <FormInput type="password" placeholder="••••••••" />
      </FormRow>
      <FormRow label="Mật khẩu mới">
        <FormInput type="password" placeholder="••••••••" />
      </FormRow>
      <FormRow label="Xác nhận mật khẩu mới" extraClass="md:col-span-2">
        <FormInput type="password" placeholder="••••••••" />
      </FormRow>
    </div>
    <div className="flex flex-col gap-2 sm:flex-row sm:gap-3 pt-2">
      <button type="submit" className="flex items-center justify-center gap-2 rounded-full bg-[#5146ff] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#5146ff]/30 transition-transform hover:scale-105 w-full sm:w-auto">
        <Lock className="h-5 w-5" />
        <span>Đổi mật khẩu</span>
      </button>
      <button type="button" className="flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition w-full sm:w-auto">
        <svg className="h-4 w-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
        Quên mật khẩu?
      </button>
    </div>
  </form>
);

const ComingSoon = ({ tab }) => (
  <div className="py-10 text-center">
    <h2 className="text-xl font-semibold text-[#1f2050]">Tính năng đang phát triển</h2>
    <p className="mt-2 text-slate-500">Nội dung cho mục "{tab}" sẽ sớm được cập nhật.</p>
  </div>
);

const RotateCcwIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
    <path d="M3 4v6h6" />
    <path d="M3 10a9 9 0 1 0 3-7" />
  </svg>
);

const Notifications = () => {
  // Mock notifications data - detailed version for profile page
  const notificationData = [
    {
      id: "1",
      icon: Package,
      category: "Đơn hàng",
      title: "Đơn hàng SSE88C1 đã giao thành công!",
      message: "Đơn hàng của bạn đã được giao tới địa chỉ 227 Nguyễn Văn Cừ, Q5, TP.HCM. Cảm ơn bạn đã tin tưởng SSE!",
      date: "15/11/2025",
      time: "14:30",
      isRead: false,
      actionUrl: "/tracking?code=SSE88C1",
      statusBadge: "success"
    },
    {
      id: "2",
      icon: Ticket,
      category: "Khuyến mãi",
      title: "Voucher giảm 10% cho đơn hàng tiếp theo",
      message: "Chúc mừng! Bạn vừa nhận được voucher giảm 10% cho đơn hàng từ 500K trở lên. Sử dụng mã SSEVN10.",
      date: "14/11/2025",
      time: "09:15",
      isRead: false,
      actionUrl: "/vouchers",
      statusBadge: "promo"
    },
    {
      id: "3",
      icon: Truck,
      category: "Vận chuyển",
      title: "Đơn hàng SSE45B2 đang được giao",
      message: "Đơn hàng có mã SSE45B2 đang trên đường giao đến bạn. Nhân viên giao hàng: Nguyễn Văn Minh - 0909 951 549.",
      date: "13/11/2025",
      time: "18:42",
      isRead: true,
      actionUrl: "/tracking?code=SSE45B2",
      statusBadge: "info"
    },
    {
      id: "4",
      icon: Mail,
      category: "Hệ thống",
      title: "Cập nhật chính sách giao hàng",
      message: "SSE đã cập nhật chính sách giao hàng khu vực TP.HCM. Thời gian giao hàng được tối ưu hơn 20-30 phút.",
      date: "12/11/2025",
      time: "11:00",
      isRead: true,
      actionUrl: "/faq",
      statusBadge: "system"
    },
    {
      id: "5",
      icon: Bell,
      category: "Thông báo",
      title: "Định kỳ bảo trì hệ thống",
      message: "SSE sẽ tiến hành bảo trì hệ thống từ 23:00 - 02:00 hôm nay. Một số tính năng có thể tạm thời bị gián đoạn.",
      date: "10/11/2025",
      time: "22:00",
      isRead: true,
      actionUrl: "#",
      statusBadge: "maintenance"
    },
    {
      id: "6",
      icon: CreditCard,
      category: "Thanh toán",
      title: "Thanh toán thành công đơn hàng SSE12A3",
      message: "Thanh toán đơn hàng SSE12A3 bằng phương thức chuyển khoản ngân hàng đã được xử lý thành công.",
      date: "08/11/2025",
      time: "16:30",
      isRead: true,
      actionUrl: "/orders",
      statusBadge: "payment"
    }
  ];

  const getStatusBadgeStyle = (status) => {
    const styles = {
      success: "bg-green-100 text-green-800",
      promo: "bg-purple-100 text-purple-800",
      info: "bg-blue-100 text-blue-800",
      system: "bg-indigo-100 text-indigo-800",
      maintenance: "bg-amber-100 text-amber-800",
      payment: "bg-cyan-100 text-cyan-800"
    };
    return styles[status] || "bg-slate-100 text-slate-800";
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold text-[#1f2050]">Lịch sử thông báo</h2>
        <button type="button" className="text-sm font-semibold text-[#5146ff] hover:text-[#4137d8] transition whitespace-nowrap w-full sm:w-auto text-center sm:text-left">
          Đánh dấu tất cả đã đọc
        </button>
      </div>

      <div className="space-y-3 sm:space-y-4 max-h-[600px] overflow-y-auto">
        {notificationData.map((notification) => {
          const NotificationIcon = notification.icon;
          return (
            <Link
              key={notification.id}
              href={notification.actionUrl}
              className={clsx(
                "block rounded-lg sm:rounded-xl border bg-white p-3 sm:p-4 shadow-sm transition hover:shadow-md",
                !notification.isRead
                  ? "border-blue-200 bg-blue-50/30"
                  : "border-slate-200 hover:border-slate-300"
              )}
            >
              <div className="flex gap-3 sm:gap-4">
                <div className={clsx(
                  "flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full flex-shrink-0",
                  getStatusBadgeStyle(notification.statusBadge)
                )}>
                  <NotificationIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>

                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                    <div className="space-y-1 min-w-0">
                      <div className={clsx(
                        "text-xs sm:text-sm font-semibold leading-snug",
                        !notification.isRead ? "text-[#1f2050]" : "text-slate-800"
                      )}>
                        [{notification.category}] {notification.title}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2 sm:line-clamp-none">
                        {notification.message}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs text-slate-400 whitespace-nowrap">
                        {notification.date} • {notification.time}
                      </span>
                      {!notification.isRead && (
                        <span className="inline-block h-2 w-2 rounded-full bg-blue-500 flex-shrink-0"></span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-slate-500 sm:text-xs">
                    <span className="font-medium">•</span>
                    <span className="truncate">Click để xem chi tiết</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="text-center pt-4">
        <button type="button" className="px-4 py-2 text-sm font-semibold text-[#5146ff] hover:text-[#4137d8] transition whitespace-nowrap">
          Xem thêm thông báo cũ hơn
        </button>
      </div>
    </div>
  );
};
