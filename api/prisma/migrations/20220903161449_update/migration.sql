/*
  Warnings:

  - You are about to drop the column `description` on the `Term` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `Term` table. All the data in the column will be lost.
  - You are about to drop the column `term_value` on the `Term` table. All the data in the column will be lost.
  - Added the required column `definition` to the `Term` table without a default value. This is not possible if the table is not empty.
  - Added the required column `definition_lang` to the `Term` table without a default value. This is not possible if the table is not empty.
  - Added the required column `term` to the `Term` table without a default value. This is not possible if the table is not empty.
  - Added the required column `term_lang` to the `Term` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Term" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "term" TEXT NOT NULL,
    "term_lang" TEXT NOT NULL,
    "definition" TEXT NOT NULL,
    "definition_lang" TEXT NOT NULL,
    "testSetId" INTEGER,
    CONSTRAINT "Term_testSetId_fkey" FOREIGN KEY ("testSetId") REFERENCES "TestSet" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Term" ("id", "testSetId") SELECT "id", "testSetId" FROM "Term";
DROP TABLE "Term";
ALTER TABLE "new_Term" RENAME TO "Term";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
