-- CreateTable
CREATE TABLE "TestSet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "folder_id" INTEGER NOT NULL,
    CONSTRAINT "TestSet_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "Folder" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Term" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "term_value" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "testSetId" INTEGER,
    CONSTRAINT "Term_testSetId_fkey" FOREIGN KEY ("testSetId") REFERENCES "TestSet" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
