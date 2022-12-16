-- AlterTable
ALTER TABLE "Arrangement" ADD COLUMN "tempo" INTEGER;
ALTER TABLE "Arrangement" ADD COLUMN "timeSignature" TEXT;

-- AlterTable
ALTER TABLE "Track" ADD COLUMN "notation" TEXT;
