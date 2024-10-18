import { Table, Transaction } from "@prisma/client";
import { useMemo } from "react";

export const TrackerFooter = ({
  rowData,
  updatedTransaction,
  selections,
}: {
  table: Table;
  rowData: Transaction[];
  updatedTransaction: Transaction | null;
  isComplete: boolean;
  selections: Transaction[];
}) => {
  const totalExpenses = useMemo(() => {
    return rowData.reduce((acc, { amount, qty, type }) => {
      if (type === "expense") {
        return acc + amount * qty;
      }
      return acc;
    }, 0);
  }, [rowData, updatedTransaction]);

  const totalIncome = useMemo(() => {
    return rowData.reduce((acc, { amount, qty, type }) => {
      if (type === "income") {
        return acc + amount * qty;
      }
      return acc;
    }, 0);
  }, [rowData, updatedTransaction]);

  const balance = useMemo(() => {
    return totalIncome - totalExpenses;
  }, [rowData, updatedTransaction]);

  const selectionTotal = useMemo(
    () =>
      selections.reduce((acc, { amount, qty, type }) => {
        if (type === "income") {
          return acc + amount * qty;
        }
        return acc - amount * qty;
      }, 0),
    [selections]
  );

  return (
    <tfoot className="flex gap-1 flex-col w-full  border-solid  rounded-b-[7px] p-1 bg-[#114565] z-10 text-center">
      <tr className="grid grid-cols-4">
        <td className="flex justify-center">Total income:</td>
        <td className="text-green-500 bg-background rounded-sm">
          + {(totalIncome / 1000).toFixed(3)} BD
        </td>
        <td className="flex justify-center">Total Expenses: </td>
        <td className=" text-red-500 bg-background rounded-sm ">
          - {(totalExpenses / 1000).toFixed(3)} BD
        </td>
      </tr>
      <tr className="grid grid-cols-4">
        <td className="flex justify-center">Balance :</td>
        <td className="text-yellow-600 bg-background rounded-sm ">
          {(balance / 1000).toFixed(3)} BD
        </td>
        <td className="flex justify-center">Selection Total</td>
        <td className=" bg-background rounded-sm ">
          {(selectionTotal / 1000).toFixed(3)}
        </td>
      </tr>
    </tfoot>
  );
};
