/*
  Warnings:

  - Made the column `menu_type_id` on table `Menu` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Menu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "parent_menu_id" INTEGER,
    "menu_type_id" INTEGER NOT NULL,
    CONSTRAINT "Menu_parent_menu_id_fkey" FOREIGN KEY ("parent_menu_id") REFERENCES "Menu" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Menu_menu_type_id_fkey" FOREIGN KEY ("menu_type_id") REFERENCES "Folder" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Menu" ("id", "menu_type_id", "name", "parent_menu_id") SELECT "id", "menu_type_id", "name", "parent_menu_id" FROM "Menu";
DROP TABLE "Menu";
ALTER TABLE "new_Menu" RENAME TO "Menu";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
