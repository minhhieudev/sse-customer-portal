"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Send,
  Truck,
  ShieldCheck,
  Clock4,
  ArrowRight,
  Ship,
  Plane,
  Home,
  Globe2,
  FileCheck2,
  Rocket,
  Flag,
  PhoneCall,
  MapPin,
  BadgeCheck,
} from "lucide-react";
import Header from "@/components/layout/Header";

const SERVICES = [
  { id: "ocean-freight", title: "Vận tải biển", description: "Kết nối tuyến biển ổn định, tối ưu thời gian và chi phí.", icon: Ship },
  { id: "air-freight", title: "Vận chuyển hàng không", description: "Ưu tiên tốc độ, đảm bảo lịch bay và chứng từ đầy đủ.", icon: Plane },
  { id: "domestic", title: "Vận tải nội địa", description: "Phủ sóng 63 tỉnh thành với đội xe chuyên dụng và theo dõi realtime.", icon: Truck },
  { id: "international", title: "Vận chuyển quốc tế", description: "Door to port/door tới hơn 150 quốc gia với đối tác tin cậy.", icon: Globe2 },
  { id: "door-to-door", title: "Door to door", description: "Nhận - giao tận nơi, xử lý linh hoạt theo yêu cầu của doanh nghiệp.", icon: Home },
  { id: "border", title: "Hàng biên giới", description: "Tối ưu thủ tục, kiểm soát rủi ro cho hàng qua cửa khẩu.", icon: Flag },
  { id: "express", title: "Chuyển phát nhanh", description: "Dịch vụ hỏa tốc nhiều khung giờ, phù hợp tài liệu và hàng nhẹ.", icon: Rocket },
  { id: "customs", title: "Khai báo thuế hải quan", description: "Đội ngũ khai báo chuyên sâu, hạn chế phát sinh lưu kho/lưu bãi.", icon: FileCheck2 },
];

