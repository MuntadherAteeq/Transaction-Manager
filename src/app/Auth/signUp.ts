"use server"
import type { SignUpSchema } from "@/components/SignUpTab"
import { z } from "zod"
import prisma from "../Library/prisma"
import argon2 from "argon2"

export const signUp = async (values: z.infer<typeof SignUpSchema>) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: values.email },
    })
    if (user) return { error: "User already exists", success: false }

    await prisma.user.create({
      data: {
        email: values.email,
        password: await argon2.hash(values.password),
      },
    })
  } catch (error) {
    return { error: "An error occurred", success: false }
  }
  return { error: "", success: true }
}
