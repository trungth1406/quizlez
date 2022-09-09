-- CreateTable
CREATE TABLE "Folder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "menuId" INTEGER,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    CONSTRAINT "Folder_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Menu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "parent_menu_id" INTEGER,
    "menu_type_id" INTEGER,
    CONSTRAINT "Menu_parent_menu_id_fkey" FOREIGN KEY ("parent_menu_id") REFERENCES "Menu" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Menu_menu_type_id_fkey" FOREIGN KEY ("menu_type_id") REFERENCES "Folder" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Menu" ("id", "name", "parent_menu_id") SELECT "id", "name", "parent_menu_id" FROM "Menu";
DROP TABLE "Menu";
ALTER TABLE "new_Menu" RENAME TO "Menu";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
