import type { Metadata } from "next";
import { JournalListPage } from "@/components/pages/journal-list-page";
import { zhDict } from "@/lib/i18n";

export const metadata: Metadata = {
  title: zhDict.journal.metaTitle,
  description: zhDict.journal.metaDescription,
};

export default function Page() {
  return <JournalListPage dict={zhDict} />;
}
