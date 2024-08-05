import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    // Assuming data is sent in the request body

    try {
      const createdRecord = await prisma.record.create({
        data: {
          title: "Untitled",
          total: 0,
        },
      })
      return NextResponse.redirect(new URL("/Archive", req.url))
      // return new Response("", { status: 201 })
    } catch (error) {
      console.error(error)
      return new Response("Error creating record", { status: 500 })
    }
  } else {
    console.log("Invalid request method")
    return new Response("Invalid request method", { status: 405 })
  }
}
