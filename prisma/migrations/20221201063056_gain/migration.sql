-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Track" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "songId" INTEGER NOT NULL,
    "gain" INTEGER NOT NULL DEFAULT 1,
    "pan" INTEGER NOT NULL DEFAULT 0,
    "muted" BOOLEAN NOT NULL DEFAULT false,
    "soloed" BOOLEAN NOT NULL DEFAULT false,
    "type" TEXT,
    "url" TEXT,
    CONSTRAINT "Track_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Track" ("id", "muted", "name", "pan", "soloed", "songId", "type", "url") SELECT "id", "muted", "name", "pan", "soloed", "songId", "type", "url" FROM "Track";
DROP TABLE "Track";
ALTER TABLE "new_Track" RENAME TO "Track";
CREATE UNIQUE INDEX "Track_name_key" ON "Track"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
