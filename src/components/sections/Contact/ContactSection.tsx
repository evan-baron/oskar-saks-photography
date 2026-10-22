import { contactTopics } from "@/lib/contentSchema";
import { getContactContent, getServicesContent, renderTitle } from "@/lib/siteContent";
import Contact from "./Contact";

// The copy, contact details and form topics (which follow the services list) are all editable in the admin.
export default async function ContactSection() {
  const [{ items }, contact] = await Promise.all([getServicesContent(), getContactContent()]);
  return <Contact topics={contactTopics(items)} content={{ ...contact, title: renderTitle(contact.title) }} />;
}
