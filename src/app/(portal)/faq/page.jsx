"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";

const FAQ_DATA = [
  {
    category: "Tài khoản",
    questions: [
      {
        q: "Làm thế nào để tạo tài khoản?",
        a: "Bạn có thể tạo tài khoản bằng cách nhấn vào nút 'Đăng ký' ở trang đăng nhập và điền đầy đủ thông tin.",
      },
      {
        q: "Tôi quên mật khẩu, phải làm sao?",
        a: "Tại trang đăng nhập, nhấn vào 'Quên mật khẩu' và làm theo hướng dẫn để đặt lại mật khẩu qua email.",
      },
    ],
  },
  {
    category: "Đơn hàng",
    questions: [
      {
        q: "Làm sao để tạo một đơn hàng mới?",
        a: "Sau khi đăng nhập, vào mục 'Đơn hàng' và nhấn 'Tạo đơn hàng mới'. Điền thông tin người gửi, người nhận, và chi tiết hàng hóa.",
      },
      {
        q: "Tôi có thể theo dõi đơn hàng ở đâu?",
        a: "Bạn có thể dùng trang 'Tra cứu vận đơn' và nhập mã đơn hàng để xem trạng thái chi tiết.",
      },
      {
        q: "Làm thế nào để hủy đơn hàng?",
        a: "Đối với các đơn hàng chưa được lấy, bạn có thể vào chi tiết đơn hàng và chọn tùy chọn 'Hủy đơn'.",
      },
    ],
  },
  {
    category: "Thanh toán & Chi phí",
    questions: [
      {
        q: "SSE hỗ trợ những phương thức thanh toán nào?",
        a: "Chúng tôi hỗ trợ thanh toán qua chuyển khoản ngân hàng, ví điện tử và tiền mặt khi nhận hàng (COD).",
      },
      {
        q: "Phí vận chuyển được tính như thế nào?",
        a: "Phí vận chuyển phụ thuộc vào trọng lượng, kích thước, khoảng cách và dịch vụ bạn chọn. Bạn có thể xem ước tính chi phí khi tạo đơn hàng.",
      },
    ],
  },
];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="flex gap-5">
        <img
          src="/FAQ.png"
          alt="Câu hỏi thường gặp"
          width="100"
          height="90"
        />
        <div>
          <h1 className="mt-6 text-3xl font-bold text-[#1f2050]">
            Câu hỏi thường gặp
          </h1>
          <p className="mt-2 text-slate-500">
            Tìm câu trả lời cho các thắc mắc của bạn về dịch vụ của chúng tôi.
          </p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm kiếm câu hỏi..."
          className="w-full rounded-full border border-slate-200 bg-white py-3 pl-12 pr-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5146ff]/50"
        />
      </div>

      <div className="space-y-8">
        {FAQ_DATA.map((category) => (
          <div key={category.category}>
            <h2 className="text-xl font-bold text-[#1f2050]">
              {category.category}
            </h2>
            <Accordion.Root type="multiple" className="mt-4 space-y-3">
              {category.questions
                .filter((q) =>
                  q.q.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((faq) => (
                  <FaqItem key={faq.q} question={faq.q} answer={faq.a} />
                ))}
            </Accordion.Root>
          </div>
        ))}
      </div>
    </div>
  );
}

const FaqItem = ({ question, answer }) => (
  <Accordion.Item
    value={question}
    className="rounded-lg border border-slate-200 bg-white shadow-sm"
  >
    <Accordion.Header>
      <Accordion.Trigger className="group flex w-full items-center justify-between p-4 text-left font-medium text-[#1f2050] hover:bg-slate-50/50">
        <span>{question}</span>
        <ChevronDown className="h-5 w-5 text-slate-400 transition-transform duration-300 group-data-[state=open]:rotate-180" />
      </Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
      <p className="px-4 pb-4 text-slate-600">{answer}</p>
    </Accordion.Content>
  </Accordion.Item>
);
