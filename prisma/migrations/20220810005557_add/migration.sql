/*
  Warnings:

  - A unique constraint covering the columns `[AppName]` on the table `AppInfo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `AppName` to the `AppInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modDt` to the `AppInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `AppInfo` ADD COLUMN `AppName` VARCHAR(191) NOT NULL,
    ADD COLUMN `modDt` DATETIME(3) NOT NULL,
    ADD COLUMN `regDt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX `AppInfo_AppName_key` ON `AppInfo`(`AppName`);
