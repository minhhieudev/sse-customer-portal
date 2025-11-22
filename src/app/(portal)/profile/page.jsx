"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bell,
  CreditCard,
  Edit,
  Eye,
  EyeOff,
  LogIn,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  Package,
  Phone,
  Plus,
  RefreshCw,
  Save,
  Shield,
  Ticket,
  Trash2,
  Truck,
  User
} from "lucide-react";
import clsx from "clsx";
import { useAuthStore } from "@/stores/useAuthStore";
import { useToast } from "@/hooks/useToast";
import { authService } from "@/services/auth.service";

const TABS = [
  { name: "Thông tin chung", icon: User },
  { name: "Sổ địa chỉ", icon: MapPin },
  { name: "Bảo mật", icon: Shield },
  { name: "Cài đặt thông báo", icon: Bell },
  { name: "Thông báo", icon: MessageSquare },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("Thông tin chung");
  const [profileData, setProfileData] = useState({ full_name: "", username: "", email: "", phone: "" });
  const [initialData, setInitialData] = useState(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const isLoggedIn = useAuthStore((state) => state.isAuthenticated);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const token = useAuthStore((state) => state.token);
  const { showToast } = useToast();

  useEffect(() => {
    if (!isLoggedIn) return;
    let cancelled = false;
    const fetchProfile = async () => {
      setIsLoadingProfile(true);
      try {
        const data = await authService.getCurrentUser(token);
        if (cancelled) return;
        const mapped = {
          full_name: data?.full_name ?? "",
          username: data?.username ?? "",
          email: data?.email ?? "",
          phone: data?.phone ?? "",
        };
        setProfileData(mapped);
        setInitialData(mapped);
      } catch (error) {
        if (!cancelled) {
          showToast({
            title: "Không tải được hồ sơ",
            description: error?.message ?? "Vui lòng thử lại.",
            variant: "error",
          });
        }
      } finally {
        if (!cancelled) setIsLoadingProfile(false);
      }
    };
    fetchProfile();
    return () => {
      cancelled = true;
    };
  }, [isLoggedIn, token, showToast]);

  const handleChange = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    if (initialData) setProfileData(initialData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await authService.updateCurrentUser(
        {
          full_name: profileData.full_name,
          email: profileData.email,
          phone: profileData.phone,
        },
        token
      );
      setInitialData(profileData);
      showToast({ title: "Đã lưu hồ sơ", description: "Thông tin cá nhân đã được cập nhật.", variant: "success" });
    } catch (error) {
      showToast({
        title: "Lưu không thành công",
        description: error?.message ?? "Vui lòng thử lại.",
        variant: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const isPristine = useMemo(() => {
    if (!initialData) return true;
    return ["full_name", "email", "phone", "username"].every((key) => initialData[key] === profileData[key]);
  }, [initialData, profileData]);

  const renderContent = useMemo(() => {
    if (activeTab === "Thông tin chung") {
      return (
        <GeneralInfo
          data={profileData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onReset={handleReset}
          isLoading={isLoadingProfile}
          isSaving={isSaving}
          isPristine={isPristine}
        />
      );
    }
    if (activeTab === "Sổ địa chỉ") return <AddressBook />;
    if (activeTab === "Bảo mật")
      return <SecuritySettings token={token} showToast={showToast} />;
    if (activeTab === "Thông báo") return <Notifications />;
    return <ComingSoon tab={activeTab} />;
  }, [activeTab, isLoadingProfile, isPristine, isSaving, profileData, showToast, token, handleReset, handleSubmit]);

  if (!hasHydrated) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-blue border-t-transparent"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
          <LogIn className="h-10 w-10 text-slate-400" />
        </div>
        <h2 className="text-2xl font-bold text-brand-blue">Vui lòng đăng nhập</h2>
        <p className="mt-2 text-slate-500">Bạn cần đăng nhập để xem và quản lý hồ sơ.</p>
        <Link
          href="/auth"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-orange px-6 py-3 text-lg font-semibold text-white shadow-md shadow-brand-blue/30 transition hover:-translate-y-[1px] hover:brightness-110"
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
        <h1 className="text-3xl font-bold text-brand-blue">Hồ sơ của bạn</h1>
        <p className="mt-1 text-slate-600">Quản lý thông tin cá nhân, địa chỉ và cài đặt bảo mật.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-6 xl:grid-cols-4">
        <aside className="order-1 md:order-1 md:col-span-1 xl:col-span-1">
          <nav className="sticky top-20 z-10 space-y-4">
            <div className="rounded-2xl border border-brand-blue/10 bg-white/95 p-2 shadow-sm backdrop-blur md:bg-white md:p-4">
              <div className="flex gap-2 overflow-x-auto md:flex-col md:gap-1">
                {TABS.map((tab) => (
                  <button
                    key={tab.name}
                    onClick={() => setActiveTab(tab.name)}
                    className={clsx(
                      "flex flex-shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition md:flex-1 md:justify-start",
                      activeTab === tab.name
                        ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/20"
                        : "text-slate-600 hover:bg-brand-blue/5 hover:text-brand-blue"
                    )}
                  >
                    <tab.icon className="h-4 w-4 flex-shrink-0 md:h-5 md:w-5" />
                    <span className="truncate">{tab.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </aside>

        <main className="order-2 md:order-2 md:col-span-3 xl:col-span-3">
          <div className="rounded-2xl border border-brand-blue/10 bg-white p-4 shadow-sm sm:p-6">{renderContent}</div>
        </main>
      </div>
    </div>
  );
}

const FormRow = ({ label, children }) => (
  <div className="space-y-1">
    <label className="block text-sm font-semibold text-slate-700">{label}</label>
    {children}
  </div>
);

const FormInput = ({ disabled, readOnly, ...props }) => (
  <input
    {...props}
    readOnly={readOnly}
    disabled={disabled}
    className={clsx(
      "mt-1 w-full rounded-xl border px-4 py-2.5 text-slate-800 transition duration-200 placeholder:text-slate-400 focus:outline-none focus:ring-2",
      disabled || readOnly
        ? "border-slate-200 bg-slate-50 text-slate-500"
        : "border-slate-200 bg-white focus:border-brand-blue focus:ring-brand-blue/20",
      props.className
    )}
  />
);

const GeneralInfo = ({ data, onChange, onSubmit, onReset, isLoading, isSaving, isPristine }) => {
  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <div className="grid gap-5 lg:grid-cols-[280px,1fr]">
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-brand-blue/10 bg-white p-4 text-center shadow-sm">
          <div className="relative h-28 w-28 sm:h-32 sm:w-32">
            <Image src="/profile.png" alt="Avatar mặc định" fill className="rounded-full bg-slate-100 object-cover" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-brand-blue">{data.username}</h2>
            <p className="text-sm text-slate-500">{data.email || "Chưa có email"}</p>
          </div>
          <p className="text-sm text-slate-600">
            Cập nhật thông tin cá nhân để đồng bộ trên mọi dịch vụ.
          </p>
          <div className="flex w-full flex-col gap-2">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-blue px-4 py-2 text-sm font-semibold text-white shadow-md shadow-brand-blue/20 transition hover:-translate-y-[1px] hover:brightness-110"
            >
              <Phone className="h-4 w-4" />
              Hotline: 0889 741 931
            </button>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-brand-orange/50 bg-brand-orange/10 px-4 py-2 text-sm font-semibold text-brand-orange transition hover:bg-brand-orange/20"
            >
              <Mail className="h-4 w-4" />
              support@saigonspeed.vn
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormRow label="Họ và tên">
              <FormInput
                type="text"
                value={data.full_name}
                onChange={(e) => onChange("full_name", e.target.value)}
                placeholder="Nhập họ và tên"
                disabled={isLoading}
              />
            </FormRow>
            <FormRow label="Username (không chỉnh sửa)">
              <FormInput type="text" value={data.username} readOnly disabled placeholder="Username" />
            </FormRow>
            <FormRow label="Email">
              <FormInput
                type="email"
                value={data.email}
                onChange={(e) => onChange("email", e.target.value)}
                placeholder="email@domain.com"
                disabled={isLoading}
              />
            </FormRow>
            <FormRow label="Số điện thoại">
              <FormInput
                type="tel"
                value={data.phone}
                onChange={(e) => onChange("phone", e.target.value)}
                placeholder="09xx xxx xxx"
                disabled={isLoading}
              />
            </FormRow>
          </div>
          {isLoading && <p className="text-sm text-slate-500">Đang tải thông tin...</p>}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onReset}
          disabled={isSaving || isLoading || isPristine}
          className={clsx(
            "flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition",
            isSaving || isLoading || isPristine
              ? "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400"
              : "border-brand-blue/30 bg-white text-brand-blue hover:bg-brand-blue/5"
          )}
        >
          <RefreshCw className="h-4 w-4" />
          Khôi phục
        </button>
        <button
          type="submit"
          disabled={isSaving || isLoading || isPristine}
          className={clsx(
            "flex items-center gap-2 rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white shadow-md shadow-brand-blue/20 transition",
            isSaving || isLoading || isPristine
              ? "cursor-not-allowed opacity-70"
              : "hover:-translate-y-[1px] hover:brightness-110"
          )}
        >
          <Save className="h-4 w-4" />
          {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
        </button>
      </div>
    </form>
  );
};

const AddressBook = () => (
  <div className="space-y-5">
    <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-xl font-bold text-brand-blue">Sổ địa chỉ</h2>
      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-blue px-5 py-3 text-sm font-semibold text-white shadow-md shadow-brand-blue/30 transition hover:-translate-y-[1px] hover:brightness-110 sm:w-auto"
      >
        <Plus className="h-4 w-4 flex-shrink-0" />
        <span>Thêm địa chỉ</span>
      </button>
    </div>

    <div className="space-y-3">
      {[
        {
          label: "Văn phòng công ty",
          address: "227 Nguyễn Văn Cừ, Phường 4, Quận 5, TP.HCM",
          isDefault: true,
        },
        {
          label: "Kho hàng",
          address: "Lô A1, KCN Sóng Thần, Dĩ An, Bình Dương",
          isDefault: false,
        },
      ].map((item) => (
        <div key={item.label} className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <p className="font-semibold text-brand-blue">{item.label}</p>
                <p className="text-sm text-slate-600">{item.address}</p>
              </div>
              {item.isDefault && (
                <span className="w-fit rounded-full bg-brand-green/15 px-3 py-1 text-xs font-semibold text-brand-green">Mặc định</span>
              )}
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
              <button className="flex items-center justify-center gap-2 rounded-full border border-brand-blue/30 bg-white px-4 py-2 text-xs font-semibold text-brand-blue transition hover:bg-brand-blue/5">
                <Edit className="h-4 w-4" />
                Sửa
              </button>
              <button className="flex items-center justify-center gap-2 rounded-full border border-red-200 bg-white px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50">
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

const SecuritySettings = ({ token, showToast }) => {
  const [form, setForm] = useState({ current_password: "", new_password: "", confirm_password: "" });
  const [showPassword, setShowPassword] = useState({
    current: false,
    next: false,
    confirm: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const toggleVisibility = (key) => setShowPassword((prev) => ({ ...prev, [key]: !prev[key] }));

  // Validation Logic
  const isValid = useMemo(() => {
    const { current_password, new_password, confirm_password } = form;
    // 1. Tất cả các trường phải có dữ liệu
    if (!current_password || !new_password || !confirm_password) return false;
    // 2. Mật khẩu mới phải đủ độ dài (ví dụ: >= 6 ký tự)
    if (new_password.length < 6) return false;
    // 3. Mật khẩu mới và xác nhận phải khớp nhau
    if (new_password !== confirm_password) return false;
    // 4. Mật khẩu mới không được trùng mật khẩu cũ (tùy chọn, nhưng nên có)
    if (new_password === current_password) return false;

    return true;
  }, [form]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.new_password !== form.confirm_password) {
      showToast({ title: "Mật khẩu không khớp", description: "Vui lòng kiểm tra lại.", variant: "error" });
      return;
    }

    if (form.new_password.length < 6) {
      showToast({ title: "Mật khẩu quá ngắn", description: "Mật khẩu mới phải có ít nhất 6 ký tự.", variant: "error" });
      return;
    }

    setIsSubmitting(true);
    try {
      await authService.changePassword(
        { current_password: form.current_password, new_password: form.new_password },
        token
      );
      showToast({ title: "Đổi mật khẩu thành công", description: "Bạn có thể đăng nhập bằng mật khẩu mới.", variant: "success" });
      setForm({ current_password: "", new_password: "", confirm_password: "" });
    } catch (error) {
      showToast({
        title: "Không đổi được mật khẩu",
        description: error?.message ?? "Vui lòng thử lại.",
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-6 sm:w-[50%] mx-auto" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold text-brand-blue">Bảo mật</h2>
      <div className="flex flex-col gap-4 ">
        <FormRow label="Mật khẩu hiện tại">
          <PasswordInput
            value={form.current_password}
            onChange={(e) => handleChange("current_password", e.target.value)}
            visible={showPassword.current}
            onToggle={() => toggleVisibility("current")}
          />
        </FormRow>
        <FormRow label="Mật khẩu mới">
          <PasswordInput
            value={form.new_password}
            onChange={(e) => handleChange("new_password", e.target.value)}
            visible={showPassword.next}
            onToggle={() => toggleVisibility("next")}
            placeholder="Tối thiểu 6 ký tự"
          />
        </FormRow>
        <FormRow label="Xác nhận mật khẩu mới">
          <PasswordInput
            value={form.confirm_password}
            onChange={(e) => handleChange("confirm_password", e.target.value)}
            visible={showPassword.confirm}
            onToggle={() => toggleVisibility("confirm")}
            isError={form.confirm_password && form.new_password !== form.confirm_password}
          />
          {form.confirm_password && form.new_password !== form.confirm_password && (
            <p className="text-xs text-red-500 mt-1">Mật khẩu xác nhận không khớp</p>
          )}
        </FormRow>
      </div>
      <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:gap-3">
        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          className={clsx(
            "flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-lg transition",
            isSubmitting || !isValid
              ? "cursor-not-allowed bg-slate-300 text-slate-500 shadow-none"
              : "bg-brand-blue shadow-brand-blue/30 hover:-translate-y-[1px] hover:brightness-110"
          )}
        >
          <Lock className="h-5 w-5" />
          <span>{isSubmitting ? "Đang đổi..." : "Đổi mật khẩu"}</span>
        </button>
        <button
          type="button"
          onClick={() => setForm({ current_password: "", new_password: "", confirm_password: "" })}
          className="flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:border-slate-300 sm:w-auto"
        >
          <RefreshCw className="h-5 w-5" />
          Làm mới
        </button>
      </div>
    </form>
  );
};

const PasswordInput = ({ value, onChange, visible, onToggle, placeholder = "••••••••", isError }) => (
  <div className="relative">
    <FormInput
      type={visible ? "text" : "password"}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={clsx(isError && "border-red-500 focus:border-red-500 focus:ring-red-200")}
    />
    <button
      type="button"
      onClick={onToggle}
      className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-brand-blue"
    >
      {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
    </button>
  </div>
);

const ComingSoon = ({ tab }) => (
  <div className="py-10 text-center">
    <h2 className="text-xl font-semibold text-brand-blue">Tính năng đang phát triển</h2>
    <p className="mt-2 text-slate-500">Nội dung cho mục “{tab}” sẽ sớm được cập nhật.</p>
  </div>
);

const Notifications = () => {
  const notificationData = [
    {
      id: "1",
      icon: Package,
      category: "Đơn hàng",
      title: "Đơn hàng SSE88C1 đã giao thành công!",
      message: "Đơn hàng của bạn đã được giao tới địa chỉ 227 Nguyễn Văn Cừ, Q5, TP.HCM. Cảm ơn bạn đã tin tưởng Saigon Speed!",
      date: "15/11/2025",
      time: "14:30",
      isRead: false,
      actionUrl: "/tracking?code=SSE88C1",
      statusBadge: "success",
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
      statusBadge: "promo",
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
      statusBadge: "info",
    },
    {
      id: "4",
      icon: Mail,
      category: "Hệ thống",
      title: "Cập nhật chính sách giao hàng",
      message: "Saigon Speed đã cập nhật chính sách giao hàng khu vực TP.HCM. Thời gian giao hàng được tối ưu hơn 20-30 phút.",
      date: "12/11/2025",
      time: "11:00",
      isRead: true,
      actionUrl: "/faq",
      statusBadge: "system",
    },
    {
      id: "5",
      icon: Bell,
      category: "Thông báo",
      title: "Định kỳ bảo trì hệ thống",
      message: "Saigon Speed sẽ tiến hành bảo trì hệ thống từ 23:00 - 02:00 hôm nay. Một số tính năng có thể tạm thời bị gián đoạn.",
      date: "10/11/2025",
      time: "22:00",
      isRead: true,
      actionUrl: "#",
      statusBadge: "maintenance",
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
      statusBadge: "payment",
    },
  ];

  const getStatusBadgeStyle = (status) => {
    const styles = {
      success: "bg-green-100 text-green-800",
      promo: "bg-purple-100 text-purple-800",
      info: "bg-blue-100 text-blue-800",
      system: "bg-indigo-100 text-indigo-800",
      maintenance: "bg-amber-100 text-amber-800",
      payment: "bg-cyan-100 text-cyan-800",
    };
    return styles[status] || "bg-slate-100 text-slate-800";
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold text-brand-blue">Lịch sử thông báo</h2>
        <button
          type="button"
          className="w-full text-center text-sm font-semibold text-brand-blue transition hover:text-brand-orange sm:w-auto sm:text-left"
        >
          Đánh dấu tất cả đã đọc
        </button>
      </div>

      <div className="max-h-[600px] space-y-3 overflow-y-auto sm:space-y-4">
        {notificationData.map((notification) => {
          const NotificationIcon = notification.icon;
          return (
            <Link
              key={notification.id}
              href={notification.actionUrl}
              className={clsx(
                "block rounded-lg border bg-white p-3 shadow-sm transition hover:shadow-md sm:rounded-xl sm:p-4",
                !notification.isRead ? "border-brand-blue/30 bg-brand-blue/5" : "border-slate-200 hover:border-slate-300"
              )}
            >
              <div className="flex gap-3 sm:gap-4">
                <div
                  className={clsx(
                    "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10",
                    getStatusBadgeStyle(notification.statusBadge)
                  )}
                >
                  <NotificationIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>

                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                    <div className="min-w-0 space-y-1">
                      <div
                        className={clsx(
                          "text-xs font-semibold leading-snug sm:text-sm",
                          !notification.isRead ? "text-brand-blue" : "text-slate-800"
                        )}
                      >
                        [{notification.category}] {notification.title}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed sm:text-sm">
                        {notification.message}
                      </p>
                    </div>

                    <div className="flex flex-shrink-0 items-center gap-2">
                      <span className="whitespace-nowrap text-xs text-slate-400">
                        {notification.date} • {notification.time}
                      </span>
                      {!notification.isRead && <span className="inline-block h-2 w-2 flex-shrink-0 rounded-full bg-brand-orange"></span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <span className="font-medium">→</span>
                    <span className="truncate">Click để xem chi tiết</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="pt-4 text-center">
        <button type="button" className="px-4 py-2 text-sm font-semibold text-brand-blue transition hover:text-brand-orange">
          Xem thêm thông báo cũ hơn
        </button>
      </div>
    </div>
  );
};
