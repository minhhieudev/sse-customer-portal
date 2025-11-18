"use client";

import Header from "@/components/layout/Header";
import { ShieldCheck, Users, Truck, Globe2, Target, Clock4 } from "lucide-react";

const MILESTONES = [
  { year: "2015", title: "Khởi đầu", detail: "Thành lập Saigon Speed với dịch vụ chuyển phát nhanh nội địa." },
  { year: "2018", title: "Mở rộng biên giới", detail: "Thêm tuyến biên giới và giải pháp door to door quốc tế." },
  { year: "2021", title: "Chuyển đổi số", detail: "Triển khai nền tảng theo dõi realtime và quản lý đơn hàng online." },
  { year: "2024", title: "Đồng hành doanh nghiệp", detail: "Phục vụ hơn 500+ khách hàng với SLA giao nhận 98%." },
];

const STRENGTHS = [
  { icon: ShieldCheck, title: "Cam kết an toàn", detail: "Quy trình kiểm soát chất lượng chặt chẽ, bảo hiểm hàng hóa rõ ràng." },
  { icon: Users, title: "Đội ngũ chuyên nghiệp", detail: "Nhân sự vận hành, CSKH và khai báo hải quan giàu kinh nghiệm." },
  { icon: Truck, title: "Năng lực vận tải", detail: "Đội xe chủ động, liên kết hãng tàu và hãng bay uy tín." },
  { icon: Globe2, title: "Mạng lưới rộng", detail: "Điểm trung chuyển và đối tác tại các tỉnh trọng yếu & hơn 40 tuyến quốc tế." },
  { icon: Target, title: "Tư vấn giải pháp", detail: "Đề xuất phương án tối ưu theo ngành hàng và ngân sách của bạn." },
  { icon: Clock4, title: "Phản hồi nhanh", detail: "Hỗ trợ 24/7, phản hồi yêu cầu mới trong vòng 15 phút." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EAF2FB] via-white to-[#FDF7EC] text-slate-900">
      <Header />
      <main className="px-4 py-14 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-6xl rounded-3xl bg-white/90 p-8 shadow-xl shadow-[#004B9A]/10 ring-1 ring-slate-100">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#004B9A]">Về Saigon Speed</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Câu chuyện của CÔNG TY TNHH CHUYỂN PHÁT NHANH SÀI GÒN SPEED</h1>
          <p className="mt-4 text-lg text-slate-600">
            Chúng tôi bắt đầu với mục tiêu đơn giản: kết nối nhanh và an toàn giữa doanh nghiệp và khách hàng. Đến nay,
            Saigon Speed cung cấp giải pháp logistics trọn gói từ nội địa đến quốc tế, tối ưu tốc độ, chi phí và trải nghiệm dịch vụ.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-[#004B9A]/90 p-5 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/80">Thông tin pháp lý</p>
              <h3 className="mt-2 text-xl font-bold">CÔNG TY TNHH CHUYỂN PHÁT NHANH SÀI GÒN SPEED</h3>
              <p className="mt-2 text-white/80">Địa chỉ: Số 124/11 Cộng Hoà, Phường Tân Sơn Nhất, TP. Hồ Chí Minh</p>
              <p className="mt-1 text-white/80">Hotline: 0889 741 931</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5">
              <p className="text-sm font-semibold text-[#004B9A]">Cách chúng tôi làm việc</p>
              <ul className="mt-3 space-y-2 text-slate-700">
                <li>• Lắng nghe nhu cầu và đặc thù hàng hóa</li>
                <li>• Thiết kế tuyến & phương án đóng gói tối ưu</li>
                <li>• Theo dõi realtime, cập nhật minh bạch</li>
                <li>• Chăm sóc sau giao và xử lý phát sinh nhanh</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-12 max-w-6xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#004B9A]">Cột mốc</p>
              <h2 className="text-2xl font-bold sm:text-3xl text-slate-900">Hành trình phát triển</h2>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {MILESTONES.map((item) => (
              <div key={item.year} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold text-[#F4A300]">{item.year}</p>
                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-slate-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-12 max-w-6xl rounded-3xl bg-white p-8 shadow-xl shadow-[#004B9A]/10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#004B9A]">Điểm mạnh</p>
              <h2 className="text-2xl font-bold sm:text-3xl text-slate-900">Tại sao đối tác tin tưởng Saigon Speed</h2>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {STRENGTHS.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5 shadow-sm">
                <item.icon className="h-8 w-8 text-[#004B9A]" />
                <h3 className="mt-3 text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
