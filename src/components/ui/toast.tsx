"use client";

import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const ToastProvider = ToastPrimitive.Provider;
export const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={cn(
      "fixed bottom-6 right-4 z-[95] flex w-[min(380px,calc(100vw-2rem))] flex-col gap-3 outline-none",
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = "ToastViewport";

export const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Root
    ref={ref}
    className={cn(
      "ap-toast group pointer-events-auto relative flex items-start gap-3 overflow-hidden rounded border border-line bg-ivory px-4 py-3.5 shadow-card-2",
      "data-[state=open]:animate-toast-in data-[state=closed]:animate-toast-out",
      className
    )}
    {...props}
  />
));
Toast.displayName = "Toast";

export const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title ref={ref} className={cn("text-[14px] leading-snug text-char [&_b]:font-semibold", className)} {...props} />
));
ToastTitle.displayName = "ToastTitle";

export const ToastIcon = () => (
  <span className="mt-0.5 grid size-[18px] shrink-0 place-items-center rounded-full bg-teal text-ivory">
    <Check className="size-3" strokeWidth={2.6} />
  </span>
);
