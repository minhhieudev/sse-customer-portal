import { Be_Vietnam_Pro, Inter } from "next/font/google";

import "@/app/globals.css";
import { Providers } from "./providers";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["vietnamese"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  title: "SSE Customer Portal",
  description:
    "Cổng thông tin khách hàng SSE cho phép đăng ký, tra cứu vận đơn, quản lý voucher và gửi yêu cầu giao nhận.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className={`${beVietnam.variable} ${inter.variable} bg-brand.sky text-brand.navy antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
