"use server"
import { Decimal } from "@prisma/client/runtime/library"
import { Transaction } from "@prisma/client"

export const getTransactions = async (tableId: number) => {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        tableId: tableId,
      },
    })
    return { error: "", status: 200, data: transactions } as {
      error: string
      status: number
      data: Transaction[]
    }
  } catch (error) {
    return { error: "Process Failed", status: 500, data: [] }
  }
}

export const addTransaction = async (tableId: number) => {
  try {
    await prisma.transaction.create({
      data: {
        amount: 0,
        type: "expense",
        description: "",
        date: new Date(),
        tableId: tableId,
        qty: 1,
      },
    })
    return { error: "", status: 200 }
  } catch (error) {
    return { error: "Process Failed", status: 500 }
  }
}

export const clearTransactions = async (tableId: number) => {
  try {
    await prisma.transaction.deleteMany({
      where: {
        tableId: tableId,
      },
    })
    return { error: "", status: 200 }
  } catch (error) {
    return { error: "Process Failed", status: 500 }
  }
}

export const updatePrice = async (transactionId: number, price: number) => {
  try {
    await prisma.transaction.update({
      where: {
        id: transactionId,
      },
      data: {
        amount: new Decimal(price), // Ensure price is converted to Decimal if needed
      },
    })
    return { error: "", status: 200 }
  } catch (error) {
    console.error("Error updating price:", error)
    return { error: "Process Failed", status: 500 }
  }
}
export const updateDesc = async (transactionId: number, newDesc: string) => {
  try {
    await prisma.transaction.update({
      where: {
        id: transactionId,
      },
      data: {
        description: newDesc, // Ensure price is converted to Decimal if needed
      },
    })
    return { error: "", status: 200 }
  } catch (error) {
    console.error("Error updating price:", error)
    return { error: "Process Failed", status: 500 }
  }
}
