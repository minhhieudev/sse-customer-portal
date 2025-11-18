"use client";

import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children }) {
  // Wrap the app with HeroUI/NextUI provider so components inherit theme and motion.
  return <NextUIProvider>{children}</NextUIProvider>;
}
