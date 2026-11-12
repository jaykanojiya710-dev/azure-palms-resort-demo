import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-shimmer rounded bg-line/70 bg-[linear-gradient(100deg,transparent_35%,rgba(255,255,255,.8)_50%,transparent_65%)] bg-[length:220%_100%]", className)} {...props} />;
}

export { Skeleton };