const VALUES = [
  {
    title: "An tâm vận hành",
    description: "Giám sát hành trình 2 chiều, cảnh báo rủi ro sớm và chủ động xử lý.",
    icon: ShieldCheck,
  },
  {
    title: "Tốc độ chuẩn",
    description: "Quy trình chuẩn hóa giúp đảm bảo SLA giao nhận và báo cáo tiến độ minh bạch.",
    icon: Clock4,
  },
  {
    title: "Chi phí tối ưu",
    description: "Đề xuất tuyến và phương án đóng gói giúp tiết kiệm ngân sách logistics.",
    icon: BadgeCheck,
  },
];

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
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

  const primaryButtonLabel = isLoggedIn ? "Gửi hàng ngay" : "Tạo yêu cầu";
  const primaryButtonHref = isLoggedIn ? "/orders" : "/auth";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EAF2FB] via-white to-[#FDF7EC] font-inter text-slate-900">
      <Header />

      <main className="relative">
        <section className="relative overflow-hidden bg-gradient-to-r from-[#004B9A]/90 via-[#0E74CE]/85 to-[#0E74CE]/75 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="absolute inset-0 opacity-35">
            <Image src="/banner.png" alt="Saigon Speed" fill sizes="100vw" className="object-cover" priority />
          </div>
          <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-10 lg:flex-row lg:items-center">
            <div className="max-w-3xl space-y-6 text-white">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                Saigon Speed Logistics
              </p>
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                CÔNG TY TNHH CHUYÊN PHÁT NHANH <span className="text-[#F4A300]">SÀI GÒN SPEED</span>
              </h1>
              <p className="text-lg text-white/80 sm:text-xl">
                Giải pháp logistics trọn gói từ nội địa đến quốc tế, tối ưu cho doanh nghiệp cần tốc độ, minh bạch và đáng hành lâu dài.
              </p>
              <div className="flex flex-col gap-3 text-sm text-white/80 sm:flex-row sm:items-center sm:gap-6">
                <span className="flex items-center gap-2">
                  <PhoneCall className="h-4 w-4 text-[#F4A300]" /> Hotline: 0889 741 931
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#47B649]" /> Số 124/11 Cống Hoà, Phường Tân Sơn Nhất, TP. Hồ Chí Minh
                </span>
              </div>
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
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
              <div className="grid gap-4 sm:grid-cols-3">
                {["Tốc độ & minh bạch", "Theo dõi hành trình realtime", "Hậu mãi & chăm sóc 24/7"].map((item) => (
                  <div key={item} className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-medium text-white">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#47B649] text-white">?</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative w-full max-w-xl self-center rounded-3xl bg-white px-6 py-8 shadow-2xl shadow-[#004B9A]/20">
              <div className="flex items-center justify-between text-sm font-semibold text-slate-600">
                <span className="text-[#004B9A]">Tổng quan hoạt động</span>
                <span className="rounded-full bg-[#47B649]/10 px-3 py-1 text-[#47B649]">Realtime</span>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 text-slate-800">
                <MetricCard label="Đơn giao hôm nay" value="+326" accent="bg-[#F4A300]/20 text-[#F4A300]" />
                <MetricCard label="Tỷ lệ đúng hẹn" value="98,4%" accent="bg-[#47B649]/20 text-[#47B649]" />
                <MetricCard label="Chuyến quốc tế" value="54" accent="bg-[#004B9A]/10 text-[#004B9A]" />
                <MetricCard label="Khách hàng hài lòng" value="4.9/5" accent="bg-slate-100 text-slate-700" />
              </div>
              <div className="mt-6 rounded-2xl bg-[#F7FAFF] p-4 text-sm text-slate-700">
                <p className="font-semibold text-[#004B9A]">Cam kết Saigon Speed</p>
                <ul className="mt-2 space-y-1 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#F4A300]"></span>
                    Đời vận hành và chăm sóc khách hàng tận chế, phản hồi trong 15 phút.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#47B649]"></span>
                    Chính sách đãi thưởng rõ ràng, minh bạch chi phí và phụ phí.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#004B9A]"></span>
                    Linh hoạt theo từng ngành hàng: thương mại điện tử, sản xuất, F&B.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#004B9A]">Giải pháp Saigon Speed</p>
                <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">Bạn cần gì, chúng tôi có ngay</h2>
                <p className="mt-3 text-lg text-slate-600">
                  Lựa chọn dịch vụ phù hợp cho từng lộ trình, từ nội địa đến quốc tế, từ hàng nhẹ để đến lô hàng dự án.
                </p>
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#004B9A] px-5 py-3 text-sm font-semibold text-[#004B9A] transition hover:bg-[#004B9A] hover:text-white"
              >
                Xem chi tiết dịch vụ
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-4 sm:grid-cols-2">
              {SERVICES.map((service) => (
                <div key={service.id} className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/60 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#004B9A] shadow-sm">
                    <service.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{service.title}</h3>
                  <p className="text-sm text-slate-600">{service.description}</p>
                  <Link
                    href={`/services#${service.id}`}
                    className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-[#004B9A] transition group-hover:gap-2"
                  >
                    Tìm hiểu thêm <ArrowRight className="h-4 w-4" />
                  </Link>
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#004B9A] via-[#F4A300] to-[#47B649] opacity-0 transition group-hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#004B9A] px-4 py-16 sm:px-6 lg:px-8 lg:py-20 text-white">
          <div className="mx-auto max-w-7xl grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">Giá trị cốt lõi</p>
              <h2 className="text-3xl font-bold sm:text-4xl">Đồng hành như một bộ phận logistics nội bộ</h2>
              <p className="text-lg text-white/80">
                Saigon Speed không chỉ giao nhận, chúng tôi tư vấn giải pháp, tối ưu tuyến và quy trình để bạn yên tâm tập trung vào kinh doanh.
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                {VALUES.map((value) => (
                  <div key={value.title} className="rounded-2xl bg-white/10 p-4">
                    <value.icon className="h-9 w-9 text-[#F4A300]" />
                    <h3 className="mt-3 text-lg font-semibold text-white">{value.title}</h3>
                    <p className="mt-2 text-sm text-white/80">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl bg-white p-8 text-slate-900 shadow-xl shadow-black/10">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#004B9A]">Thông tin doanh nghiệp</p>
              <h3 className="mt-3 text-2xl font-bold text-slate-900">Saigon Speed Logistics</h3>
              <ul className="mt-4 space-y-3 text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#F4A300]"></span>
                  CÔNG TY TNHH CHUYÊN PHÁT NHANH SÀI GÒN SPEED
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#47B649]"></span>
                  Địa chỉ: Số 124/11 Cống Hoà, Phường Tân Sơn Nhất, TP. Hồ Chí Minh
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#004B9A]"></span>
                  Hotline: <a href="tel:0889741931" className="font-semibold text-[#004B9A]">0889 741 931</a>
                </li>
              </ul>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <HighlightStat label="Khách hàng doanh nghiệp" value="500+" />
                <HighlightStat label="Tuyến biên giới & quốc tế" value="40+" />
                <HighlightStat label="Đơn thành công mỗi tháng" value="10.000+" />
                <HighlightStat label="Điểm trung chuyển" value="12" />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#004B9A]">Ưu đãi & hỗ trợ</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">Voucher, trợ giá & chính sách dành riêng cho bạn</h2>
              <p className="mt-3 text-slate-600">
                Giữ liên hệ với Saigon Speed để nhận ưu đãi theo ngành hàng, tuyến đường và mùa cao điểm.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-slate-700">
                <span className="rounded-full bg-[#004B9A]/10 px-3 py-1 text-[#004B9A]">Hỗ trợ 24/7</span>
                <span className="rounded-full bg-[#F4A300]/10 px-3 py-1 text-[#A66A00]">Ưu đãi tuyến cụ định</span>
                <span className="rounded-full bg-[#47B649]/10 px-3 py-1 text-[#2d803a]">Gói doanh nghiệp</span>
              </div>
            </div>
            <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
              <InfoCard
                title="Tra cứu voucher"
                description="Quản lý và kích hoạt ưu đãi đang có để tối ưu chi phí giao nhận."
                href="/vouchers"
              />
              <InfoCard
                title="Gửi yêu cầu ngay"
                description="Đặt chuyến, lên kế hoạch hoặc cần tư vấn tuyến phù hợp? Chúng tôi phản hồi trong 15 phút."
                href={primaryButtonHref}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function MetricCard({ label, value, accent }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</p>
      <p className={`mt-2 text-2xl font-bold ${accent}`}>{value}</p>
    </div>
  );
}

function HighlightStat({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 text-center shadow-sm">
      <p className="text-2xl font-bold text-[#004B9A]">{value}</p>
      <p className="mt-1 text-sm text-slate-600">{label}</p>
    </div>
  );
}

function InfoCard({ title, description, href }) {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-100 bg-slate-50/60 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
      <Link href={href} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#004B9A]">
        Tiếp tục <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
