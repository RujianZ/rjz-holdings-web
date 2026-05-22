"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "@/components/brand-mark";
import { enDict, zhDict } from "@/lib/i18n";

export function Footer() {
  const pathname = usePathname() || "/";
  const isZh = pathname === "/zh" || pathname.startsWith("/zh/");
  const dict = isZh ? zhDict : enDict;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-32 border-t border-border">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-16 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5 flex flex-col gap-4">
          <div className="inline-flex items-center gap-3">
            <BrandMark />
            <span className="mono-label text-foreground">
              RJZ <span className="text-muted-foreground">/ HOLDINGS</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            {dict.footer.blurb}
          </p>
        </div>

        <div className="md:col-span-3 flex flex-col gap-3">
          <span className="mono-label text-muted-foreground">
            {dict.footer.navLabel}
          </span>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <Link
                href={`${dict.prefix}/ventures`}
                className="hover:text-accent transition-colors"
              >
                {dict.nav.ventures}
              </Link>
            </li>
            <li>
              <Link
                href={`${dict.prefix}/lab`}
                className="hover:text-accent transition-colors"
              >
                {dict.nav.lab}
              </Link>
            </li>
            <li>
              <Link
                href={`${dict.prefix}/about`}
                className="hover:text-accent transition-colors"
              >
                {dict.nav.about}
              </Link>
            </li>
            <li>
              <Link
                href={`${dict.prefix}/contact`}
                className="hover:text-accent transition-colors"
              >
                {dict.nav.contact}
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-4 flex flex-col gap-3">
          <span className="mono-label text-muted-foreground">
            {dict.footer.registeredLabel}
          </span>
          <p className="text-sm leading-relaxed">
            {dict.footer.registeredA}
            <br />
            {dict.footer.registeredB}
          </p>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <span className="mono-label text-muted-foreground">
            © {year} {dict.footer.copyright}
          </span>
          <span className="mono-label text-muted-foreground">
            N 42.1875° · W 71.3070°
          </span>
        </div>
      </div>
    </footer>
  );
}
