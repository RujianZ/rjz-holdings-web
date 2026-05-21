import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/contact-page";
import { zhDict } from "@/lib/i18n";

export const metadata: Metadata = {
  title: zhDict.contact.metaTitle,
  description: zhDict.contact.metaDescription,
};

export default function Page() {
  return <ContactPage dict={zhDict} />;
}
