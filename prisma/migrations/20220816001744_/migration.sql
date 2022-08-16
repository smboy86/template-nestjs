/*
  Warnings:

  - You are about to drop the column `AppName` on the `AppInfo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[appName]` on the table `AppInfo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `appName` to the `AppInfo` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `AppInfo_AppName_key` ON `AppInfo`;

-- AlterTable
ALTER TABLE `AppInfo` DROP COLUMN `AppName`,
    ADD COLUMN `appName` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `AppInfo_appName_key` ON `AppInfo`(`appName`);
