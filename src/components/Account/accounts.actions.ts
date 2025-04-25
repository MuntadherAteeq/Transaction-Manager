"use server";

import { User } from "@prisma/client";

export async function getAccounts(): Promise<User[]> {
  const users = await prisma.user.findMany({});
  return users;
}

export async function getAccountByEmail(email: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { email: email },
  });
  return user;
}

export async function createAccount(data: User) {
  
  const account = await getAccountByEmail(data.email);
  if (account) {
    return { error: "Account already exists" };
  }
  const newAccount = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      image: data.image,
      password: data.password,
      roles: JSON.stringify(data.roles),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  return newAccount;
}
