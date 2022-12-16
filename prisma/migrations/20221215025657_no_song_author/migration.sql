/*
  Warnings:

  - You are about to drop the column `author` on the `Song` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Song" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "defaultArrangementId" INTEGER NOT NULL,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Song" ("defaultArrangementId", "id", "name") SELECT "defaultArrangementId", "id", "name" FROM "Song";
DROP TABLE "Song";
ALTER TABLE "new_Song" RENAME TO "Song";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
