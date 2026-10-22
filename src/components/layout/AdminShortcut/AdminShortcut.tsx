import { hasAdminSession } from "@/lib/dal";
import AdminShortcutLink from "./AdminShortcutLink";

// Rendered on the server, so visitors never receive it: it only exists in the page for a signed-in admin.
// Reading the session is request-time work, so the layout wraps this in <Suspense> and the rest of the page stays static.
export default async function AdminShortcut() {
  if (!(await hasAdminSession())) return null;
  return <AdminShortcutLink />;
}
