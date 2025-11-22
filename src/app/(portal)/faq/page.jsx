"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, Search, User, Package, CreditCard, LifeBuoy, Truck } from "lucide-react";
import { useState, useMemo } from "react";
import clsx from "clsx";

const FAQ_DATA = [
  {
    category: "Tài khoản",
    icon: User,
    questions: [
      { q: "Làm thế nào để tạo tài khoản?", a: "Bạn có thể tạo tài khoản bằng cách chọn 'Đăng ký' tại trang đăng nhập, điền đầy đủ thông tin cá nhân theo yêu cầu và thực hiện xác nhận qua email đã đăng ký." },
      { q: "Tôi quên mật khẩu, phải làm sao?", a: "Để đặt lại mật khẩu, bạn hãy nhấn vào liên kết 'Quên mật khẩu' trên trang đăng nhập và làm theo các bước hướng dẫn chi tiết được gửi đến email của bạn." },
      { q: "Làm cách nào để thay đổi thông tin cá nhân?", a: "Sau khi đăng nhập, truy cập vào trang 'Hồ sơ của bạn', tại đây bạn có thể chỉnh sửa và cập nhật các thông tin cá nhân như họ tên, số điện thoại, và địa chỉ." },
    ],
  },
  {
    category: "Đơn hàng",
    icon: Package,
    questions: [
      { q: "Làm sao để tạo một đơn hàng mới?", a: "Trong trang 'Đơn hàng' sau khi đã đăng nhập, chọn 'Tạo đơn hàng mới', sau đó điền đầy đủ thông tin về người gửi, người nhận và chi tiết của kiện hàng." },
      { q: "Làm thế nào để theo dõi hành trình của đơn hàng?", a: "Sử dụng mã vận đơn được cung cấp, truy cập vào trang 'Tra cứu' và nhập mã để xem chi tiết trạng thái và vị trí hiện tại của đơn hàng." },
      { q: "Tôi có thể huỷ đơn hàng đã tạo không?", a: "Bạn có thể huỷ đơn hàng nếu đơn hàng đó chưa được nhân viên của chúng tôi tiếp nhận. Mở chi tiết đơn hàng và chọn tùy chọn 'Huỷ đơn'." },
    ],
  },
  {
    category: "Vận chuyển & Giao hàng",
    icon: Truck,
    questions: [
      { q: "Tôi có thể gửi hàng hóa đi nước ngoài bằng phương thức nào?", a: "SaigonSpeed cung cấp nhiều lựa chọn vận chuyển để đáp ứng nhu cầu và sở thích của khách hàng. Dịch vụ vận chuyển hàng không ra nước ngoài có chi phí hiệu quả vì SaigonSpeed ​​hoạt động như một đại lý trực tiếp có mối quan hệ lâu dài với các hãng vận tải hàng không. Họ cam kết tổng chi phí vận chuyển thấp hơn so với việc đặt trực tiếp với các hãng vận chuyển." },
      { q: "Làm thế nào để đăng ký và sử dụng dịch vụ gửi hàng đi nước ngoài của SaigonSpeed?", a: "Để đăng ký và sử dụng dịch vụ của SaigonSpeed, bạn chỉ cần truy cập trang web của họ và làm theo hướng dẫn đăng ký. Sau khi hoàn tất quá trình đăng ký, bạn có thể bắt đầu gửi hàng đến các điểm đến như Mỹ, Úc, Pháp, Singapore, Nhật Bản, Đài Loan và Đức." },
      { q: "SaigonSpeed có hỗ trợ khách hàng trong việc đóng gói hàng hóa không?", a: "Có, SaigonSpeed ​​cung cấp hướng dẫn chi tiết về cách đóng gói hàng hóa để vận chuyển quốc tế an toàn, đảm bảo không bị hư hỏng trong quá trình vận chuyển. Bạn có thể tìm thấy thông tin chi tiết hơn trên trang web của họ hoặc liên hệ với nhân viên dịch vụ khách hàng của họ để được tư vấn và hỗ trợ." },
      { q: "Bao lâu thì hàng hóa của tôi sẽ đến nơi nhận?", a: "Thời gian giao hàng cho các lô hàng quốc tế phụ thuộc vào nhiều yếu tố khác nhau, bao gồm phương thức vận chuyển, khoảng cách và thời gian xử lý hải quan. Tuy nhiên, SaigonSpeed ​​cam kết giao hàng đến Mỹ, Úc, Pháp, Canada, Nhật Bản và Đài Loan trong thời gian ngắn nhất có thể. Thông thường, việc giao hàng từ Việt Nam đến Mỹ qua các dịch vụ chuyển phát nhanh mất khoảng 3-5 ngày làm việc." },
      { q: "Làm sao để kiểm tra trạng thái vận chuyển quốc tế của hàng hóa?", a: "SaigonSpeed ​​cung cấp cho khách hàng một công cụ theo dõi trực tuyến để kiểm tra tình trạng vận chuyển hàng hóa của họ. Khách hàng chỉ cần nhập số vận đơn hoặc số theo dõi được cung cấp sau khi đăng ký vận chuyển để có được thông tin chi tiết về hành trình di chuyển của hàng hóa trên đường đến Mỹ." },
    ],
  },
  {
    category: "Thanh toán & Chi phí",
    icon: CreditCard,
    questions: [
      { q: "Saigon Speed hỗ trợ những phương thức thanh toán nào?", a: "Chúng tôi hỗ trợ nhiều hình thức thanh toán linh hoạt bao gồm chuyển khoản ngân hàng, các loại ví điện tử phổ biến, và thanh toán tiền mặt khi nhận hàng (COD)." },
      { q: "Phí vận chuyển được tính như thế nào?", a: "Phí vận chuyển phụ thuộc vào nhiều yếu-tố-như-trọng-lượng,-kích-thước-gói-hàng,-khoảng-cách-địa-lý-và-loại-hình-dịch-vụ-bạn-chọn.-Chi-phí-cuối-cùng-sẽ-được-hiển-thị-rõ-ràng-trước-khi-bạn-xác-nhận-tạo-đơn." },
      { q: "Làm sao để nhận hóa đơn VAT?", a: "Nếu có nhu cầu xuất hóa đơn VAT, vui lòng liên hệ bộ phận chăm sóc khách hàng của chúng tôi qua email support@saigonspeed.vn với mã đơn hàng và thông tin công ty." },
    ],
  },
];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState(FAQ_DATA[0].category);

  const filteredData = useMemo(() => {
    if (!searchTerm) {
      return FAQ_DATA.find(cat => cat.category === activeCategory);
    }
    const filteredQuestions = FAQ_DATA
      .flatMap(cat => cat.questions.map(q => ({ ...q, category: cat.category })))
      .filter(q => q.q.toLowerCase().includes(searchTerm.toLowerCase()));

    return {
      category: "Kết quả tìm kiếm",
      icon: Search,
      questions: filteredQuestions,
    };
  }, [searchTerm, activeCategory]);

  const handleCategoryClick = (category) => {
    setSearchTerm("");
    setActiveCategory(category);
  };

  return (
    <div className="page-container my-8 md:my-12">
      {/* HEADER */}
      <div className="mb-8 overflow-hidden rounded-3xl shadow-xl shadow-brand-blue/20 md:mb-12">
        <div className="relative bg-gradient-to-r from-brand-blue to-[#003a7a] p-8 text-white md:p-16">
          <div
            className="absolute inset-0 bg-contain bg-center opacity-10"
            style={{ backgroundImage: "url('/bg.png')" }}
          ></div>
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-white/5 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-brand-orange/20 blur-3xl"></div>

          <div className="relative z-10 text-center">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm shadow-inner border border-white/20">
              <LifeBuoy className="h-10 w-10 text-brand-orange" />
            </div>
            <h1 className="text-4xl font-bold md:text-5xl font-display tracking-tight">Trung Tâm Hỗ Trợ</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
              Chúng tôi có thể giúp gì cho bạn hôm nay?
            </p>
            <div className="mx-auto mt-8 max-w-2xl">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-brand-orange" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Nhập từ khóa để tìm kiếm..."
                  className="block w-full rounded-full border-0 bg-white/10 py-4 pl-12 pr-4 text-white placeholder:text-blue-200 ring-1 ring-inset ring-white/20 backdrop-blur-md transition-all focus:bg-white/20 focus:ring-2 focus:ring-brand-orange sm:text-sm sm:leading-6 shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        {/* SIDEBAR */}
        <aside className="lg:col-span-4 xl:col-span-3">
          <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="mb-4 px-2 text-xs font-bold uppercase tracking-wider text-slate-400">Danh mục</h3>
            <div className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-1">
              {FAQ_DATA.map((cat) => (
                <button
                  key={cat.category}
                  onClick={() => handleCategoryClick(cat.category)}
                  className={clsx(
                    "group flex w-full flex-shrink-0 items-center gap-3 rounded-xl p-3 text-left font-medium transition-all duration-200 lg:w-full",
                    activeCategory === cat.category && !searchTerm
                      ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20"
                      : "text-slate-600 hover:bg-slate-50 hover:text-brand-blue"
                  )}
                >
                  <div className={clsx(
                    "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
                    activeCategory === cat.category && !searchTerm ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-brand-blue/10 group-hover:text-brand-blue"
                  )}>
                    <cat.icon className="h-4 w-4" />
                  </div>
                  <span className="truncate">{cat.category}</span>
                  {activeCategory === cat.category && !searchTerm && (
                    <div className="ml-auto h-2 w-2 rounded-full bg-brand-orange"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Support Box */}
          <div className="mt-6 rounded-2xl bg-gradient-to-br from-brand-green/10 to-emerald-50 p-6 border border-brand-green/20">
            <h4 className="font-bold text-brand-green">Cần hỗ trợ thêm?</h4>
            <p className="mt-2 text-sm text-slate-600">Nếu bạn không tìm thấy câu trả lời, hãy liên hệ trực tiếp với chúng tôi.</p>
            <button className="mt-4 w-full rounded-xl bg-brand-green py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-green/20 transition hover:bg-opacity-90 hover:-translate-y-0.5">
              Gửi yêu cầu hỗ trợ
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="lg:col-span-8 xl:col-span-9">
          <div className="min-h-[500px]">
            <div className="mb-8 flex items-center gap-4 border-b border-slate-100 pb-6">
              {filteredData?.icon && (
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-orange text-white shadow-lg shadow-brand-orange/30">
                  <filteredData.icon className="h-7 w-7" />
                </div>
              )}
              <div>
                <h2 className="text-2xl font-bold text-brand-blue">{filteredData?.category}</h2>
                <p className="text-slate-500">Danh sách các câu hỏi thường gặp</p>
              </div>
            </div>

            {filteredData && filteredData.questions.length > 0 ? (
              <Accordion.Root type="multiple" className="space-y-4">
                {filteredData.questions.map((faq, index) => (
                  <FaqItem key={index} question={faq.q} answer={faq.a} />
                ))}
              </Accordion.Root>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 py-20 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-200">
                  <Search className="h-8 w-8 text-slate-400" />
                </div>
                <p className="text-lg font-semibold text-slate-700">Không tìm thấy kết quả</p>
                <p className="text-slate-500 mt-2 max-w-xs mx-auto">Không có câu hỏi nào phù hợp với từ khóa "{searchTerm}". Vui lòng thử lại.</p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-6 text-brand-blue font-semibold hover:underline"
                >
                  Xóa bộ lọc tìm kiếm
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

const FaqItem = ({ question, answer }) => (
  <Accordion.Item value={question} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-brand-blue/30 hover:shadow-md data-[state=open]:border-brand-orange data-[state=open]:ring-1 data-[state=open]:ring-brand-orange">
    <Accordion.Header>
      <Accordion.Trigger className="flex w-full items-center justify-between gap-4 p-6 text-left font-semibold text-slate-800 transition-colors group-hover:text-brand-blue group-data-[state=open]:text-brand-blue">
        <span className="text-lg">{question}</span>
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-all group-hover:bg-brand-blue/10 group-hover:text-brand-blue group-data-[state=open]:bg-brand-orange group-data-[state=open]:text-white">
          <ChevronDown className="h-5 w-5 transition-transform duration-300 group-data-[state=open]:rotate-180" />
        </div>
      </Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
      <div className="px-6 pb-6 pt-0">
        <div className="prose prose-slate max-w-none border-t border-slate-100 pt-4 text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: answer }} />
      </div>
    </Accordion.Content>
  </Accordion.Item>
);