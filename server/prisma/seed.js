import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

async function main() {
  // const newuser = await prisma.pomodorouser.create({
  //   data: {
  //     email: `animalplanet@gmail.com`,
  //   },
  // });
  // console.log(`Created new user with email id: ${newuser.email}`);
  // const newtask = await prisma.pomodorotask.create({
  //   data: {
  //     title: "Whassup girls",
  //     description: "for the days when you're feeling pink",
  //     pomodoros_required: 2,
  //     pomodoros_completed: 0,
  //     due_date: "12-12-2021",
  //     priority: 1,
  //     is_complete: false,
  //     createdAt: new Date().toISOString(),
  //     updatedAt: new Date().toISOString(),
  //     by_user_id: newuser.id,
  //   },
  // });
  // console.log(
  //   `Created new task with title: ${newtask.title} and description: ${newtask.description}`
  // );

  const getData = await prisma.pomodorotask.findMany();
  console.log("data stored: ", getData);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
