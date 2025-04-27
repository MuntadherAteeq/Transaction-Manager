"use server";

import { Account } from "@prisma/client";

export async function getAccounts(): Promise<Account[]> {
  const account = await prisma.account.findMany({});
  return account;
}

export async function getAccountByEmail(
  email: string
): Promise<Account | null> {
  const account = await prisma.account.findUnique({
    where: { email: email },
  });
  return account;
}

export async function createAccount(data: Account) {
  const account = await getAccountByEmail(data.email);
  if (account) {
    return { error: "Account already exists" };
  }
  const newAccount = await prisma.account.create({
    data: {
      name: data.name,
      email: data.email,
      image: data.image,
      password: data.password,
      role: data.role,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  return newAccount;
}
