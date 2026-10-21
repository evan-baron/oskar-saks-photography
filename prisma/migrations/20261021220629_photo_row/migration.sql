-- DropIndex
DROP INDEX "Photo_category_position_idx";

-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "row" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "Photo_category_row_position_idx" ON "Photo"("category", "row", "position");
