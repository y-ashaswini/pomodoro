-- AlterTable
ALTER TABLE "Pomodorotask" ALTER COLUMN "date_started" DROP DEFAULT,
ALTER COLUMN "date_started" SET DATA TYPE TEXT;
