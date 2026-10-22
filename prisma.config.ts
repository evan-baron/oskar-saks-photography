import "dotenv/config";
import { defineConfig } from "prisma/config";

// Migrations need a direct (non-pooled) connection; the app itself uses the pooled DATABASE_URL.
// Neon's direct host is the pooled host without "-pooler", so it can be derived when the unpooled var is absent.
// Missing is fine for `prisma generate` (which runs on install, where the database variables may not exist yet); commands that
// connect will report the missing URL themselves.
function migrationUrl() {
  if (process.env.DATABASE_URL_UNPOOLED) return process.env.DATABASE_URL_UNPOOLED;
  return process.env.DATABASE_URL?.replace("-pooler.", ".");
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: { url: migrationUrl() },
});
