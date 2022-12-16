-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Arrangement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "songId" INTEGER NOT NULL,
    "author" TEXT,
    "key" TEXT NOT NULL DEFAULT 'C',
    "lyrics" TEXT,
    "tempo" INTEGER NOT NULL DEFAULT 120,
    "timeSignature" TEXT NOT NULL DEFAULT '4/4',
    "sequence" TEXT,
    CONSTRAINT "Arrangement_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Arrangement" ("author", "id", "name", "songId", "tempo", "timeSignature") SELECT "author", "id", "name", "songId", coalesce("tempo", 120) AS "tempo", coalesce("timeSignature", '4/4') AS "timeSignature" FROM "Arrangement";
DROP TABLE "Arrangement";
ALTER TABLE "new_Arrangement" RENAME TO "Arrangement";
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
    "defaultNoteLength" TEXT NOT NULL DEFAULT '1/4',
    "notation" TEXT,
    CONSTRAINT "Track_arrangementId_fkey" FOREIGN KEY ("arrangementId") REFERENCES "Arrangement" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Track" ("arrangementId", "id", "muted", "name", "notation", "pan", "soloed", "src", "type", "volume") SELECT "arrangementId", "id", "muted", "name", "notation", "pan", "soloed", "src", "type", "volume" FROM "Track";
DROP TABLE "Track";
ALTER TABLE "new_Track" RENAME TO "Track";
CREATE UNIQUE INDEX "Track_name_key" ON "Track"("name");
CREATE UNIQUE INDEX "Track_shortName_key" ON "Track"("shortName");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
