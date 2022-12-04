-- CreateTable
CREATE TABLE "Song" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "author" TEXT,
    "defaultArrangementId" INTEGER NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Arrangement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "songId" INTEGER NOT NULL,
    "author" TEXT,
    CONSTRAINT "Arrangement_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Track" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "arrangementId" INTEGER NOT NULL,
    "muted" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "pan" INTEGER NOT NULL DEFAULT 0,
    "soloed" BOOLEAN NOT NULL DEFAULT false,
    "volume" INTEGER NOT NULL DEFAULT 1,
    "src" TEXT,
    "type" TEXT,
    CONSTRAINT "Track_arrangementId_fkey" FOREIGN KEY ("arrangementId") REFERENCES "Arrangement" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Track_name_key" ON "Track"("name");
