import { Lucia } from "lucia"
import { PrismaAdapter } from "@lucia-auth/adapter-prisma"

const adapter = new PrismaAdapter(prisma.session, prisma.user)
export const auth = new Lucia(adapter, {
  sessionCookie: {
    name: "lucia",
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
})
