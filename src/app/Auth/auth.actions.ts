"use server"
import { z } from "zod"
import prisma from "../Library/prisma"
import { SignInSchema } from "@/components/SignInTab"
import argon2 from "argon2"
import { SignUpSchema } from "@/components/SignUpTab"

export const signIn = async (values: z.infer<typeof SignInSchema>) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: values.email },
    })
    if (!user) return { error: "User does not exist", success: false }
    const isValid = await argon2.verify(user.password, values.password)
    if (user.email === values.email && isValid)
      return { error: "", success: true }
  } catch (error) {
    return { error: "An error occurred", success: false }
  }
  return { error: "Email or Password are Incorrect", success: false }
}

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
