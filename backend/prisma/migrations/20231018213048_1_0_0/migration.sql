/*
  Warnings:

  - Added the required column `type_price` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "type_price" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL
);
INSERT INTO "new_product" ("created_at", "description", "id", "price", "quantity") SELECT "created_at", "description", "id", "price", "quantity" FROM "product";
DROP TABLE "product";
ALTER TABLE "new_product" RENAME TO "product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
