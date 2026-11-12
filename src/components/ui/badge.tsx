import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-gold/50 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[.24em] text-gold",
        className
      )}
      {...props}
    />
  );
}
