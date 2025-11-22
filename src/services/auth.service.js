"use client";

import apiClient from "@/lib/apiClient";

export const authService = {
  register: (payload) => apiClient.post("/auth/register", payload).then((res) => res.data),
  login: (payload) => apiClient.post("/auth/login", payload).then((res) => res.data),
  getCurrentUser: (token) =>
    apiClient
      .get("/auth/me", {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      })
      .then((res) => res.data),
  updateCurrentUser: (payload, token) =>
    apiClient
      .put("/auth/me", payload, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      })
      .then((res) => res.data),
  changePassword: (payload, token) =>
    apiClient
      .post("/auth/change-password", payload, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      })
      .then((res) => res.data),
};
