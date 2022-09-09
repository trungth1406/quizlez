/*
  Warnings:

  - You are about to drop the column `menu_type_id` on the `Menu` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Menu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "parent_menu_id" INTEGER,
    CONSTRAINT "Menu_parent_menu_id_fkey" FOREIGN KEY ("parent_menu_id") REFERENCES "Menu" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Menu" ("id", "name", "parent_menu_id") SELECT "id", "name", "parent_menu_id" FROM "Menu";
DROP TABLE "Menu";
ALTER TABLE "new_Menu" RENAME TO "Menu";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
