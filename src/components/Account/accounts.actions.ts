"use server";
export async function getAccounts() {
  const users = await prisma.user.findMany({});
  return users;
}
