import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
// return all archive records
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const prisma = new PrismaClient()
      const records = await prisma.record.findMany()
      return res.json(records)
    } catch (error) {
      console.error(error)
    }
  } else {
    console.log("Invalid request method")
  }
}
