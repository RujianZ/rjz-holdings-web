import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export function MonoLabel({
  className,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      className={cn("mono-label text-muted-foreground", className)}
      {...props}
    />
  );
}
