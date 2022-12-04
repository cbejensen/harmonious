/*
  Warnings:

  - You are about to alter the column `pan` on the `Track` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `volume` on the `Track` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

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
    "volume" REAL NOT NULL DEFAULT 1,
    "src" TEXT,
    "type" TEXT,
    CONSTRAINT "Track_arrangementId_fkey" FOREIGN KEY ("arrangementId") REFERENCES "Arrangement" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Track" ("arrangementId", "id", "muted", "name", "pan", "soloed", "src", "type", "volume") SELECT "arrangementId", "id", "muted", "name", "pan", "soloed", "src", "type", "volume" FROM "Track";
DROP TABLE "Track";
ALTER TABLE "new_Track" RENAME TO "Track";
CREATE UNIQUE INDEX "Track_name_key" ON "Track"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
