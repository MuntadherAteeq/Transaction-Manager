"use server";

import { User } from "@prisma/client";

export async function getAccounts(): Promise<User[]> {
  const users = await prisma.user.findMany({});
  return users;
}
