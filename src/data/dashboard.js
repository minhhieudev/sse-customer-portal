export const PORTAL_FEATURES = [
  {
    id: "auth",
    badge: "Bước 1",
    title: "Đăng ký / Đăng nhập khách hàng",
    description:
      "Giao diện OTP dành riêng cho khách ngoài, hỗ trợ eKYC và liên kết tài khoản doanh nghiệp.",
    image: "/profile.png",
    accent: {
      from: "#ffd9f5",
      to: "#d7e4ff",
    },
    chips: ["OTP 1 lần", "Hỗ trợ doanh nghiệp"],
    points: [
      { label: "Trạng thái", value: "Đang thiết kế" },
      { label: "Ưu tiên", value: "Cao" },
    ],
    primary: "Kích hoạt tài khoản",
    secondary: "Quy trình eKYC",
  },
  {
    id: "tracking",
    badge: "Bước 2",
    title: "Tra cứu vận đơn (không cần đăng nhập)",
    description:
      "Nhập mã vận đơn hoặc số điện thoại để xem trạng thái mới nhất, thời gian giao dự kiến và điểm chạm gần nhất.",
    image: "/tra-cuu.png",
    accent: {
      from: "#d7f2ff",
      to: "#f3f1ff",
    },
    chips: ["Công khai", "Đồng bộ TMS"],
    points: [
      { label: "API", value: "Tracking V3" },
      { label: "SLA cập nhật", value: "15 phút" },
    ],
    primary: "Xem timeline mẫu",
    secondary: "Kết nối API",
  },
  {
    id: "voucher",
    badge: "Bước 3",
    title: "Quản lý voucher",
    description:
      "Ví ưu đãi cá nhân hóa để khách theo dõi điều kiện áp dụng, trạng thái sử dụng và lịch sử nhận mã.",
    image: "/voucher.png",
    accent: {
      from: "#ffe6cc",
      to: "#fff7e5",
    },
    chips: ["Cá nhân hóa", "Đồng bộ SSE Voucher"],
    points: [
      { label: "Voucher khả dụng", value: "12" },
      { label: "Sắp hết hạn", value: "03" },
    ],
    primary: "Thiết kế ví voucher",
    secondary: "Quy tắc ưu đãi",
  },
  {
    id: "orders",
    badge: "Bước 4",
    title: "Tạo đơn hàng / Yêu cầu gửi hàng",
    description:
      "Khách đã đăng nhập tạo booking đầy đủ; khách mới gửi yêu cầu nhanh để CSKH hỗ trợ.",
    image: "/don-hang.png",
    accent: {
      from: "#d7e4ff",
      to: "#eef7ff",
    },
    chips: ["2 chế độ", "Gợi ý địa chỉ"],
    points: [
      { label: "Đơn thử nghiệm", value: "24" },
      { label: "Thời gian tạo", value: "< 2 phút" },
    ],
    primary: "Bản mẫu booking",
    secondary: "Quy trình khách lẻ",
  },
  {
    id: "profile",
    badge: "Bước 5",
    title: "Quản lý thông tin cá nhân",
    description:
      "Cập nhật hồ sơ, địa chỉ, người liên hệ và cài đặt thông báo tách biệt với nội bộ.",
    image: "/customer.png",
    accent: {
      from: "#e4f8ff",
      to: "#f4f8ff",
    },
    chips: ["Profile riêng", "Thông báo tùy chỉnh"],
    points: [
      { label: "Địa chỉ đã lưu", value: "08" },
      { label: "Liên hệ phụ trách", value: "03" },
    ],
    primary: "Khung hồ sơ",
    secondary: "Cấu hình thông báo",
  },
  {
    id: "faq",
    badge: "Bước 6",
    title: "Trang FAQ",
    description:
      "Tổng hợp câu hỏi, chính sách và hướng dẫn sử dụng portal cho khách hàng mới.",
    image: "/FAQ.png",
    accent: {
      from: "#f8e6ff",
      to: "#fdf1ff",
    },
    chips: ["Song ngữ", "Liên kết CSKH"],
    points: [
      { label: "Chủ đề", value: "18" },
      { label: "Cập nhật cuối", value: "Gần nhất" },
    ],
    primary: "Bộ câu hỏi",
    secondary: "Gửi thêm thắc mắc",
  },
];

export const OVERVIEW_STATS = [
  { label: "Luồng chính", value: "06" },
  { label: "Trang đã hoàn thiện", value: "04" },
  { label: "Yêu cầu thiết kế", value: "12" },
  { label: "Hỗ trợ đang xử lý", value: "08" },
];

export const INBOX_CONTACTS = [
  {
    name: "Phòng CSKH",
    message: "Cần bổ sung hướng dẫn OTP song ngữ.",
    online: true,
  },
  {
    name: "Team Marketing",
    message: "Đã gửi danh sách voucher mới.",
    online: true,
  },
  {
    name: "Kho vận miền Bắc",
    message: "Muốn tích hợp timeline giao hàng.",
    online: false,
  },
  {
    name: "Đối tác SME",
    message: "Hỏi về chức năng yêu cầu gửi hàng.",
    online: false,
  },
  {
    name: "Bộ phận Pháp lý",
    message: "Cập nhật bản nháp điều khoản.",
    online: true,
  },
];
