import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({ children }) {
  return (
    <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
      <div className="relative hidden flex-col items-center justify-between bg-slate-900 p-10 text-white lg:flex">
        <div className="absolute inset-0">
            <Image
                src="/customer.png"
                alt="SSE Customer"
                fill
                style={{ objectFit: 'cover' }}
                className="opacity-20"
            />
        </div>
        <Link href="/" className="relative z-10 flex items-center gap-3 self-start">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
            <Image
              src="/logo-navbar.png"
              alt="SSE Portal"
              width={28}
              height={28}
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">SSE Customer Portal</p>
            <p className="text-xs text-indigo-200">Nền tảng dành cho bạn</p>
          </div>
        </Link>
        <div className="relative z-10 max-w-md text-center">
          <h1 className="text-3xl font-bold leading-tight">
            Quản lý vận đơn chưa bao giờ dễ dàng hơn
          </h1>
          <p className="mt-4 text-indigo-200">
            Tạo, theo dõi và quản lý tất cả các lô hàng của bạn ở cùng một nơi.
            Truy cập các công cụ độc quyền và nhận hỗ trợ 24/7.
          </p>
        </div>
        <div className="relative z-10 text-center text-sm text-indigo-300">
          <p>© {new Date().getFullYear()} SSE Logistics. All Rights Reserved.</p>
          <div className="mt-2 flex justify-center gap-4">
            <Link href="/privacy" className="hover:text-white">
              Chính sách
            </Link>
            <Link href="/terms" className="hover:text-white">
              Điều khoản
            </Link>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center bg-white p-6 sm:p-8">
        {children}
      </div>
    </div>
  );
}
