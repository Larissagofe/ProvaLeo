/*
  Warnings:

  - You are about to drop the column `recheio` on the `product` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "type_price" TEXT NOT NULL,
    "massa" TEXT NOT NULL,
    "sabor" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL
);
INSERT INTO "new_product" ("created_at", "description", "id", "massa", "price", "quantity", "sabor", "type_price") SELECT "created_at", "description", "id", "massa", "price", "quantity", "sabor", "type_price" FROM "product";
DROP TABLE "product";
ALTER TABLE "new_product" RENAME TO "product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
