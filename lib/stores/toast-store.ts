"use client";

import { create } from "zustand";

export type Toast = {
  id: string;
  title: string;
  description?: string;
};

type ToastState = {
  toasts: Toast[];
  push: (toast: Omit<Toast, "id">) => void;
  dismiss: (id: string) => void;
};

export const useToastStore = create<ToastState>()((set) => ({
  toasts: [],
  push: (toast) =>
    set((state) => ({
      toasts: [{ id: crypto.randomUUID(), ...toast }, ...state.toasts].slice(0, 4)
    })),
  dismiss: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id)
    }))
}));
