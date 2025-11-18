import Image from "next/image";

import PageHeader from "@/components/dashboard/PageHeader";

export const metadata = {
  title: "Privacy | SSE Customer Portal",
};

export default function PrivacyPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        label="Policy"
        title="Privacy statement"
        description="Legal copy will be drafted soon. This card mirrors the clean surfaces of the new design."
      />
      <section className="space-y-4 rounded-[28px] border border-indigo-50 bg-white/95 p-6 shadow-[0_22px_60px_rgba(75,56,189,0.09)]">
        <Image
          src="/customer.png"
          alt="Privacy"
          width={120}
          height={80}
          className="rounded-2xl bg-[#f4f8ff] p-2"
        />
        <p className="text-slate-500">
          Portal khách hàng chỉ thu thập dữ liệu cần thiết để tạo đơn, theo dõi
          vận đơn và nhận ưu đãi. Khi bộ phận pháp lý hoàn tất, toàn bộ điều
          khoản bảo mật sẽ được cập nhật tại đây với định dạng giống template.
        </p>
      </section>
    </div>
  );
}
