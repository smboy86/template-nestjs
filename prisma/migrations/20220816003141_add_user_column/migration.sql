/*
  Warnings:

  - Added the required column `modDt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `modDt` DATETIME(3) NOT NULL,
    ADD COLUMN `regDt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
