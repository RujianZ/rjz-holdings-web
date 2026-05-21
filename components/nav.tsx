"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const links = [
  { href: "/ventures", label: "Ventures" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-background/80 border-b border-border">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="group inline-flex items-center gap-3"
          aria-label="RJZ Holdings — Home"
        >
          <span className="relative inline-block h-3 w-3">
            <span className="absolute inset-0 bg-foreground" />
            <span className="absolute -right-1 -top-1 h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          <span className="mono-label text-foreground">
            RJZ <span className="text-muted-foreground">/ HOLDINGS</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 md:gap-2">
          {links.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "mono-label px-2 md:px-3 py-2 transition-colors",
                  active
                    ? "text-accent"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <span className="hidden md:inline-block mx-2 h-4 w-px bg-border" />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
