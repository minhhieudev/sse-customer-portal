# SSE Customer Portal

Next.js 15 + Tailwind CSS boilerplate that will power the public customer
portal of SSE. The app now follows the soft, rounded dashboard style from the
shared dribbble template so the customer experience feels distinct from the
internal admin tools.

## Scope (phase 1)

The portal is organized around six key journeys:

1. Đăng ký / đăng nhập khách hàng (OTP-ready).
2. Tra cứu vận đơn không cần tài khoản.
3. Quản lý voucher cá nhân.
4. Tạo đơn hàng hoặc gửi yêu cầu nhanh cho khách chưa đăng nhập.
5. Quản lý thông tin cá nhân/doanh nghiệp.
6. Trung tâm FAQ và nội dung hỗ trợ.

Each page currently contains layout placeholders, copy direction, and the same
clean cards/tabs from the design reference so that future work can focus purely
on data + API integration.

## Tech stack

- [Next.js 15 (App Router)](https://nextjs.org/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- [next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- Vanilla React components (no leftover HeroUI/Admin dependencies)

## Getting started

```bash
npm install
npm run dev
```

The `src/` directory contains all application code. Shared layout/navigation is
in `src/components`, routes live under `src/app`, and static assets are placed
in `public/`.

## Next steps

- Wire up the actual authentication + OTP flow inside `src/app/auth`.
- Connect the tracking, voucher, orders and profile pages to real APIs.
- Finalize content for `/terms` and `/privacy` once provided by legal.
- Add illustration assets (e.g. rocket) if the final design requires them.
