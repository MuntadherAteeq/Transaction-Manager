import { NextResponse } from "next/server"

export function JsonResponse(data: any, status: number = 200) {
  return new NextResponse(JSON.stringify(data), { status })
}

export function ErrorResponse(message: string, status: number = 500) {
  return new NextResponse(message, { status })
}