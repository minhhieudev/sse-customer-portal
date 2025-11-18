export const AUTH_STEPS = [
  {
    title: "Xác thực OTP",
    detail: "Gửi mã OTP qua SMS/email và nhập đúng số đã đăng ký.",
    status: "Hoàn tất",
  },
  {
    title: "Định danh khách hàng",
    detail: "Thu thập thông tin cá nhân/doanh nghiệp, địa chỉ kho bãi.",
    status: "Đang thiết kế",
  },
  {
    title: "Kích hoạt tài khoản",
    detail: "Gửi email chào mừng và cấp quyền cho từng nhân viên.",
    status: "Chưa triển khai",
  },
  {
    title: "Đồng bộ ví SSE Pay",
    detail: "Kết nối phương thức thanh toán để đặt chỗ nhanh.",
    status: "Chuẩn bị phát hành",
  },
];

export const TRACKING_RESULT = {
  code: "SSE123456789",
  status: "Đang giao",
  eta: "16:30 hôm nay",
  contact: "Tài xế Trường - 09xx 888 222",
  route: [
    { label: "Kho HCM", time: "08:00", description: "Đã xuất kho" },
    { label: "Hub miền Trung", time: "12:10", description: "Đến trung chuyển" },
    { label: "Kho Hà Nội", time: "03:40", description: "Đang bốc xếp" },
    { label: "Giao khách", time: "Hiện tại", description: "Trên đường giao" },
  ],
  milestones: [
    { title: "Đã tiếp nhận", time: "Hôm qua 21:04" },
    { title: "Đang trung chuyển", time: "Sáng nay 06:15" },
    { title: "Đang giao", time: "Hiện tại" },
  ],
};

export const VOUCHER_STATS = [
  { label: "Voucher khả dụng", value: "12" },
  { label: "Đang sử dụng", value: "04" },
  { label: "Sắp hết hạn", value: "03" },
];

export const VOUCHER_LIST = [
  {
    code: "SSE-DEL50",
    name: "Giảm 50% phí nội thành",
    value: "Tối đa 150K",
    expires: "30/11/2025",
    status: "Sẵn sàng",
  },
  {
    code: "SSE-LOYALTY",
    name: "Ưu đãi khách thân thiết",
    value: "-10% mỗi tuyến",
    expires: "31/12/2025",
    status: "Đã dùng 2/5",
  },
  {
    code: "SSE-CASHBACK",
    name: "Hoàn tiền SSE Pay",
    value: "Hoàn 5%",
    expires: "15/12/2025",
    status: "Chưa kích hoạt",
  },
];

export const ORDER_ACTIONS = {
  loggedIn: [
    "Chọn người gửi/nhận đã lưu.",
    "Cấu hình dịch vụ, khai báo hàng hóa, ghi chú tài xế.",
    "Thanh toán qua SSE Pay hoặc chuyển khoản định danh.",
  ],
  guest: [
    "Điền thông tin liên hệ ngắn gọn.",
    "Nhập địa chỉ lấy/giao và mã tham chiếu hàng.",
    "CSKH gọi xác nhận và tạo booking giúp khách.",
  ],
};

export const ORDER_HISTORY = [
  {
    id: "ORD-202501",
    route: "Quận 1 ↔ Hà Đông",
    service: "Giao nhanh",
    status: "Đang giao",
    updatedAt: "10:42 hôm nay",
  },
  {
    id: "REQ-98422",
    route: "Gò Vấp ↔ Đà Nẵng",
    service: "Yêu cầu khách mới",
    status: "Chờ CSKH",
    updatedAt: "09:10 hôm nay",
  },
  {
    id: "ORD-202489",
    route: "Nha Trang ↔ Bình Dương",
    service: "Tuyến lạnh",
    status: "Hoàn tất",
    updatedAt: "Hôm qua 17:45",
  },
];

export const PROFILE_ADDRESSES = [
  {
    label: "Kho chính TP.HCM",
    detail: "12 Nguyễn Văn Linh, Quận 7",
  },
  {
    label: "Văn phòng Hà Nội",
    detail: "Tòa nhà SSE, 21 Duy Tân, Cầu Giấy",
  },
];

export const PROFILE_CONTACTS = [
  { name: "Nguyễn Mai", role: "Kế toán", phone: "09xx 123 456" },
  { name: "Lê Hoàng", role: "Điều phối", phone: "09xx 222 888" },
];

export const NOTIFICATION_PREFS = [
  {
    channel: "Email",
    enabled: true,
    note: "Thông báo đơn hàng và voucher",
  },
  { channel: "SMS", enabled: true, note: "OTP và trạng thái giao hàng" },
  { channel: "Zalo OA", enabled: false, note: "Sẽ kích hoạt sau" },
];

export const FAQ_TOPICS = [
  {
    category: "Đăng ký / Đăng nhập",
    items: [
      {
        question: "OTP có dùng cho cả email và SMS?",
        answer: "Có. Hệ thống ưu tiên SMS và fallback email khi cần.",
      },
      {
        question: "Thời gian duy trì phiên bao lâu?",
        answer:
          "Phiên khách hàng tồn tại 7 ngày và có thể đăng xuất thủ công bất kỳ lúc nào.",
      },
    ],
  },
  {
    category: "Voucher & Đơn hàng",
    items: [
      {
        question: "Có chia sẻ voucher cho nhân viên khác?",
        answer:
          "Khách doanh nghiệp có thể cấp quyền, mọi giao dịch đều được log.",
      },
      {
        question: "Yêu cầu gửi hàng xử lý trong bao lâu?",
        answer: "Trong giờ hành chính CSKH phản hồi trong 15 phút.",
      },
    ],
  },
];
