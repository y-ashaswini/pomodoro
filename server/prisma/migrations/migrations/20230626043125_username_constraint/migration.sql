/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Pomodorouser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Pomodorouser_username_key" ON "Pomodorouser"("username");
