"use client";

import { useCallback } from "react";
import { toast } from "sonner";

export const TOAST_MESSAGES = {
  LOGIN_SUCCESS: {
    title: "Đăng nhập thành công",
    description: "Chào mừng bạn quay trở lại Saigon Speed Portal.",
    variant: "success",
  },
  LOGOUT_SUCCESS: {
    title: "Đã đăng xuất",
    description: "Hẹn gặp lại bạn trong chuyến hàng tiếp theo.",
    variant: "info",
  },
  CONTACT_SENT: {
    title: "Đã gửi thông tin",
    description: "Chúng tôi sẽ phản hồi trong 15 phút làm việc.",
    variant: "success",
  },
  FORM_INCOMPLETE: {
    title: "Thiếu thông tin",
    description: "Vui lòng điền đầy đủ các trường bắt buộc.",
    variant: "warning",
  },
  GENERIC_ERROR: {
    title: "Đã có lỗi xảy ra",
    description: "Vui lòng thử lại sau ít phút.",
    variant: "error",
  },
};

export function useToast() {
  const showToast = useCallback((messageKey, overrides = {}) => {
    const message =
      typeof messageKey === "string"
        ? TOAST_MESSAGES[messageKey] ?? TOAST_MESSAGES.GENERIC_ERROR
        : messageKey;

    const title = overrides.title ?? message.title;
    const description = overrides.description ?? message.description;
    const variant = overrides.variant ?? message.variant ?? "info";
    const duration = overrides.duration ?? message.duration ?? 4200;
    const action = overrides.action ?? message.action;

    if (!title) return;

    const toastMethod = typeof toast[variant] === "function" ? toast[variant] : toast;

    toastMethod(title, {
      description,
      duration,
      action,
    });
  }, []);

  const showPromiseToast = useCallback((promise, { loading, success, error }) => {
    return toast.promise(promise, {
      loading,
      success,
      error,
    });
  }, []);

  return {
    showToast,
    showPromiseToast,
    dismissToast: toast.dismiss,
    messages: TOAST_MESSAGES,
  };
}
