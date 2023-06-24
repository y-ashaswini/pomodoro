import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const typeDefs = `
      type Query {
        pomodorotasks: [Pomodorotask!]!
        pomodorousers: [Pomodorouser!]!
                
        findUser(id: ID): Pomodorouser!
        findTask(id: ID): Pomodorotask!
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
        by_user: Pomodorouser
      }

      type Pomodorouser {
        id: ID
        email: String!
        tasks: [Pomodorotask]
      }     
      
      
      type Mutation {
        
        createUser(email: String!): Pomodorouser!

        createTask(
        id: ID
          title: String!
          description: String!
          pomodoros_required: Int!
          pomodoros_completed: Int!
          date_started: String
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

        deleteTask(id: ID): Pomodorotask!
        
        deleteUser(id: ID): Pomodorouser!

      }

    `;

export const resolvers = {
  Query: {
    pomodorotasks: () => {
      return prisma.pomodorotask.findMany({
        include: {
          by_user: true,
        },
      });
    },
    pomodorousers: () => {
      return prisma.pomodorouser.findMany({
        include: {
          tasks: true,
        },
      });
    },

    findUser: (root, args, _) => {
      const id = +args.id;
      return prisma.pomodorouser.findFirst({
        where: {
          id,
        },
        include: {
          tasks: true,
        },
      });
    },

    findTask: (root, args, _) => {
      const id = +args.id;
      return prisma.pomodorotask.findFirst({
        where: {
          id,
        },
        include: {
          by_user: true,
        },
      });
    },
  },
  Mutation: {
    createTask: (root, args, _) => {
      return prisma.pomodorotask.create({
        data: {
          title: args.title,
          description: args.title,
          pomodoros_required: args.pomodoros_required,
          pomodoros_completed: args.pomodoros_completed,
          date_started: new Date().toISOString(),
          due_date: args.due_date,
          priority: args.priority,
          is_complete: args.is_complete,
          by_user_id: args.by_user_id,
        },
      });
    },

    createUser: (root, args, _) => {
      return prisma.pomodorouser.create({
        data: {
          email: args.email,
        },
      });
    },

    deleteTask: (root, args, _) => {
      const id = parseInt(args.id);
      return prisma.pomodorotask.delete({
        where: {
          id,
        },
      });
    },

    deleteUser: (root, args, _) => {
      const id = parseInt(args.id);
      return prisma.pomodorouser.delete({
        where: {
          id,
        },
      });
    },
  },
};
