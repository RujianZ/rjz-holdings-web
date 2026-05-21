import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10 py-24 md:py-32 flex flex-col gap-8 min-h-[60vh] justify-center">
      <span className="mono-label text-muted-foreground">Error / 404</span>
      <h1 className="text-balance text-4xl md:text-5xl leading-[1.1] tracking-tight">
        Nothing at this address.
      </h1>
      <p className="max-w-md text-muted-foreground leading-relaxed">
        The page you&apos;re looking for doesn&apos;t exist, or hasn&apos;t been
        built yet.
      </p>
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 border border-foreground/80 px-5 h-11 text-sm hover:bg-foreground hover:text-background transition-colors"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
