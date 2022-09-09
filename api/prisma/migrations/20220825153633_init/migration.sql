-- CreateTable
CREATE TABLE "Menu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "parent_menu_id" INTEGER,
    CONSTRAINT "Menu_parent_menu_id_fkey" FOREIGN KEY ("parent_menu_id") REFERENCES "Menu" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
