-- DropIndex
DROP INDEX "Photo_category_row_position_idx";

-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "row",
DROP COLUMN "position",
ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "Photo_category_createdAt_idx" ON "Photo"("category", "createdAt");
