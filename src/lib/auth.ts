import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider:
      (process.env.DATABASE_PROVIDER as
        | "sqlite"
        | "cockroachdb"
        | "mysql"
        | "postgresql"
        | "sqlserver"
        | "mongodb") || "sqlite", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
});
