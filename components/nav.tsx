"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { BrandMark } from "@/components/brand-mark";
import { enDict, zhDict } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function Nav() {
  const pathname = usePathname() || "/";
  const isZh = pathname === "/zh" || pathname.startsWith("/zh/");
  const dict = isZh ? zhDict : enDict;

  const links = [
    { href: `${dict.prefix}/ventures`, label: dict.nav.ventures },
    { href: `${dict.prefix}/about`, label: dict.nav.about },
    { href: `${dict.prefix}/journal`, label: dict.nav.journal },
    { href: `${dict.prefix}/contact`, label: dict.nav.contact },
  ];

  const altHref = computeAltHref(pathname, isZh);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-background/80 border-b border-border">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 h-16 flex items-center justify-between">
        <Link
          href={dict.prefix || "/"}
          className="group inline-flex items-center gap-3"
          aria-label="RJZ Holdings — Home"
        >
          <BrandMark />
          <span className="mono-label text-foreground">
            RJZ <span className="text-muted-foreground">/ HOLDINGS</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 md:gap-2">
          {links.map((link) => {
            const active = isActive(pathname, link.href);
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
          <Link
            href={altHref}
            className="mono-label px-2 md:px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={isZh ? "Switch to English" : "切换为中文"}
          >
            {dict.nav.switchTo}
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

function isActive(pathname: string, href: string): boolean {
  if (href === "/" || href === "/zh") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function computeAltHref(pathname: string, isZh: boolean): string {
  if (isZh) {
    // /zh/foo → /foo, /zh → /
    if (pathname === "/zh") return "/";
    return pathname.replace(/^\/zh/, "") || "/";
  }
  // /foo → /zh/foo, / → /zh
  if (pathname === "/") return "/zh";
  return `/zh${pathname}`;
}
