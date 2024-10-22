"use server";

import { redirect } from "next/navigation";
import { getUser } from "../Library/lucia";

export const getTotalIncomes = async () => {
  const user = await getUser();
  if (!user) redirect("/Auth");

  const completedRecords = await prisma.record.findMany({
    where: {
      userId: {
        equals: user.id,
      },
    },
  });

  const competedTables = await prisma.table.findMany({
    where: {
      recordId: {
        in: completedRecords.map((record) => record.id),
      },
      AND: {
        isCompleted: {
          equals: true,
        },
      },
    },
  });
  const completedTransactions = await prisma.transaction.findMany({
    where: {
      tableId: {
        in: competedTables.map((table) => table.id),
      },
    },
  });
  const total = completedTransactions.reduce(
    (acc, transaction) =>
      transaction.type.toLowerCase() === "income"
        ? acc + transaction.amount * transaction.qty
        : acc,
    0
  );
  return total / 1000;
};

export const getTotalExpenses = async () => {
  const user = await getUser();
  if (!user) redirect("/Auth");

  const completedRecords = await prisma.record.findMany({
    where: {
      userId: {
        equals: user.id,
      },
    },
  });

  const competedTables = await prisma.table.findMany({
    where: {
      recordId: {
        in: completedRecords.map((record) => record.id),
      },
      AND: {
        isCompleted: {
          equals: true,
        },
      },
    },
  });
  const completedTransactions = await prisma.transaction.findMany({
    where: {
      tableId: {
        in: competedTables.map((table) => table.id),
      },
    },
  });
  const total = completedTransactions.reduce(
    (acc, transaction) =>
      transaction.type.toLowerCase() === "expense"
        ? acc + transaction.amount * transaction.qty
        : acc,
    0
  );
  return total / 1000;
};

// export const getCompletedExpenses = async () => {
//   const user = await getUser();
//   if (!user) redirect("/Auth");

//   const completedRecords = await prisma.record.findMany({
//     where: {
//       userId: {
//         equals: user.id,
//       },
//     },
//   });

//   const competedTables = await prisma.table.findMany({
//     where: {
//       recordId: {
//         in: completedRecords.map((record) => record.id),
//       },
//       AND: {
//         isCompleted: {
//           equals: true,
//         },
//       },
//     },
//   });
//   const completedTransactions = await prisma.transaction.findMany({
//     where: {
//       tableId: {
//         in: competedTables.map((table) => table.id),
//       },
//     },
//   });
//   return completedTransactions;
// };

// export const getCompletedIncomes = async () => {
//   const user = await getUser();
//   if (!user) redirect("/Auth");

//   const completedRecords = await prisma.record.findMany({
//     where: {
//       userId: {
//         equals: user.id,
//       },
//     },
//   });

//   const competedTables = await prisma.table.findMany({
//     where: {
//       recordId: {
//         in: completedRecords.map((record) => record.id),
//       },
//       AND: {
//         isCompleted: {
//           equals: true,
//         },
//       },
//     },
//   });
//   const completedTransactions = await prisma.transaction.findMany({
//     where: {
//       tableId: {
//         in: competedTables.map((table) => table.id),
//       },
//     },
//   });
//   return completedTransactions;
// };

export const getCompletedTransactions = async () => {
  const user = await getUser();
  if (!user) redirect("/Auth");

  const completedRecords = await prisma.record.findMany({
    where: {
      userId: {
        equals: user.id,
      },
    },
  });

  const competedTables = await prisma.table.findMany({
    where: {
      recordId: {
        in: completedRecords.map((record) => record.id),
      },
      AND: {
        isCompleted: {
          equals: true,
        },
      },
    },
  });
  const completedTransactions = await prisma.transaction.findMany({
    where: {
      tableId: {
        in: competedTables.map((table) => table.id),
      },
    },
  });
  return completedTransactions;
};
