"use client";

import { useToast } from "@/hooks/use-toast";
import { Toast, ToastIcon, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();
  return (
    <ToastProvider swipeDirection="right">
      {toasts.map((t) => (
        <Toast key={t.id}>
          <ToastIcon />
          <div className="min-w-0 flex-1">{t.title && <ToastTitle>{t.title}</ToastTitle>}</div>
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
