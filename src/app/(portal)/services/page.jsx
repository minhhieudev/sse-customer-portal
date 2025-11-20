import { Globe, Plane, Shield, Star, Car, GraduationCap } from 'lucide-react';

const serviceCategories = [
  {
    category: "Chuyển phát nhanh Quốc tế",
    icon: Globe,
    description: "Vận chuyển hàng hóa, tài liệu đến hơn 200 quốc gia và vùng lãnh thổ với tốc độ và sự tin cậy vượt trội.",
    items: [
      "Gửi hàng đi Mỹ, Úc, Canada",
      "Gửi hàng đi Châu Á: Đài Loan, Singapore, Nhật Bản, Hàn Quốc, Malaysia",
      "Gửi hàng đi Châu Âu: Pháp, Đức, Anh",
      "Chuyển phát nhanh hỏa tốc, khẩn cấp",
      "Dịch vụ hẹn giờ, phát định kỳ",
      "Vận chuyển hàng nặng, hàng quá khổ",
      "Gửi chứng từ, hồ sơ, bưu phẩm",
    ],
  },
  {
    category: "Vận chuyển Đặc biệt",
    icon: Shield,
    description: "Giải pháp chuyên biệt cho các loại hàng hóa yêu cầu xử lý đặc thù, đảm bảo an toàn và tuân thủ quy định.",
    items: [
      "Hàng nguy hiểm (Dangerous Goods)",
      "Mẫu y tế, sản phẩm sinh học",
      "Hóa chất, chất lỏng, chất bột",
      "Linh kiện điện tử, công nghệ nano",
      "Động vật, thực vật sống",
      "Hàng hóa giá trị cao",
      "Hành lý cá nhân",
    ],
  },
  {
    category: "Định cư & Du học",
    icon: GraduationCap,
    description: "Hỗ trợ các thủ tục và vận chuyển tài liệu quan trọng cho các chương trình đầu tư định cư và du học.",
    items: [
      "Hồ sơ đầu tư định cư Mỹ",
      "Hồ sơ du học & định cư Canada",
    ],
  },
  {
    category: "Dịch vụ Khác",
    icon: Car,
    description: "Cung cấp các dịch vụ bổ sung để đáp ứng nhu cầu đa dạng của khách hàng.",
    items: [
      "Dịch vụ hợp đồng xe du lịch 7 chỗ",
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="page-container py-20 text-center">
          <h1 className="text-5xl font-bold text-brand-blue font-display sm:text-6xl">
            Dịch Vụ Của Chúng Tôi
          </h1>
          <p className="mt-6 text-xl max-w-3xl mx-auto text-slate-600">
            Từ chuyển phát nhanh quốc tế đến các giải pháp vận chuyển chuyên biệt, Saigon Speed cung cấp dịch vụ toàn diện, an toàn và hiệu quả.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="page-container">
          <div className="grid lg:grid-cols-2 gap-12">
            {serviceCategories.map((category) => (
              <ServiceCategoryCard key={category.category} {...category} />
            ))}
          </div>
        </div>
      </section>

       {/* CTA Section */}
       <section className="bg-brand-blue">
        <div className="page-container py-16 text-center">
          <h2 className="text-3xl font-bold text-white">Bạn đã sẵn sàng gửi hàng?</h2>
          <p className="mt-4 text-lg text-blue-200 max-w-2xl mx-auto">
            Nhận báo giá ngay lập tức hoặc liên hệ với đội ngũ chuyên gia của chúng tôi để được tư vấn giải pháp phù hợp nhất.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a
              href="/orders/create"
              className="inline-block bg-brand-orange text-white font-bold py-3 px-8 rounded-lg shadow-lg transition hover:bg-opacity-90"
            >
              Tạo Vận Đơn
            </a>
            <a
              href="/contact"
              className="inline-block bg-white text-brand-blue font-bold py-3 px-8 rounded-lg shadow-lg transition hover:bg-slate-100"
            >
              Liên Hệ Tư Vấn
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function ServiceCategoryCard({ category, icon: Icon, description, items }) {
  return (
    <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-brand-orange text-white rounded-full flex items-center justify-center flex-shrink-0">
          <Icon className="w-7 h-7" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-brand-blue font-display">{category}</h2>
        </div>
      </div>
      <p className="mt-4 text-slate-600">{description}</p>
      <ul className="mt-6 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <div className="w-5 h-5 bg-brand-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <Plane className="w-3 h-3 text-white" />
            </div>
            <span className="text-slate-700">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}