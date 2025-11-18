import { Search, ClipboardList, Ticket, User, HelpCircle } from 'lucide-react';

export const NAV_LINKS = [
  {
    href: "/tracking",
    label: "Tra cứu vận đơn",
    description: "Theo dõi trạng thái realtime",
    icon: Search,
  },
  {
    href: "/orders",
    label: "Đơn hàng & yêu cầu",
    description: "Khởi tạo, phê duyệt nhanh",
    icon: ClipboardList,
  },
  {
    href: "/vouchers",
    label: "Voucher",
    description: "Giữ voucher không hết hạn",
    icon: Ticket,
  },
  {
    href: "/profile",
    label: "Hồ sơ",
    description: "Thông tin doanh nghiệp, kho bãi",
    icon: User,
  },
  {
    href: "/faq",
    label: "Hỗ trợ",
    description: "FAQ và tài liệu hướng dẫn",
    icon: HelpCircle,
  },
];
