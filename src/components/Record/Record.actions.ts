"use server";

import prisma from "@/lib/prisma";
import { getUser } from "@/app/Auth/auth.actions";

export async function getRecords() {
  const user = await getUser();
  return user ? await prisma.record.findMany({}) : undefined;
}
