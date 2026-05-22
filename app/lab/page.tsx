import type { Metadata } from "next";
import { LabListPage } from "@/components/pages/lab-list-page";
import { enDict } from "@/lib/i18n";

export const metadata: Metadata = {
  title: enDict.lab.metaTitle,
  description: enDict.lab.metaDescription,
};

export default function Page() {
  return <LabListPage dict={enDict} />;
}
