import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  index: string;
  label: string;
  title?: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function SectionHeader({
  index,
  label,
  title,
  description,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <header className={cn("flex flex-col gap-6", className)}>
      <div className="flex items-baseline justify-between gap-6">
        <span className="mono-label text-muted-foreground">
          {index} / {label}
        </span>
        {action ? <div className="flex items-center gap-2">{action}</div> : null}
      </div>
      {(title || description) && (
        <div className="flex flex-col gap-3 max-w-2xl">
          {title && (
            <h2 className="text-3xl md:text-[2rem] leading-tight tracking-tight">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-muted-foreground text-base leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}
      <hr className="hairline" />
    </header>
  );
}
