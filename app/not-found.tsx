import Link from "next/link";
import { enDict } from "@/lib/i18n";

export default function NotFound() {
  const d = enDict.notFound;
  return (
    <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10 py-24 md:py-32 flex flex-col gap-8 min-h-[60vh] justify-center">
      <span className="mono-label text-muted-foreground">{d.eyebrow}</span>
      <h1 className="text-balance text-4xl md:text-5xl leading-[1.1] tracking-tight">
        {d.title}
      </h1>
      <p className="max-w-md text-muted-foreground leading-relaxed">{d.body}</p>
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 border border-foreground/80 px-5 h-11 text-sm hover:bg-foreground hover:text-background transition-colors"
        >
          {d.button}
        </Link>
      </div>
    </div>
  );
}
