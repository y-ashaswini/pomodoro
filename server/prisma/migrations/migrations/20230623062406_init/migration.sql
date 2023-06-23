/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Pomodorouser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Pomodorouser_email_key" ON "Pomodorouser"("email");
