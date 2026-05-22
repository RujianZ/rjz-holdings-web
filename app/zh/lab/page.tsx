import type { Metadata } from "next";
import { LabListPage } from "@/components/pages/lab-list-page";
import { zhDict } from "@/lib/i18n";

export const metadata: Metadata = {
  title: zhDict.lab.metaTitle,
  description: zhDict.lab.metaDescription,
};

export default function Page() {
  return <LabListPage dict={zhDict} />;
}
