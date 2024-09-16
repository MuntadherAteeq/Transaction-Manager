import { NextRequest, NextResponse } from "next/server"
import { getUser } from "../Library/lucia"

export function Handle(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    try {
      ;(await getUser())
        ? null
        : new NextResponse("Unauthorized", { status: 401 })
      return await handler(req)
    } catch (error) {
      return new NextResponse("Database Failed", { status: 500 })
    }
  }
}
