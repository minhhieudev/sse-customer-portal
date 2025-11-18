import {
  Search,
  ClipboardList,
  Ticket,
  HelpCircle,
  Info,
  Briefcase,
  Ship,
  Plane,
  Truck,
  Globe2,
  Home,
  Flag,
  Rocket,
  FileCheck2,
  PhoneCall,
} from "lucide-react";

export const SERVICE_ITEMS = [
  { href: "/services#ocean-freight", label: "Vận tải biển", icon: Ship },
  { href: "/services#air-freight", label: "Vận chuyển hàng không", icon: Plane },
  { href: "/services#domestic", label: "Vận tải nội địa", icon: Truck },
  { href: "/services#international", label: "Vận chuyển quốc tế", icon: Globe2 },
  { href: "/services#door-to-door", label: "Chuyển hàng door to door", icon: Home },
  { href: "/services#border", label: "Dịch vụ hàng biên giới", icon: Flag },
  { href: "/services#express", label: "Dịch vụ chuyển phát nhanh", icon: Rocket },
  { href: "/services#customs", label: "Khai báo thuế hải quan", icon: FileCheck2 },
];

export const NAV_LINKS = [
  {
    href: "/about",
    label: "Về chúng tôi",
    description: "Giới thiệu Saigon Speed",
    icon: Info,
  },
  {
    label: "Dịch vụ",
    description: "Tất cả giải pháp vận chuyển",
    icon: Briefcase,
    items: SERVICE_ITEMS,
  },
  {
    href: "/tracking",
    label: "Tra cứu vận đơn",
    description: "Theo dõi trạng thái realtime",
    icon: Search,
  },
  {
    href: "/vouchers",
    label: "Voucher",
    description: "Giữ ưu đãi không giới hạn",
    icon: Ticket,
  },
  {
    href: "/faq",
    label: "Hỗ trợ",
    description: "FAQ và tài liệu hướng dẫn",
    icon: HelpCircle,
  },
  {
    href: "/contact",
    label: "Liên hệ",
    description: "Kết nối với Saigon Speed",
    icon: PhoneCall,
  },
];

export const ORDER_LINK = {
  href: "/orders",
  labelUnauthenticated: "Đơn hàng và yêu cầu",
  labelAuthenticated: "Gửi hàng",
  icon: ClipboardList,
};
