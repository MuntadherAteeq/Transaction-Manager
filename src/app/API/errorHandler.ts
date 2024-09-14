import { NextRequest, NextResponse } from "next/server"

export function Handle(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    try {
      return await handler(req)
    } catch (error) {
      return new NextResponse("Database Failed", { status: 500 })
    }
  }
}
