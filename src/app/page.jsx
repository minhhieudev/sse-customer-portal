"use client";

import Header from "@/components/layout/Header";
import { useAuthStore } from "@/stores/useAuthStore";
import {
  ArrowRight,
  BadgeCheck,
  Clock4,
  Globe2,
  MapPin,
  PhoneCall,
  Plane,
  Send,
  ShieldCheck,
  Ship,
  Truck
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Data for components
const TOP_SERVICES = [
  { id: "international", title: "Vận chuyển quốc tế", description: "Door-to-door tới hơn 150 quốc gia với đối tác tin cậy.", icon: Globe2 },
  { id: "air-freight", title: "Vận chuyển hàng không", description: "Ưu tiên tốc độ, đảm bảo lịch bay và chứng từ đầy đủ.", icon: Plane },
  { id: "ocean-freight", title: "Vận tải biển", description: "Kết nối tuyến biển ổn định, tối ưu thời gian và chi phí.", icon: Ship },
  { id: "domestic", title: "Vận tải nội địa", description: "Phủ sóng 63 tỉnh thành với đội xe chuyên dụng và theo dõi realtime.", icon: Truck },
];

const WHY_CHOOSE_US = [
  {
    title: "An Tâm Vận Hành",
    description: "Giám sát hành trình 2 chiều, cảnh báo rủi ro sớm và chủ động xử lý 24/7.",
    icon: ShieldCheck,
  },
  {
    title: "Tốc Độ Chuẩn Xác",
    description: "Quy trình chuẩn hóa giúp đảm bảo SLA giao nhận và báo cáo tiến độ minh bạch.",
    icon: Clock4,
  },
  {
    title: "Chi Phí Tối Ưu",
    description: "Tư vấn tuyến và phương án đóng gói phù hợp giúp bạn tiết kiệm ngân sách logistics.",
    icon: BadgeCheck,
  },
];

// Main Page Component
export default function HomePage() {
  const isLoggedIn = useAuthStore((state) => state.isAuthenticated);
  const primaryButtonHref = isLoggedIn ? "/orders?create=true" : "/auth";
  const primaryButtonLabel = isLoggedIn ? "Gửi đơn hàng" : "Tạo yêu cầu";

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Header />

      <main className="relative">
        {/* --- Hero Section (Old version, as requested) --- */}
        <section className="relative overflow-hidden bg-gradient-to-r from-[#004B9A] to-[#0c5aa2] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="absolute inset-0 opacity-20">
            <Image src="/banner.png" alt="Saigon Speed" fill sizes="100vw" className="object-cover" priority />
          </div>
          <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-10 text-center">
            <div className="max-w-3xl space-y-6 text-white">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase text-white/80">
                Saigon Speed Logistics
              </p>
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                CÔNG TY TNHH CHUYÊN PHÁT NHANH <span className="text-[#F4A300]">SÀI GÒN SPEED</span>
              </h1>
              <p className="text-lg text-white/80 sm:text-xl">
                Giải pháp logistics trọn gói từ nội địa đến quốc tế, tối ưu cho doanh nghiệp cần tốc độ, minh bạch và đáng tin cậy.
              </p>
              <div className="flex flex-col gap-3 text-sm text-white/80 sm:flex-row sm:items-center sm:justify-center sm:gap-6">
                <span className="flex items-center gap-2">
                  <PhoneCall className="h-4 w-4 text-[#F4A300]" /> Hotline: 0889 741 931
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#47B649]" /> Số 124/11 Cống Hoà, Phường Tân Sơn Nhất, TP. Hồ Chí Minh
                </span>
              </div>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link
                  href={primaryButtonHref}
                  className="group inline-flex items-center gap-3 rounded-full bg-[#F4A300] px-8 py-4 text-lg font-bold text-[#0d2541] shadow-xl shadow-[#F4A300]/30 transition hover:-translate-y-0.5 hover:shadow-2xl"
                >
                  <span>{primaryButtonLabel}</span>
                  <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/tracking"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-white/50 bg-white/10 px-6 py-3 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  Tra cứu vận đơn
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-3 pt-4">
                {["Tốc độ & minh bạch", "Theo dõi hành trình realtime", "Hậu mãi & chăm sóc 24/7"].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm font-medium text-white">
                    <BadgeCheck className="h-5 w-5 text-brand-green flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- Services Section (Improved version) --- */}
        <section className="py-20 bg-slate-50">
          <div className="page-container">
            <div className="text-center max-w-2xl mx-auto">
              <p className="font-semibold text-brand-blue uppercase">Dịch Vụ Của Chúng Tôi</p>
              <h2 className="mt-3 text-4xl font-bold text-slate-900 sm:text-5xl">Bạn cần gì, chúng tôi có ngay</h2>
              <p className="mt-4 text-lg text-slate-600">
                Lựa chọn dịch vụ phù hợp cho từng lộ trình, từ hàng nhẹ đến lô hàng dự án phức tạp.
              </p>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {TOP_SERVICES.map((service) => (
                <ServiceCard key={service.id} {...service} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link href="/services" className="font-semibold text-brand-blue inline-flex items-center gap-2">
                Xem tất cả dịch vụ <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* --- Why Choose Us Section (Improved version) --- */}
        <section className="bg-brand-blue text-white py-20">
          <div className="page-container grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <p className="font-semibold text-brand-orange uppercase">Tại Sao Chọn Saigon Speed?</p>
              <h2 className="text-4xl font-bold sm:text-5xl leading-tight">
                Đối tác tin cậy cho sự phát triển của bạn
              </h2>
              <p className="text-lg text-blue-100">
                Saigon Speed không chỉ giao nhận, chúng tôi tư vấn giải pháp, tối ưu tuyến và quy trình để bạn yên tâm tập trung vào kinh doanh cốt lõi.
              </p>
            </div>
            <div className="space-y-8">
              {WHY_CHOOSE_US.map((item) => (
                <ValueCard key={item.title} {...item} />
              ))}
            </div>
          </div>
        </section>

        {/* --- CTA Section (Improved version) --- */}
        <section className="py-20 bg-white">
          <div className="page-container text-center">
            <h2 className="text-4xl font-bold text-slate-900">Sẵn sàng để bắt đầu?</h2>
            <p className="mt-4 text-lg text-slate-600 max-w-xl mx-auto">
              Nhận báo giá, tạo đơn hàng, hoặc liên hệ với chuyên gia của chúng tôi để được tư vấn ngay hôm nay.
            </p>
            <div className="mt-8">
              <Link
                href={primaryButtonHref}
                className="group inline-flex items-center gap-3 rounded-full bg-brand-orange px-8 py-4 text-lg font-bold text-white shadow-lg shadow-brand-orange/30 transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                <span>Tạo Yêu Cầu Vận Chuyển</span>
                <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// Helper Components (Improved versions)
function ServiceCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-lg font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </div>
  );
}

function ValueCard({ icon: Icon, title, description }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-brand-orange">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="mt-1 text-blue-200">{description}</p>
      </div>
    </div>
  );
}