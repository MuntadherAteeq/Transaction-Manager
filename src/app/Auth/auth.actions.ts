"use server"
import { z } from "zod"
import prisma from "../Library/prisma"
import { SignInSchema } from "@/components/SignInTab"
import argon2 from "argon2"
import { SignUpSchema } from "@/components/SignUpTab"
import { lucia } from "../Library/lucia"
import { cookies } from "next/headers"

export const signIn = async (values: z.infer<typeof SignInSchema>) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: values.email },
    })
    if (!user) return { error: "User does not exist", success: false }
    const isValid = await argon2.verify(user.password, values.password)
    if (user.email === values.email && isValid) {
      const session = await lucia.createSession(user.id, {})
      const sessionCookie = lucia.createSessionCookie(session.id)
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      )
      return { error: "", success: true }
    }
  } catch (error) {
    return { error: "An Error Occurred", success: false }
  }
  return { error: "Email or Password are Incorrect", success: false }
}

export const signUp = async (values: z.infer<typeof SignUpSchema>) => {
  try {
    if (
      await prisma.user.findUnique({
        where: { email: values.email },
      })
    )
      return { error: "User already exists", success: false }

    const user = await prisma.user.create({
      data: {
        email: values.email,
        password: await argon2.hash(values.password),
      },
    })
    const session = await lucia.createSession(user.id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    )
  } catch (error) {
    return { error: "An error occurred", success: false }
  }
  return { error: "", success: true }
}

export const signOut = async () => {
  const sessionCookieName = lucia.sessionCookieName
  const sessionId = cookies().get(sessionCookieName)?.value
  if (!sessionId) return { error: "No session found", success: false }

  try {
    const { user } = await lucia.validateSession(sessionId)
    if (user) {
      await prisma.session.deleteMany({
        where: { userId: user.id },
      })
    }
    cookies().delete(sessionCookieName)
    return { success: true }
  } catch (error) {
    return { error: "An error occurred", success: false }
  }
}
