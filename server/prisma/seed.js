import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

async function main() {
  //   const newuser = await prisma.pomodorouser.create({
  //     data: {
  //       email: `testemail@gmail.com`,
  //     },
  //   });
  //   console.log(`Created new user with email id: ${newuser.email}`);
  //   const newtask = await prisma.pomodorotask.create({
  //     data: {
  //       title: "Mock Test",
  //       description:
  //         "mock test is the thing to be done animals are your only pets please remember it is the only way out of here. Find your way, your path lies in the very mirror you stare at every morning.",
  //       pomodoros_required: 2,
  //       pomodoros_completed: 0,
  //       date_started: "12-12-2020",
  //       due_date: "12-12-2021",
  //       priority: 1,
  //       is_complete: false,
  //       createdAt: new Date().toISOString(),
  //       updatedAt: new Date().toISOString(),
  //       by_user_id: newuser.id,
  //     },
  //   });
  //   console.log(
  //     `Created new task with title: ${newtask.title} and description: ${newtask.description}`
  //   );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
