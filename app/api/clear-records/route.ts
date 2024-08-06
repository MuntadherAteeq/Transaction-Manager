import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    // Assuming data is sent in the request body
    const data = await req.json()

    try {
      const prisma = new PrismaClient()
      await prisma.record.deleteMany({})

      revalidatePath("/Archive")
      return new Response("Records cleared", { status: 201 })
    } catch (error) {
      return new Response("Error creating record", { status: 500 })
    }
  } else {
    return new Response("Invalid request method", { status: 405 })
  }
}
