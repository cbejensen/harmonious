/*
  Warnings:

  - You are about to drop the column `defaultNoteLength` on the `Track` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Track" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "arrangementId" INTEGER NOT NULL,
    "muted" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "shortName" TEXT,
    "pan" REAL NOT NULL DEFAULT 0,
    "soloed" BOOLEAN NOT NULL DEFAULT false,
    "src" TEXT,
    "type" TEXT NOT NULL DEFAULT 'Other',
    "volume" REAL NOT NULL DEFAULT 1,
    "clef" TEXT NOT NULL DEFAULT 'treble',
    "notation" TEXT,
    CONSTRAINT "Track_arrangementId_fkey" FOREIGN KEY ("arrangementId") REFERENCES "Arrangement" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Track" ("arrangementId", "clef", "id", "muted", "name", "notation", "pan", "shortName", "soloed", "src", "type", "volume") SELECT "arrangementId", "clef", "id", "muted", "name", "notation", "pan", "shortName", "soloed", "src", "type", "volume" FROM "Track";
DROP TABLE "Track";
ALTER TABLE "new_Track" RENAME TO "Track";
CREATE UNIQUE INDEX "Track_name_key" ON "Track"("name");
CREATE UNIQUE INDEX "Track_shortName_key" ON "Track"("shortName");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
