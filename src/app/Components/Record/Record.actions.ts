"use server"
import { Record } from "@prisma/client"

export const deleteRecord = async (recordId: number) => {
  try {
    const tables = await prisma.table.findMany({
      where: {
        recordId: {
          equals: recordId,
        },
      },
    })

    const tableIds = tables.map((table) => table.id)

    await prisma.transaction.deleteMany({
      where: {
        tableId: {
          in: tableIds,
        },
      },
    })
    await prisma.table.deleteMany({
      where: {
        recordId: recordId,
      },
    })
    await prisma.record.deleteMany({
      where: {
        id: recordId,
      },
    })

    return { error: "", status: 200 }
  } catch (error) {
    console.error("Error deleting record:", error)
    return { error: "Server Failed", status: 500 }
  }
}

export const editRecord = async (record: Record) => {
  try {
    console.log("Record Submitted")
    await prisma.record.update({
      where: { id: record.id },
      data: {
        name: record.name,
        phone: record.phone,
        balance: Number(record.balance),
        email: record.email,
        desc: record.desc,
        address: record.address,
        category: record.category,
      },
    })
    return { error: "", status: 200 }
  } catch (error) {
    return { error: error, status: 500 }
  }
}
