/*
  Warnings:

  - Made the column `menuId` on table `Folder` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Folder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "menuId" INTEGER NOT NULL,
    CONSTRAINT "Folder_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Folder" ("code", "id", "menuId", "name") SELECT "code", "id", "menuId", "name" FROM "Folder";
DROP TABLE "Folder";
ALTER TABLE "new_Folder" RENAME TO "Folder";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
