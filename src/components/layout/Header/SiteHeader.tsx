import { getContactContent } from "@/lib/siteContent";
import Header from "./Header";

// The header is a client component, so the editable Instagram handle is read here and passed down.
export default async function SiteHeader() {
  const { instagram } = await getContactContent();
  return <Header instagram={instagram} />;
}
