import { cn } from "@/lib/utils";

interface PlaceholderFrameProps {
  label?: string;
  caption?: string;
  aspect?: "video" | "portrait" | "square" | "wide";
  className?: string;
}

const aspectMap = {
  video: "aspect-[16/10]",
  portrait: "aspect-[4/5]",
  square: "aspect-square",
  wide: "aspect-[21/9]",
} as const;

export function PlaceholderFrame({
  label = "Image placeholder",
  caption,
  aspect = "video",
  className,
}: PlaceholderFrameProps) {
  return (
    <figure
      className={cn(
        "placeholder-frame border border-border relative w-full",
        aspectMap[aspect],
        className
      )}
      role="img"
      aria-label={label}
    >
      <span className="absolute top-4 left-4 mono-label silver-text">
        {label}
      </span>
      <span className="absolute top-4 right-4 mono-label silver-text opacity-60">
        TBD
      </span>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 opacity-80">
          <div className="h-8 w-8 border border-border" />
          <span className="mono-label text-muted-foreground">
            {caption ?? "supply image to replace"}
          </span>
        </div>
      </div>
      <span className="absolute bottom-4 left-4 mono-label silver-text opacity-60">
        RJZ / placeholder
      </span>
      <span className="absolute bottom-4 right-4 mono-label silver-text opacity-60">
        000
      </span>
    </figure>
  );
}
