-- DropIndex
DROP INDEX "Photo_category_createdAt_idx";

-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "position" INTEGER NOT NULL DEFAULT 0;

-- Backfill: keep today's order (upload order) within each gallery
UPDATE "Photo" AS p SET "position" = r.rn
FROM (
  SELECT id, ROW_NUMBER() OVER (PARTITION BY category ORDER BY "createdAt" ASC, id ASC) - 1 AS rn FROM "Photo"
) AS r
WHERE p.id = r.id;

-- CreateIndex
CREATE INDEX "Photo_category_position_idx" ON "Photo"("category", "position");
