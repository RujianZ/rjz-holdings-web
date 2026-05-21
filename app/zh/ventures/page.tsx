import type { Metadata } from "next";
import { VenturesListPage } from "@/components/pages/ventures-list-page";
import { zhDict } from "@/lib/i18n";

export const metadata: Metadata = {
  title: zhDict.ventures.metaTitle,
  description: zhDict.ventures.metaDescription,
};

export default function Page() {
  return <VenturesListPage dict={zhDict} />;
}
