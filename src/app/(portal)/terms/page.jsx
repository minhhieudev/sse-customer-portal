import Image from "next/image";

import PageHeader from "@/components/dashboard/PageHeader";

export const metadata = {
  title: "Terms | SSE Customer Portal",
};

export default function TermsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        label="Policy"
        title="Service terms"
        description="Another placeholder styled with rounded cards to keep the template aesthetic consistent."
      />
      <section className="space-y-4 rounded-[28px] border border-indigo-50 bg-white/95 p-6 shadow-[0_22px_60px_rgba(75,56,189,0.09)]">
        <Image
          src="/logo-navbar.png"
          alt="Điều khoản"
          width={90}
          height={90}
          className="rounded-2xl bg-[#eef4ff] p-3"
        />
        <p className="text-slate-500">
          Điều khoản dịch vụ dành cho khách hàng ngoài đang được chuẩn hoá. Khi
          có phê duyệt, chúng tôi sẽ trình bày nội dung chi tiết tại đây với
          cùng phong cách thẻ tròn, dễ đọc như template.
        </p>
      </section>
    </div>
  );
}
