"use client";

import { create } from "zustand";

export const useUIStore = create((set) => ({
  isCreateOrderModalOpen: false,
  openCreateOrderModal: () => set({ isCreateOrderModalOpen: true }),
  closeCreateOrderModal: () => set({ isCreateOrderModalOpen: false }),
}));
