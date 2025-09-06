/*
  Warnings:

  - You are about to drop the column `currentModule` on the `classes` table. All the data in the column will be lost.
  - You are about to drop the column `hourPrice` on the `classes` table. All the data in the column will be lost.
  - You are about to drop the column `monthlyHours` on the `classes` table. All the data in the column will be lost.
  - You are about to drop the column `moduleId` on the `contents` table. All the data in the column will be lost.
  - You are about to drop the column `studentsGuideUrl` on the `contents` table. All the data in the column will be lost.
  - You are about to drop the `modules` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[module,order]` on the table `contents` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dayOfWeek` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `module` to the `contents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `contents` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."AttendanceStatus" AS ENUM ('PRESENT', 'ABSENT', 'LATE', 'EXCUSED');

-- CreateEnum
CREATE TYPE "public"."PaymentStatus" AS ENUM ('PENDING', 'PAID', 'OVERDUE', 'CANCELLED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "public"."CEFRLevel" ADD VALUE 'CONVERSATION_A1';
ALTER TYPE "public"."CEFRLevel" ADD VALUE 'CONVERSATION_A2';
ALTER TYPE "public"."CEFRLevel" ADD VALUE 'CONVERSATION_B1';
ALTER TYPE "public"."CEFRLevel" ADD VALUE 'CONVERSATION_B2';
ALTER TYPE "public"."CEFRLevel" ADD VALUE 'CONVERSATION_C1';
ALTER TYPE "public"."CEFRLevel" ADD VALUE 'CONVERSATION_C2';

-- DropForeignKey
ALTER TABLE "public"."class_enrollments" DROP CONSTRAINT "class_enrollments_studentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."classes" DROP CONSTRAINT "classes_consultantId_fkey";

-- DropForeignKey
ALTER TABLE "public"."contents" DROP CONSTRAINT "contents_moduleId_fkey";

-- AlterTable
ALTER TABLE "public"."class_enrollments" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "public"."classes" DROP COLUMN "currentModule",
DROP COLUMN "hourPrice",
DROP COLUMN "monthlyHours",
ADD COLUMN     "dayOfWeek" INTEGER NOT NULL,
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "level" "public"."CEFRLevel" NOT NULL,
ADD COLUMN     "maxStudents" INTEGER NOT NULL DEFAULT 10,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "consultantId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."contents" DROP COLUMN "moduleId",
DROP COLUMN "studentsGuideUrl",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "module" "public"."CEFRLevel" NOT NULL,
ADD COLUMN     "order" INTEGER NOT NULL,
ADD COLUMN     "studentsPdfUrl" TEXT;

-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "address" TEXT,
ADD COLUMN     "birthDate" TIMESTAMP(3),
ADD COLUMN     "emergencyContact" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "phone" TEXT;

-- DropTable
DROP TABLE "public"."modules";

-- CreateTable
CREATE TABLE "public"."class_lessons" (
    "id" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "lessonDate" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "wasCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "class_lessons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."attendance" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "status" "public"."AttendanceStatus" NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."payments" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "classId" TEXT,
    "amount" DECIMAL(10,2) NOT NULL,
    "description" TEXT NOT NULL,
    "status" "public"."PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "dueDate" TIMESTAMP(3) NOT NULL,
    "paidDate" TIMESTAMP(3),
    "referenceMonth" INTEGER NOT NULL,
    "referenceYear" INTEGER NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "attendance_studentId_lessonId_key" ON "public"."attendance"("studentId", "lessonId");

-- CreateIndex
CREATE UNIQUE INDEX "contents_module_order_key" ON "public"."contents"("module", "order");

-- AddForeignKey
ALTER TABLE "public"."classes" ADD CONSTRAINT "classes_consultantId_fkey" FOREIGN KEY ("consultantId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."class_enrollments" ADD CONSTRAINT "class_enrollments_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."class_lessons" ADD CONSTRAINT "class_lessons_classId_fkey" FOREIGN KEY ("classId") REFERENCES "public"."classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."class_lessons" ADD CONSTRAINT "class_lessons_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "public"."contents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."attendance" ADD CONSTRAINT "attendance_classId_fkey" FOREIGN KEY ("classId") REFERENCES "public"."classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."attendance" ADD CONSTRAINT "attendance_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "public"."class_lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."attendance" ADD CONSTRAINT "attendance_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."payments" ADD CONSTRAINT "payments_classId_fkey" FOREIGN KEY ("classId") REFERENCES "public"."classes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."payments" ADD CONSTRAINT "payments_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
