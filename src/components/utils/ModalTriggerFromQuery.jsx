"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useUIStore } from "@/stores/useUIStore";

export default function ModalTriggerFromQuery() {
  const searchParams = useSearchParams();
  const { openCreateOrderModal } = useUIStore();

  useEffect(() => {
    if (searchParams.get("create") === "true") {
      openCreateOrderModal();
    }
  }, [searchParams, openCreateOrderModal]);

  return null; // This component renders nothing
}
