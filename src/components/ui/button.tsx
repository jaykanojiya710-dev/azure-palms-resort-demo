import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Thin shadcn-style wrapper over the resort's own button design system (globals.css).
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap font-sans text-[13px] font-semibold uppercase tracking-[.14em] transition-all disabled:pointer-events-none disabled:opacity-45 outline-none focus-visible:ring-2 focus-visible:ring-teal/50 cursor-pointer",
  {
    variants: {
      variant: {
        primary: "btn btn--primary",
        ghost: "btn btn--ghost",
        light: "btn btn--light",
        bare: "",
      },
      size: {
        default: "",
        sm: "btn--sm",
        wide: "btn--wide",
        icon: "icon-btn",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
