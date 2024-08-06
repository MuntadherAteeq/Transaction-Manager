import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"
// return all archive records
export async function GET(req: NextRequest) {
  if (req.method === "GET") {
    try {
      const prisma = new PrismaClient()
      const records = await prisma.record.findMany()

      return new NextResponse(JSON.stringify(records), { status: 200 })
    } catch (error) {
      return new NextResponse(null, { status: 500 })
    }
  } else {
    return new NextResponse(null, { status: 405 })
  }
}
