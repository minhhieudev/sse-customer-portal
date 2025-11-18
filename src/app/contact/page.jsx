"use client";

import Header from "@/components/layout/Header";
import { PhoneCall, Mail, MapPin, Clock4, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EAF2FB] via-white to-[#FDF7EC] text-slate-900">
      <Header />
      <main className="px-4 py-14 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-5xl rounded-3xl bg-white/95 p-8 shadow-xl shadow-[#004B9A]/10 ring-1 ring-slate-100">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#004B9A]">Liên hệ</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Kết nối với Saigon Speed</h1>
          <p className="mt-3 text-lg text-slate-600">
            Để lại thông tin, chúng tôi sẽ phản hồi trong vòng 15 phút. Hoặc gọi ngay để được tư vấn trực tiếp.
          </p>
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
            <aside className="space-y-4 rounded-2xl bg-slate-50/80 p-6 shadow-inner">
              <ContactInfo />
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}

function ContactForm() {
  return (
    <form className="grid gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <InputField label="Họ tên" placeholder="Nguyễn Văn A" />
        <InputField label="Email" placeholder="you@email.com" type="email" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <InputField label="Số điện thoại" placeholder="0889 741 931" />
        <InputField label="Công ty/Đơn vị" placeholder="Tên công ty" />
      </div>
      <InputField label="Nhu cầu" placeholder="Mô tả tuyến đường, loại hàng hóa, thời gian dự kiến..." multiline />
      <button
        type="button"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F4A300] px-6 py-3 text-base font-semibold text-[#0d2541] shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
      >
        Gửi thông tin <Send className="h-4 w-4" />
      </button>
    </form>
  );
}

function InputField({ label, placeholder, type = "text", multiline = false }) {
  return (
    <label className="block text-sm font-semibold text-slate-700">
      {label}
      {multiline ? (
        <textarea
          rows={4}
          placeholder={placeholder}
          className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none ring-2 ring-transparent transition focus:bg-white focus:ring-[#004B9A]/30"
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none ring-2 ring-transparent transition focus:bg-white focus:ring-[#004B9A]/30"
        />
      )}
    </label>
  );
}

function ContactInfo() {
  const info = [
    {
      icon: PhoneCall,
      label: "Hotline",
      value: "0889 741 931",
      sub: "Hỗ trợ 24/7",
      href: "tel:0889741931",
    },
    {
      icon: Mail,
      label: "Email",
      value: "support@saigonspeed.vn",
      sub: "Phản hồi trong 15 phút",
      href: "mailto:support@saigonspeed.vn",
    },
    {
      icon: MapPin,
      label: "Văn phòng",
      value: "Số 124/11 Cộng Hoà, P. Tân Sơn Nhất, TP. Hồ Chí Minh",
      sub: "Xem bản đồ",
      href: "https://maps.google.com/?q=124/11+C%E1%BB%99ng+H%C3%B2a,+T%C3%A2n+B%C3%ACnh,+TP.HCM",
    },
    {
      icon: Clock4,
      label: "Giờ làm việc",
      value: "Thứ 2 - Thứ 7: 08:00 - 18:00",
      sub: "Hỗ trợ khẩn cấp 24/7",
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-slate-900">Thông tin liên hệ</h3>
      {info.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="flex gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#004B9A]/10 text-[#004B9A]">
            <item.icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{item.label}</p>
            <p className="text-sm font-semibold text-slate-900">{item.value}</p>
            <p className="text-xs text-slate-500">{item.sub}</p>
          </div>
        </a>
      ))}
      <div className="rounded-2xl border border-dashed border-[#004B9A]/30 bg-[#004B9A]/5 p-4 text-sm text-slate-700">
        Để được tư vấn nhanh nhất, bạn có thể gọi trực tiếp hoặc nhắn Zalo/SMS đến <span className="font-semibold text-[#004B9A]">0889 741 931</span>.
      </div>
    </div>
  );
}
