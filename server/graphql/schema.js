import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const typeDefs = `
      type Query {
        pomodorotasks: [Pomodorotask!]!
        pomodorousers: [Pomodorouser!]!
      }

      type Pomodorotask {
        id: ID
        title: String!
        description: String!
        pomodoros_required: Int!
        pomodoros_completed: Int!
        date_started: String!
        due_date: String!
        priority: Int!
        is_complete: Boolean!
        by_user_id: Int!
      }

      type Pomodorouser {
        id: ID
        email: String!
        tasks: [Pomodorotask]
      }     
      
      
      type Mutation {
        createUser(email: String!): Pomodorouser!

        createTask(
        title: String!
        description: String!
        pomodoros_required: Int!
        pomodoros_completed: Int!
        date_started: String!
        due_date: String!
        priority: Int!
        is_complete: Boolean!
        by_user_id: Int!
        ): Pomodorotask!

        updateTask(
        id: ID
        title: String
        description: String
        pomodoros_required: Int
        pomodoros_completed: Int
        date_started: String
        due_date: String
        priority: Int
        is_complete: Boolean
        by_user_id: Int
        ): Pomodorotask!        

        deleteTask(id: ID!): Pomodorotask!
      }

    `;

export const resolvers = {
  Query: {
    pomodorotasks: () => {
      return prisma.pomodorotask.findMany();
    },
    pomodorousers: () => {
      return prisma.pomodorouser.findMany();
    },
  },
};
