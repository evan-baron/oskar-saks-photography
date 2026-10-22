import { contactTopics } from "@/lib/contentSchema";
import { getServicesContent } from "@/lib/siteContent";
import Contact from "./Contact";

// The form's topics follow the services list, which the admin can edit.
export default async function ContactSection() {
  const { items } = await getServicesContent();
  return <Contact topics={contactTopics(items)} />;
}
