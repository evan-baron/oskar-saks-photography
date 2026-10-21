import "dotenv/config";
import { defineConfig } from "prisma/config";

// Migrations need a direct (non-pooled) connection; the app itself uses the pooled DATABASE_URL.
// Neon's direct host is the pooled host without "-pooler", so it can be derived when the unpooled var is absent.
function migrationUrl() {
  if (process.env.DATABASE_URL_UNPOOLED) return process.env.DATABASE_URL_UNPOOLED;
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  return url.replace("-pooler.", ".");
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: { url: migrationUrl() },
});
