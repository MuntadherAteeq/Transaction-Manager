import { Lucia } from "lucia"
import { PrismaAdapter } from "@lucia-auth/adapter-prisma"
import { cookies } from "next/headers"
import prisma from "./prisma"

const adapter = new PrismaAdapter(prisma.session, prisma.user)
export const lucia = new Lucia(adapter, {
  sessionCookie: {
    name: "TM-Auth-Cookie",
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
})

export const getUser = async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value
  if (!sessionId) return null

  try {
    const { user, session } = await lucia.validateSession(sessionId)

    if (session?.fresh) {
      const sessionCookie = await lucia.createSessionCookie(session.id)
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      )
    }

    return await prisma.user.findUnique({
      where: { id: user?.id },
    })
  } catch (error) {
    return null
  }
}
