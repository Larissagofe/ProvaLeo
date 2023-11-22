/*
  Warnings:

  - You are about to drop the `massas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sabor` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `massa` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recheio` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sabor` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "massas";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "sabor";
PRAGMA foreign_keys=on;

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
    "recheio" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL
);
INSERT INTO "new_product" ("created_at", "description", "id", "price", "quantity", "type_price") SELECT "created_at", "description", "id", "price", "quantity", "type_price" FROM "product";
DROP TABLE "product";
ALTER TABLE "new_product" RENAME TO "product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
