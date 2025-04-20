import AppLogo from "@/Assets/Icons/Logo";
import { Table, User, Record, Transaction } from "@prisma/client";

export default async function Invoice({
  table,
  user,
  record,
}: {
  table?: Table;
  user?: User;
  record?: Record;
}) {
  const transactions: Transaction[] = await prisma.transaction.findMany({
    where: { tableId: table?.id },
  });

  return (
    <div className="h-full w-full overflow-scroll ">
      <div className="bg-white m-12 p-10 rounded-md printable">
        <div className="grid grid-cols-2 items-center">
          <div>
            {/* Company logo */}
            <AppLogo height="100" width="100" />
          </div>

          <div className="text-right text-gray-500 text-sm">
            <p>Email : {user?.email}</p>
          </div>
        </div>

        {/* Client info */}
        <div className="grid grid-cols-2 items-center mt-8">
          <div>
            <p className="font-bold text-gray-800">Bill to :</p>
            <p className="text-gray-500">
              {record?.name}
              <br />
              {record?.address}
            </p>
            <p className="text-gray-500">{record?.email}</p>
          </div>

          <div className="text-right">
            <p>
              Invoice number:
              <span className="text-gray-500">INV-{table?.id}</span>
            </p>
            <p>
              Invoice date:{" "}
              <span className="text-gray-500">
                {new Date().getUTCFullYear()}
              </span>
              <br />
              Due date:<span className="text-gray-500">31/07/2023</span>
            </p>
          </div>
        </div>

        {/* Invoice Items */}
        <div className="-mx-4 mt-8 flow-root sm:mx-0">
          <table className="min-w-full">
            <colgroup>
              <col className="w-full sm:w-1/2" />
              <col className="sm:w-1/6" />
              <col className="sm:w-1/6" />
              <col className="sm:w-1/6" />
            </colgroup>
            <thead className="border-b border-gray-300 text-gray-900">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Items
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Quantity
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-0"
                >
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-200">
                  <td className="max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0">
                    <div className="font-medium text-gray-900">
                      {transaction.description}
                    </div>
                    <div className="mt-1 truncate text-gray-500">{}</div>
                  </td>
                  <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
                    {transaction.qty}
                  </td>
                  <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
                    {(transaction.amount / 1000).toFixed(3)} BD
                  </td>
                  <td className="py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0">
                    {(transaction.amount / 1000).toFixed(3)} BD
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th
                  scope="row"
                  colSpan={3}
                  className="hidden pl-4 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell sm:pl-0"
                >
                  Total
                </th>
                <th
                  scope="row"
                  className="pl-6 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden"
                >
                  Total
                </th>
                <td className="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-0"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
