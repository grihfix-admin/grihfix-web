import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ??
  new PrismaClient({
    // log: ["query"], // uncomment if you want to see SQL in dev
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}