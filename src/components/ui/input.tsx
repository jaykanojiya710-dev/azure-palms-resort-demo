import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "w-full rounded-none border-0 border-b border-line bg-transparent px-0 py-2 font-sans text-[15.5px] text-char outline-none transition-colors",
        "placeholder:text-char-3/70 focus:border-teal focus-visible:ring-0 disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
