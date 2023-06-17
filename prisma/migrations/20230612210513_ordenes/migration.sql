/*
  Warnings:

  - You are about to drop the column `icono` on the `orden` table. All the data in the column will be lost.
  - Added the required column `fecha` to the `Orden` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orden` DROP COLUMN `icono`,
    ADD COLUMN `fecha` VARCHAR(191) NOT NULL;
