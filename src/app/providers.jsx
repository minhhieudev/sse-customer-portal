"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (hash) {
        // If there's a hash, scroll to that element
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // If no hash, scroll to top
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    };

    // Scroll on pathname change
    scrollToHash();

    // Also scroll on hash change (for same-page anchor navigation)
    const handleHashChange = () => {
      scrollToHash();
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [pathname]);

  return null;
}

export function Providers({ children }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60,
            retry: 1,
          },
          mutations: {
            retry: 0,
          },
        },
      })
  );

  return (
    <NextUIProvider>
      <QueryClientProvider client={queryClient}>
        <ScrollToTop />
        {children}
        <Toaster
          richColors
          closeButton
          position="top-right"
          toastOptions={{
            className: "font-semibold tracking-tight text-sm",
            style: {
              borderRadius: "16px",
              background: "#ffffff",
              border: "1px solid rgba(15, 23, 42, 0.08)",
            },
          }}
        />
      </QueryClientProvider>
    </NextUIProvider>
  );
}
