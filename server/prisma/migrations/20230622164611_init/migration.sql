-- CreateTable
CREATE TABLE "Pomodorotask" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "pomodoros_required" INTEGER NOT NULL,
    "pomodoros_completed" INTEGER NOT NULL,
    "date_started" TEXT NOT NULL,
    "due_date" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,
    "is_complete" BOOLEAN NOT NULL,
    "by_user_id" INTEGER NOT NULL,

    CONSTRAINT "Pomodorotask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pomodorouser" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Pomodorouser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pomodorotask" ADD CONSTRAINT "Pomodorotask_by_user_id_fkey" FOREIGN KEY ("by_user_id") REFERENCES "Pomodorouser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
