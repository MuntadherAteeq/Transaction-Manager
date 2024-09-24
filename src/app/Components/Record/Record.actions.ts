"use server"

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
