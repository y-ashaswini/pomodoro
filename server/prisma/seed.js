import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

async function main() {
  // const newuser = await prisma.pomodorouser.create({
  //   data: {
  //     email: `yashaswini.shivathaya2021@vitstudent.ac.in`,
  //     username: "bigfoot",
  //     password: "hello123",
  //   },
  // });
  // console.log(`Created new user with email id: ${newuser.email}`);
  // const newtask = await prisma.pomodorotask.create({
  //   data: {
  //     title: "task two eifuheifhwf",
  //     description: "iuedheiuhej iuh iehdeiu",
  //     pomodoros_required: 5,
  //     pomodoros_completed: 0,
  //     date_started: "11/12/2023",
  //     due_date: "12/12/2023",
  //     priority: 3,
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
