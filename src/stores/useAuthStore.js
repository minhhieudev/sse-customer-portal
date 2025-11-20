"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const defaultState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

export const useAuthStore = create(
  persist(
    (set) => ({
      ...defaultState,
      hasHydrated: false,
      login: (userData, token) =>
        set({
          user: userData,
          token: token ?? null,
          isAuthenticated: true,
        }),
      logout: () =>
        set({
          ...defaultState,
          hasHydrated: true,
        }),
      updateUser: (payload) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...payload } : payload,
          isAuthenticated: Boolean(state.user ?? payload),
        })),
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "sse-auth-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

export const authSelectors = {
  user: (state) => state.user,
  isAuthenticated: (state) => state.isAuthenticated,
};
