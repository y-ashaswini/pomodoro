-- CreateTable
CREATE TABLE "Pomodorotask" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "pomodoros_required" INTEGER NOT NULL,
    "pomodoros_completed" INTEGER NOT NULL,
    "date_started" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "due_date" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,
    "is_complete" BOOLEAN NOT NULL,
    "pomodorouser" INTEGER NOT NULL,

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
ALTER TABLE "Pomodorotask" ADD CONSTRAINT "Pomodorotask_pomodorouser_fkey" FOREIGN KEY ("pomodorouser") REFERENCES "Pomodorouser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
