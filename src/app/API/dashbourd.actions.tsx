"use server"
export const getTotalIncomes = async () => {
  const competedTables = await prisma.table.findMany({
    where: {
      isCompleted: true,
    },
  })
  const completedTransactions = await prisma.transaction.findMany({
    where: {
      tableId: {
        in: competedTables.map((table) => table.id),
      },
    },
  })
  const total = completedTransactions.reduce(
    (acc, transaction) =>
      transaction.type.toLowerCase() === "income"
        ? acc + transaction.amount * transaction.qty
        : acc,
    0
  )
  return total / 1000
}

export const getTotalExpenses = async () => {
  const competedTables = await prisma.table.findMany({
    where: {
      isCompleted: true,
    },
  })
  const completedTransactions = await prisma.transaction.findMany({
    where: {
      tableId: {
        in: competedTables.map((table) => table.id),
      },
    },
  })
  const total = completedTransactions.reduce(
    (acc, transaction) =>
      transaction.type.toLowerCase() === "expense"
        ? acc + transaction.amount * transaction.qty
        : acc,
    0
  )
  return total / 1000
}
