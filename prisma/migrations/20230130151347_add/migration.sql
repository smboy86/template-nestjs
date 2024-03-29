-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "hashRefreshToken" TEXT,
    "regDt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modDt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("email", "hashRefreshToken", "id", "modDt", "password", "regDt") SELECT "email", "hashRefreshToken", "id", "modDt", "password", "regDt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
