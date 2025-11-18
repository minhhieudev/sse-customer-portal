"use client";

import clsx from "clsx";
import { ArrowRight, Lock, Mail, Phone, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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

const SubmitButton = ({ children }) => (
  <button
    type="submit"
    className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#5146ff] px-5 py-3 text-base font-semibold text-white shadow-lg shadow-[#5146ff]/30 transition-transform duration-200 hover:scale-105"
  >
    <span>{children}</span>
    <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
  </button>
);

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");

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
        <TabButton active={activeTab === "login"} onClick={() => setActiveTab("login")}>
          Đăng nhập
        </TabButton>
        <TabButton active={activeTab === "register"} onClick={() => setActiveTab("register")}>
          Đăng ký
        </TabButton>
      </div>

      {activeTab === "login" ? <LoginForm /> : <RegisterForm />}

      <div className="mt-6 text-center text-sm text-slate-500">
        {activeTab === "login" ? (
          <p>
            Chưa có tài khoản?{" "}
            <button onClick={() => setActiveTab("register")} className="font-semibold text-[#5146ff] hover:underline">
              Đăng ký ngay
            </button>
          </p>
        ) : (
          <p>
            Đã có tài khoản?{" "}
            <button onClick={() => setActiveTab("login")} className="font-semibold text-[#5146ff] hover:underline">
              Đăng nhập
            </button>
          </p>
        )}
      </div>
    </div>
  );
}

import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    const mockUser = {
      name: "Khách hàng",
      email: "customer@sse.com",
      avatar: "/profile.png",
    };
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(mockUser));
      router.push("/");
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleLogin}>
      <FormInput icon={Mail} type="email" placeholder="Email" required />
      <FormInput icon={Lock} type="password" placeholder="Mật khẩu" required />
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-slate-600">
          <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-[#5146ff] focus:ring-[#5146ff]/50" />
          Ghi nhớ tôi
        </label>
        <Link href="#" className="font-medium text-[#5146ff] hover:underline">
          Quên mật khẩu?
        </Link>
      </div>
      <SubmitButton>Đăng nhập</SubmitButton>
      <div className="my-6 flex items-center">
        <div className="flex-grow border-t border-slate-200"></div>
        <span className="mx-4 flex-shrink text-sm text-slate-400">Hoặc tiếp tục với</span>
        <div className="flex-grow border-t border-slate-200"></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
          <SocialButton icon="/logo-login/google.png" label="Google" />
          <SocialButton icon="/logo-login/facebook.png" label="Facebook" />
      </div>
    </form>
  );
};

const RegisterForm = () => (
  <form className="space-y-5">
    <FormInput icon={User} type="text" placeholder="Họ và tên" required />
    <FormInput icon={Mail} type="email" placeholder="Email" required />
    <FormInput icon={Phone} type="tel" placeholder="Số điện thoại" required />
    <FormInput icon={Lock} type="password" placeholder="Mật khẩu" required />
    <SubmitButton>Đăng ký</SubmitButton>
    <p className="pt-4 text-center text-xs text-slate-400">
      Bằng việc đăng ký, bạn đồng ý với{" "}
      <Link href="/terms" className="font-medium text-slate-500 hover:underline">
        Điều khoản Dịch vụ
      </Link>{" "}
      và{" "}
      <Link href="/privacy" className="font-medium text-slate-500 hover:underline">
        Chính sách Bảo mật
      </Link>
      .
    </p>
  </form>
);
