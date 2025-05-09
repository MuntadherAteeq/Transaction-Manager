"use server";

import { getAccount } from "@/app/Auth/auth.actions";

export async function getJobCards() {
  try {
    const jobCards = await prisma.jobCard.findMany({});
    return jobCards;
  } catch (error) {
    throw new Error("Failed to fetch job cards");
  }
}

export async function deleteJobCard(id: number) {
  const account = await getAccount();
  if (!account) throw new Error("Unauthorized: No account found");
  if (!account.role.includes("Admin"))
    throw new Error("Unauthorized: Insufficient role");
  try {
    const deletedJobCard = await prisma.jobCard.delete({
      where: { id },
    });
    return { success: true };
  } catch (error) {
    throw new Error("Failed to delete job card");
  }
}
