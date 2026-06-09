import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { MotionRoot } from "@/components/motion-config";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "RJZ Holdings",
    template: "%s — RJZ Holdings",
  },
  description:
    "A holding company for software, capital, and ideas. Delaware-registered, est. 2026.",
  metadataBase: new URL("https://rjzholdings.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <script
          dangerouslySetInnerHTML={{
            __html:
              "globalThis.__name=globalThis.__name||((target)=>target);",
          }}
        />
        <ThemeProvider>
          <MotionRoot>
            <Nav />
            <main className="flex-1">{children}</main>
            <Footer />
          </MotionRoot>
        </ThemeProvider>
      </body>
    </html>
  );
}
