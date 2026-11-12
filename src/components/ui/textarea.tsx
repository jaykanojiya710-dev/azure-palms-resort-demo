import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "w-full rounded-none border-0 border-b border-line bg-transparent px-0 py-2 font-sans text-[15.5px] leading-relaxed text-char outline-none transition-colors",
        "min-h-16 resize-y placeholder:text-char-3/70 focus:border-teal disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

export { Textarea };
