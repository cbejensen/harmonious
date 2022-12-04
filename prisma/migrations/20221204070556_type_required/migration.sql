/*
  Warnings:

  - Made the column `type` on table `Track` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Track" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "arrangementId" INTEGER NOT NULL,
    "muted" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "pan" REAL NOT NULL DEFAULT 0,
    "soloed" BOOLEAN NOT NULL DEFAULT false,
    "src" TEXT NOT NULL,
    "volume" REAL NOT NULL DEFAULT 1,
    "type" TEXT NOT NULL,
    CONSTRAINT "Track_arrangementId_fkey" FOREIGN KEY ("arrangementId") REFERENCES "Arrangement" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Track" ("arrangementId", "id", "muted", "name", "pan", "soloed", "src", "type", "volume") SELECT "arrangementId", "id", "muted", "name", "pan", "soloed", "src", "type", "volume" FROM "Track";
DROP TABLE "Track";
ALTER TABLE "new_Track" RENAME TO "Track";
CREATE UNIQUE INDEX "Track_name_key" ON "Track"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
