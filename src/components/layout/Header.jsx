"use client";

import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  User,
  LogOut,
  Package,
  MessageSquareWarning,
  X,
  Menu,
  PhoneCall,
  ChevronDown,
} from "lucide-react";
import { NAV_LINKS, ORDER_LINK } from "@/data/navigation";

export default function Header() {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);

  useEffect(() => {
    setIsMenuOpen(false);

    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const userObj = JSON.parse(storedUser);
        if (userObj?.email) {
          setUser(userObj);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      setOpenMobileDropdown(null);
    }
  }, [isMenuOpen]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }
    setUser(null);
    window.location.href = "/auth";
  };

  const navigationLinks = NAV_LINKS.reduce((acc, link) => {
    acc.push(link);
    if (user && link.href === "/tracking") {
      acc.push({
        ...ORDER_LINK,
        label: ORDER_LINK.labelAuthenticated,
      });
    }
    return acc;
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 sm:gap-3">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo-app.png"
                alt="SSE Customer Portal"
                width={50}
                height={50}
                className="sm:w-16 sm:h-16 lg:w-12 lg:h-12"
                priority
              />
            </Link>
            <div className="items-center gap-2 rounded-full bg-brand-blue/10 px-2 py-1 text-xs font-semibold text-brand-blue flex">
              <PhoneCall className="h-3 w-3" />
              <a href="tel:0889741931" className="hover:underline">
                Hotline: 0889 741 931
              </a>
            </div>
          </div>
          <nav className="hidden items-center gap-3 md:flex">
            {navigationLinks.map((link) =>
              link.items ? (
                <div key={link.label} className="relative group">
                  <button className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[13px] font-semibold text-slate-700 transition hover:bg-brand-blue/12 hover:text-brand-blue">
                    <link.icon className="hidden h-4 w-4 lg:block" />
                    {link.label}
                    <ChevronDown className="h-3.5 w-3.5 transition duration-200 group-hover:-rotate-180" />
                  </button>
                  <div className="absolute left-1/2 top-full z-30 hidden -translate-x-1/2 pt-3 group-hover:block">
                    <div className="min-w-[320px] rounded-2xl bg-white/95 shadow-2xl shadow-slate-400/10 ring-1 ring-slate-900/5 backdrop-blur">
                      <div className="grid divide-y divide-slate-100">
                        {link.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-start gap-3 px-4 py-3 text-sm text-slate-700 transition hover:bg-brand-blue/10 hover:text-brand-blue"
                          >
                            <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue">
                              <item.icon className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-semibold">{item.label}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[13px] font-semibold text-slate-700 transition hover:bg-brand-blue/12 hover:text-brand-blue"
                >
                  <link.icon className="hidden h-4 w-4 lg:block" />
                  {link.label}
                </Link>
              )
            )}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <Notifications />

            {user ? (
              <UserProfile user={user} onLogout={handleLogout} />
            ) : (
              <Link
                href="/auth"
                className="hidden sm:inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:shadow-xl hover:scale-105"
              >
                Đăng nhập
              </Link>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 md:hidden"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-0 z-30 w-full border-b border-slate-200 bg-white/95 p-4 backdrop-blur-lg md:hidden"
          >
            <nav className="flex flex-col space-y-1">
              {navigationLinks.map((link) =>
                link.items ? (
                  <div key={link.label} className="rounded-lg">
                    <button
                      onClick={() => setOpenMobileDropdown(openMobileDropdown === link.label ? null : link.label)}
                      className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-base font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      <span className="flex items-center gap-3">
                        <link.icon className="h-5 w-5" />
                        {link.label}
                      </span>
                      <ChevronDown
                        className={clsx(
                          "h-4 w-4 text-slate-500 transition-transform",
                          openMobileDropdown === link.label && "rotate-180"
                        )}
                      />
                    </button>
                    {openMobileDropdown === link.label && (
                      <div className="mt-1 space-y-1 pl-11">
                        {link.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                          >
                            <item.icon className="h-4 w-4 text-brand-blue" />
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-4 py-2 text-base font-medium text-slate-700 hover:bg-slate-100"
                  >
                    <link.icon className="h-5 w-5" />
                    {link.label}
                  </Link>
                )
              )}
              <div className="border-t border-slate-200 pt-4 mt-4">
                {user ? (
                  <>
                    <Link
                      href="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-4 py-2 text-base font-medium text-slate-700 hover:bg-slate-100"
                    >
                      <Image src={user.avatar} alt={user.name} width={32} height={32} className="rounded-full" />
                      <span>Hồ sơ</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 rounded-lg px-4 py-2 text-base font-medium text-red-500 hover:bg-red-50"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Đăng xuất</span>
                    </button>
                  </>
                ) : (
                  <Link
                    href="/auth"
                    onClick={() => setIsMenuOpen(false)}
                    className="mx-auto block rounded-lg bg-brand-blue px-6 py-3 text-center text-base font-semibold text-white shadow-md hover:shadow-lg transition"
                  >
                    Đăng nhập
                  </Link>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function UserProfile({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full"
      >
        <Image src={user.avatar} alt={user.name} width={32} height={32} className="rounded-full" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-3 w-64 origin-top-right rounded-2xl bg-white shadow-2xl shadow-slate-500/20 ring-1 ring-slate-900/5 popup-arrow"
          >
            <div className="flex items-center gap-4 border-b border-slate-100 p-4">
              <Image src={user.avatar} alt={user.name} width={48} height={48} className="rounded-full" />
              <div>
                <p className="text-md font-bold text-brand-blue">{user.name}</p>
                <p className="text-sm text-slate-500">{user.email}</p>
              </div>
            </div>
            <div className="p-2">
              <Link
                href="/profile"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                <User className="h-4 w-4" />
                Hồ sơ của bạn
              </Link>
              <button
                onClick={onLogout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                Đăng xuất
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const MOCK_NOTIFICATIONS = [
  {
    icon: Package,
    title: "Giao hàng thành công",
    description: "Đơn hàng #SSE88C1 đã được giao thành công.",
    time: "5 phút trước",
    isRead: false,
  },
  {
    icon: MessageSquareWarning,
    title: "Cập nhật quan trọng",
    description: "Thay đổi chính sách giao hàng tại khu vực Quận 9.",
    time: "2 giờ trước",
    isRead: false,
  },
  {
    icon: Package,
    title: "Đang giao hàng",
    description: "Đơn hàng #SSE45B2 đang trên đường giao đến bạn.",
    time: "8 giờ trước",
    isRead: true,
  },
];

function Notifications() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent background scroll when the overlay is open (mostly for mobile)
  useEffect(() => {
    if (!isOpen) return undefined;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !n.isRead).length;

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative rounded-full p-2.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-orange text-xs font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Desktop/Tablet Dropdown */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
              className="hidden sm:block absolute right-0 top-full mt-3 w-96 max-w-sm rounded-2xl bg-white shadow-2xl shadow-slate-500/20 ring-1 ring-slate-900/5 z-50 popup-arrow"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-brand-blue">Thông báo</h3>
                  <button onClick={() => setIsOpen(false)} className="rounded-lg p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="space-y-1 max-h-72 overflow-y-auto">
                  {MOCK_NOTIFICATIONS.map((item, index) => (
                    <div
                      key={index}
                      className={clsx(
                        "flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors",
                        !item.isRead ? "bg-blue-50/50 hover:bg-blue-50" : "hover:bg-slate-50"
                      )}
                    >
                      <div
                        className={clsx(
                          "flex h-8 w-8 items-center justify-center rounded-full flex-shrink-0",
                          !item.isRead ? "bg-blue-100 text-brand-blue" : "bg-slate-100 text-slate-500"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">{item.title}</p>
                        <p className="text-sm text-slate-500 line-clamp-2">{item.description}</p>
                        <p className="mt-1 text-xs text-slate-400">{item.time}</p>
                      </div>
                      {!item.isRead && <div className="h-2 w-2 bg-brand-orange rounded-full mt-2 flex-shrink-0"></div>}
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <button className="w-full text-sm font-semibold text-brand-blue hover:text-blue-800 py-2">
                    Xem tất cả
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Mobile Dropdown */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
              className="sm:hidden fixed right-4 top-20 w-72 rounded-lg bg-white shadow-lg ring-1 ring-slate-900/5 z-50 popup-arrow"
            >
              <div className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-brand-blue">Thông báo</h3>
                  <button onClick={() => setIsOpen(false)} className="rounded p-0.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-1.5 max-h-80 overflow-y-auto">
                  {MOCK_NOTIFICATIONS.map((item, index) => (
                    <div
                      key={index}
                      className={clsx(
                        "flex items-start gap-2 p-2 rounded cursor-pointer transition-colors text-left",
                        !item.isRead ? "bg-blue-50/70 hover:bg-blue-50" : "hover:bg-slate-50"
                      )}
                    >
                      <div
                        className={clsx(
                          "flex h-7 w-7 items-center justify-center rounded-full flex-shrink-0 mt-0.5",
                          !item.isRead ? "bg-blue-100 text-brand-blue" : "bg-slate-100 text-slate-500"
                        )}
                      >
                        <item.icon className="h-3.5 w-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-800 truncate">{item.title}</p>
                        <p className="text-xs text-slate-600 line-clamp-1">{item.description}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{item.time}</p>
                      </div>
                      {!item.isRead && <div className="h-1 w-1 bg-brand-orange rounded-full mt-1.5 flex-shrink-0"></div>}
                    </div>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t border-slate-100">
                  <button className="w-full text-xs font-semibold text-brand-blue hover:text-blue-800 py-1.5">
                    Xem tất cả
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}