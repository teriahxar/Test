CREATE TABLE "Universe" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

CREATE TABLE "Release" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "universeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "releaseDate" DATETIME NOT NULL,
    "themeAccent" TEXT,
    "themeBgStyle" TEXT,
    "stickerSet" TEXT,
    CONSTRAINT "Release_universeId_fkey" FOREIGN KEY ("universeId") REFERENCES "Universe" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "Item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "releaseId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "rarity" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Item_releaseId_fkey" FOREIGN KEY ("releaseId") REFERENCES "Release" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "PricePoint" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "itemId" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "condition" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL,
    CONSTRAINT "PricePoint_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "Listing" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "itemId" TEXT NOT NULL,
    "marketplace" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "condition" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL,
    CONSTRAINT "Listing_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "UserPref" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL
);

CREATE UNIQUE INDEX "Universe_slug_key" ON "Universe"("slug");
CREATE UNIQUE INDEX "Release_slug_key" ON "Release"("slug");
CREATE INDEX "Release_universeId_idx" ON "Release"("universeId");
CREATE UNIQUE INDEX "Item_slug_key" ON "Item"("slug");
CREATE INDEX "Item_releaseId_idx" ON "Item"("releaseId");
CREATE INDEX "PricePoint_itemId_timestamp_idx" ON "PricePoint"("itemId", "timestamp");
CREATE INDEX "Listing_itemId_timestamp_idx" ON "Listing"("itemId", "timestamp");
CREATE UNIQUE INDEX "UserPref_key_key" ON "UserPref"("key");
