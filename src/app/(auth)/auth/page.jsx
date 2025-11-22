"use client";

import { useToast } from "@/hooks/useToast";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/stores/useAuthStore";
import clsx from "clsx";
import { ArrowRight, Loader2, Lock, Mail, Phone, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [prefillUsername, setPrefillUsername] = useState("");

  return (
    <div className="w-full max-w-sm">
      <div className="mb-8 flex justify-center">
        <Image
          src="/logo-app.png"
          alt="SSE Portal"
          width={180}
          height={180}
          priority
          className="object-contain"
        />
      </div>

      <div className="mb-6 flex rounded-xl bg-slate-100 p-1">
        <TabButton
          active={activeTab === "login"}
          onClick={() => setActiveTab("login")}
        >
          Đăng nhập
        </TabButton>
        <TabButton
          active={activeTab === "register"}
          onClick={() => setActiveTab("register")}
        >
          Đăng ký
        </TabButton>
      </div>

      {activeTab === "login" ? (
        <LoginForm prefillUsername={prefillUsername} />
      ) : (
        <RegisterForm
          onSwitchToLogin={(username) => {
            setPrefillUsername(username ?? "");
            setActiveTab("login");
          }}
        />
      )}

      <div className="mt-6 text-center text-sm text-slate-500">
        {activeTab === "login" ? (
          <p>
            Chưa có tài khoản?{" "}
            <button
              onClick={() => setActiveTab("register")}
              className="font-semibold text-[#5146ff] hover:underline"
            >
              Đăng ký ngay
            </button>
          </p>
        ) : (
          <p>
            Đã có tài khoản?{" "}
            <button
              onClick={() => setActiveTab("login")}
              className="font-semibold text-[#5146ff] hover:underline"
            >
              Đăng nhập
            </button>
          </p>
        )}
      </div>
    </div>
  );
}

const LoginForm = ({ prefillUsername }) => {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    username: prefillUsername ?? "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (prefillUsername) {
      setFormData((prev) => ({ ...prev, username: prefillUsername }));
    }
  }, [prefillUsername]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await authService.login(formData);

      // Fetch the actual user profile to get email and other data
      try {
        const userProfile = await authService.getCurrentUser(
          response?.access_token
        );
        const userData = {
          name: userProfile?.username || formData.username,
          username: userProfile?.username || formData.username,
          email: userProfile?.email || "",
          avatar: "/profile.png",
        };
        login(userData, response?.access_token);
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        // Fallback if profile fetch fails
        const userProfile = {
          name: formData.username,
          username: formData.username,
          email: "",
          avatar: "/profile.png",
        };
        login(userProfile, response?.access_token);
      }

      showToast("LOGIN_SUCCESS");
      router.push("/");
    } catch (error) {
      showToast({
        title: "Đăng nhập thất bại",
        description:
          error?.message ?? "Vui lòng kiểm tra lại tài khoản hoặc mật khẩu.",
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleLogin}>
      <FormInput
        icon={User}
        name="username"
        type="text"
        placeholder="Tên người dùng"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <FormInput
        icon={Lock}
        name="password"
        type="password"
        placeholder="Mật khẩu"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-slate-600">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-slate-300 text-[#5146ff] focus:ring-[#5146ff]/50"
          />
          Ghi nhớ tôi
        </label>
        <Link href="#" className="font-medium text-[#5146ff] hover:underline">
          Quên mật khẩu ?
        </Link>
      </div>
      <SubmitButton loading={isSubmitting}>Đăng nhập</SubmitButton>
      <div className="my-6 flex items-center">
        <div className="flex-grow border-t border-slate-200" />
        <span className="mx-4 flex-shrink text-sm text-slate-400">
          Hoặc tiếp tục với
        </span>
        <div className="flex-grow border-t border-slate-200" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <SocialButton icon="/logo-login/google.png" label="Google" />
        <SocialButton icon="/logo-login/facebook.png" label="Facebook" />
      </div>
    </form>
  );
};

const RegisterForm = ({ onSwitchToLogin }) => {
  const router = useRouter();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = { ...formData, role: "customer" };
      await authService.register(payload);
      showToast({
        title: "Đăng ký thành công",
        description: "Bạn có thể đăng nhập với tài khoản vừa tạo.",
        variant: "success",
      });
      onSwitchToLogin?.(formData.username);
      router.prefetch("/");
    } catch (error) {
      showToast({
        title: "Đăng ký thất bại",
        description:
          error?.message ?? "Vui lòng kiểm tra lại thông tin và thử lại.",
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleRegister}>
      <FormInput
        icon={User}
        name="full_name"
        type="text"
        placeholder="Họ và tên"
        value={formData.full_name}
        onChange={handleChange}
        required
      />
      <FormInput
        icon={User}
        name="username"
        type="text"
        placeholder="Tên người dùng"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <FormInput
        icon={Mail}
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <FormInput
        icon={Phone}
        name="phone"
        type="tel"
        placeholder="Số điện thoại"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <FormInput
        icon={Lock}
        name="password"
        type="password"
        placeholder="Mật khẩu"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <SubmitButton loading={isSubmitting}>Đăng ký</SubmitButton>
      <p className="pt-4 text-center text-xs text-slate-400">
        Bằng việc đăng ký, bạn đồng ý với{" "}
        <Link
          href="/terms"
          className="font-medium text-slate-500 hover:underline"
        >
          Điều khoản dịch vụ
        </Link>{" "}
        và{" "}
        <Link
          href="/privacy"
          className="font-medium text-slate-500 hover:underline"
        >
          Chính sách bảo mật
        </Link>
        .
      </p>
    </form>
  );
};

const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={clsx(
      "w-1/2 rounded-md py-2.5 text-sm font-medium leading-5 transition-colors duration-200",
      active
        ? "bg-white text-[#5146ff] shadow-md"
        : "text-slate-500 hover:bg-slate-100"
    )}
  >
    {children}
  </button>
);

const FormInput = ({ icon: Icon, ...props }) => (
  <div className="relative">
    <Icon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
    <input
      {...props}
      className="w-full rounded-full border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-slate-800 transition-colors duration-200 placeholder:text-slate-400 focus:border-[#5146ff]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5146ff]/20"
    />
  </div>
);

const SocialButton = ({ icon, label }) => (
  <button className="flex h-14 w-full items-center justify-center gap-3 rounded-full border border-slate-200 bg-white text-slate-700 transition-colors duration-200 hover:bg-slate-50">
    <Image src={icon} alt={label} width={32} height={32} />
    <span className="text-sm font-medium">{label}</span>
  </button>
);

const SubmitButton = ({ children, loading }) => (
  <button
    type="submit"
    disabled={loading}
    className={clsx(
      "group flex w-full items-center justify-center gap-2 rounded-full bg-[#5146ff] px-5 py-3 text-base font-semibold text-white shadow-lg shadow-[#5146ff]/30 transition-transform duration-200",
      loading ? "opacity-80 cursor-not-allowed" : "hover:scale-105"
    )}
  >
    {loading ? (
      <Loader2 className="h-5 w-5 animate-spin" />
    ) : (
      <span>{children}</span>
    )}
    {!loading && (
      <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
    )}
  </button>
);
