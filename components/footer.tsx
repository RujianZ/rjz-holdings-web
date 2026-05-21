import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-32 border-t border-border">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-16 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5 flex flex-col gap-4">
          <div className="inline-flex items-center gap-3">
            <span className="relative inline-block h-3 w-3">
              <span className="absolute inset-0 bg-foreground" />
              <span className="absolute -right-1 -top-1 h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span className="mono-label text-foreground">
              RJZ <span className="text-muted-foreground">/ HOLDINGS</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            A Delaware-registered holding company for software, capital, and ideas.
          </p>
        </div>

        <div className="md:col-span-3 flex flex-col gap-3">
          <span className="mono-label text-muted-foreground">Navigate</span>
          <ul className="flex flex-col gap-2 text-sm">
            <li><Link href="/ventures" className="hover:text-accent transition-colors">Ventures</Link></li>
            <li><Link href="/about" className="hover:text-accent transition-colors">About</Link></li>
            <li><Link href="/journal" className="hover:text-accent transition-colors">Journal</Link></li>
            <li><Link href="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4 flex flex-col gap-3">
          <span className="mono-label text-muted-foreground">Registered</span>
          <p className="text-sm leading-relaxed">
            Delaware, USA<br />
            Est. 2026
          </p>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <span className="mono-label text-muted-foreground">
            © {year} RJZ Holdings LLC
          </span>
          <span className="mono-label text-muted-foreground">
            N 42.1875° · W 71.3070°
          </span>
        </div>
      </div>
    </footer>
  );
}
