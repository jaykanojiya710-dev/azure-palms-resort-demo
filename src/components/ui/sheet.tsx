"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-[80] bg-char/40 backdrop-blur-[2px] data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out", className)}
    {...props}
  />
));
SheetOverlay.displayName = "SheetOverlay";

type Side = "left" | "right";

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> & { side?: Side; hideClose?: boolean }
>(({ className, children, side = "right", hideClose, ...props }, ref) => (
  <SheetPrimitive.Portal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-y-0 z-[85] flex w-[min(420px,100vw)] flex-col bg-ivory shadow-card-2 outline-none",
        side === "left" ? "left-0 data-[state=open]:animate-sheet-left-in data-[state=closed]:animate-sheet-left-out" : "right-0 data-[state=open]:animate-sheet-right-in data-[state=closed]:animate-sheet-right-out",
        className
      )}
      {...props}
    >
      {children}
      {!hideClose && (
        <SheetPrimitive.Close
          className="absolute right-4 top-4 grid size-9 place-items-center rounded-full text-char-3 transition-colors hover:bg-sand hover:text-char"
          aria-label="Close"
        >
          <X className="size-4" />
        </SheetPrimitive.Close>
      )}
    </SheetPrimitive.Content>
  </SheetPrimitive.Portal>
));
SheetContent.displayName = "SheetContent";

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetOverlay };
