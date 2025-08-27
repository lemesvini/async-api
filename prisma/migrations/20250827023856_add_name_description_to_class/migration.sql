/*
  Warnings:

  - Added the required column `name` to the `classes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."classes" ADD COLUMN     "description" TEXT,
ADD COLUMN     "name" TEXT NOT NULL;
