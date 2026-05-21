import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/about-page";
import { zhDict } from "@/lib/i18n";

export const metadata: Metadata = {
  title: zhDict.about.metaTitle,
  description: zhDict.about.metaDescription,
};

export default function Page() {
  return <AboutPage dict={zhDict} />;
}
