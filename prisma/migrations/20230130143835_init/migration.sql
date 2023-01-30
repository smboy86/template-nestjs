-- CreateTable
CREATE TABLE "AppInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "appName" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "regDt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modDt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "hashRefreshToken" TEXT,
    "regDt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modDt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "AppInfo_appName_key" ON "AppInfo"("appName");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
