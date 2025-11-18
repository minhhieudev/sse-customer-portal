"use client";

import Header from "@/components/layout/Header";
import { Ship, Plane, Truck, Globe2, Home, Rocket, Flag, FileCheck2, ArrowRight } from "lucide-react";

const SERVICE_DETAILS = [
  {
    id: "ocean-freight",
    title: "Vận tải biển",
    description: "Lịch tàu ổn định, tối ưu container và chứng từ, phù hợp hàng số lượng lớn.",
    icon: Ship,
    highlights: ["Hỗ trợ booking nhanh cảng chính", "Đa dạng hình thức: FCL, LCL", "Theo dõi hành trình và thời gian cập cảng"],
  },
  {
    id: "air-freight",
    title: "Vận chuyển hàng không",
    description: "Ưu tiên tốc độ giao nhận, kết nối nhiều đường bay và hãng uy tín.",
    icon: Plane,
    highlights: ["Lịch bay linh hoạt, giữ chỗ nhanh", "Hỗ trợ hàng dễ vỡ, hàng giá trị", "Khai báo hải quan trọn gói"],
  },
  {
    id: "domestic",
    title: "Vận tải nội địa",
    description: "Đội xe chủ động, tuyến cố định khắp 63 tỉnh thành.",
    icon: Truck,
    highlights: ["Theo dõi realtime trên từng chuyến", "Giao nhận tại kho/nhà máy", "Đa dạng phương tiện: xe tải, container, lạnh"],
  },
  {
    id: "international",
    title: "Vận chuyển quốc tế",
    description: "Door to port/door tới hơn 150 quốc gia với đối tác tin cậy.",
    icon: Globe2,
    highlights: ["Tư vấn chứng từ từng thị trường", "Tối ưu chi phí theo tuyến", "Chính sách bảo hiểm rõ ràng"],
  },
  {
    id: "door-to-door",
    title: "Chuyển hàng door to door",
    description: "Nhận tại kho, giao tận nơi với quy trình kiểm soát chất lượng chặt chẽ.",
    icon: Home,
    highlights: ["Một đầu mối xử lý", "Thu hộ COD và đối soát rõ ràng", "Chăm sóc khách cuối sau giao"],
  },
  {
    id: "border",
    title: "Dịch vụ hàng biên giới",
    description: "Thông quan nhanh, giảm rủi ro lưu kho/lưu bãi tại cửa khẩu.",
    icon: Flag,
    highlights: ["Đội ngũ am hiểu quy định biên giới", "Hỗ trợ kiểm dịch và chứng từ", "Kết nối xe trung chuyển chuyên tuyến"],
  },
  {
    id: "express",
    title: "Dịch vụ chuyển phát nhanh",
    description: "Hỗ trợ hỏa tốc nhiều khung giờ, phù hợp tài liệu và hàng nhỏ lẻ.",
    icon: Rocket,
    highlights: ["Lấy hàng trong ngày", "Giao trong 2-24h tuỳ tuyến", "Theo dõi & thông báo tự động"],
  },
  {
    id: "customs",
    title: "Khai báo thuế hải quan",
    description: "Khai báo minh bạch, hạn chế phát sinh, cập nhật trạng thái liên tục.",
    icon: FileCheck2,
    highlights: ["Tư vấn mã HS, thuế suất", "Đại diện làm việc với cơ quan chức năng", "Xử lý kiểm tra chuyên ngành"],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EAF2FB] via-white to-[#FDF7EC] text-slate-900">
      <Header />
      <main className="px-4 py-14 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-6xl rounded-3xl bg-white/90 p-8 shadow-xl shadow-[#004B9A]/10 ring-1 ring-slate-100">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#004B9A]">Dịch vụ</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Giải pháp vận chuyển toàn diện của Saigon Speed</h1>
          <p className="mt-4 text-lg text-slate-600">
            Từ nội địa đến quốc tế, từ hàng nhỏ lẻ đến dự án lớn, chúng tôi luôn có phương án phù hợp để tối ưu thời gian và chi phí.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-slate-700">
            <span className="rounded-full bg-[#004B9A]/10 px-3 py-1 text-[#004B9A]">Tư vấn miễn phí</span>
            <span className="rounded-full bg-[#F4A300]/10 px-3 py-1 text-[#A66A00]">Theo dõi realtime</span>
            <span className="rounded-full bg-[#47B649]/10 px-3 py-1 text-[#2d803a]">SLA rõ ràng</span>
          </div>
        </section>

        <section className="mx-auto mt-10 grid max-w-6xl gap-6">
          {SERVICE_DETAILS.map((service) => (
            <div
              key={service.id}
              id={service.id}
              className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg shadow-[#004B9A]/5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#004B9A]/10 text-[#004B9A]">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#004B9A]">{service.title}</p>
                    <h2 className="text-xl font-bold text-slate-900">{service.description}</h2>
                  </div>
                </div>
                <a
                  href="tel:0889741931"
                  className="inline-flex items-center gap-2 rounded-full bg-[#F4A300] px-4 py-2 text-sm font-semibold text-[#0d2541] shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Nhận tư vấn nhanh <ArrowRight className="h-4 w-4" />
                </a>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {service.highlights.map((item) => (
                  <div key={item} className="flex items-start gap-2 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#47B649]"></span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
