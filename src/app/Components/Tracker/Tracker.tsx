"use client";

import { AgGridReact } from "ag-grid-react";
import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { ColDef, GridApi, SelectionChangedEvent } from "ag-grid-community";
import { Table, Transaction } from "@prisma/client";
import {
  // addTransaction,
  // deleteTransaction,
  // dropTable,
  getTransactions,
  updateDesc,
  updatePrice,
  updateQuantity,
  updateType,
} from "../Table/table.actions";
// import { CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { usePathname } from "next/navigation"
// import { mutate } from "swr"
// import ComingSoon from "../CommingSoon"
import TableHeader from "../Table/TableHeader";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { TrackerFooter } from "./TrackerFooter";

export default function Tracker({ table }: { table: Table }) {
  const [selected, setSelected] = useState<Transaction[]>([]);
  const [rowData, setRowData] = useState<Transaction[]>([]);
  const [isComplete, setIsComplete] = useState(table.isCompleted);
  const [updatedTransaction, setUpdatedTransaction] =
    useState<Transaction | null>(null);

  useEffect(() => {}, []);

  const fetchData = useCallback(async () => {
    const result = await getTransactions(table.id);
    setRowData(result.data);
  }, [table.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      flex: 1,
    }),
    []
  );

  const columnDefs = useMemo<ColDef[]>(
    () => [
      {
        field: "description",
        filter: "agTextCellEditor",
        editable: !isComplete,
        onCellValueChanged: async (params) => {
          if (params.oldValue !== params.newValue) {
            await updateDesc(params.data.id, params.newValue);
          }
        },
      },
      {
        field: "amount",
        filter: "agNumberColumnFilter",
        editable: !isComplete,
        cellEditor: "agNumberCellEditor",
        valueGetter: (params: { data: { amount: number } }) => {
          return params.data?.amount ? params.data.amount / 1000 : 0;
        },
        valueSetter: (params: {
          data: { amount: number };
          newValue: number;
        }) => {
          if (params.data) {
            params.data.amount = Number((params.newValue * 1000).toFixed(0));
            return true;
          }
          return false;
        },
        onCellValueChanged: async (params) => {
          if (params.data) {
            const res = await updatePrice(params.data.id, params.data.amount);
            setUpdatedTransaction(params.data);
            if (res.error) {
              toast({
                title: "Error Happened",
                description: res.error,
              });
              fetchData();
            }
          }
        },
        cellRenderer: (params: { value: number; data: Transaction }) => {
          const amount = Number(params.value);
          if (amount === 0 || amount === null || amount === undefined)
            return "";
          return (
            <span
              className={
                params.data.type === "income"
                  ? "text-green-500"
                  : "text-rose-500"
              }
            >{`${params.value.toFixed(3)} BD`}</span>
          );
        },
      },
      {
        field: "qty",
        filter: "agNumberColumnFilter",
        editable: !isComplete,
        cellEditor: "agNumberCellEditor",
        onCellValueChanged: async (params) => {
          if (params.data) {
            const res = await updateQuantity(params.data.id, params.newValue);
            setUpdatedTransaction(params.data);
            if (res.error) {
              toast({
                title: "Error Happened",
                description: res.error,
              });
              fetchData();
            }
          }
        },
        cellRenderer: (params: { value: number }) => {
          const qty = Number(params.value);
          if (qty === 0 || qty === null || qty === undefined) return "";
          return params.value;
        },
      },
      {
        field: "type",
        cellEditor: "agSelectCellEditor",
        editable: !isComplete,
        cellEditorParams: {
          values: ["expense", "income"],
        },
        onCellValueChanged: async (params) => {
          if (params.data) {
            const res = await updateType(params.data.id, params.newValue);
            setUpdatedTransaction({ ...params.data, type: params.newValue });
            if (res.error) {
              toast({
                title: "Error Happened",
                description: res.error,
              });
              fetchData();
            }
          }
        },
      },
      {
        field: "total",
        valueGetter: (params: {
          data: { amount: number; qty: number; type: string };
        }) => {
          if (params.data?.amount && params.data?.qty) {
            return (params.data.amount / 1000) * params.data.qty;
          }
          return 0;
        },
        cellRenderer: (params: {
          data: { amount: number; qty: number; type: string };
        }) => {
          if (params.data?.amount && params.data?.qty) {
            return (
              <span
                className={cn(
                  params.data.type === "income"
                    ? "text-green-500"
                    : "text-rose-500"
                )}
              >{`${((params.data.amount / 1000) * params.data.qty).toFixed(
                3
              )} BD`}</span>
            );
          }
          return "";
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isComplete, updatedTransaction]
  );
  const rowSelection = useMemo(() => {
    return {
      mode: "multiRow",
    };
  }, []);

  const handleSelectedRows = (event: SelectionChangedEvent) => {
    setSelected(event.api.getSelectedRows());
  };

  const gridRef = useRef<AgGridReact>(null);

  const onPrint = useCallback(() => {
    if (gridRef.current) {
      const gridApi: GridApi = gridRef.current.api;
      if (selected.length > 0) {
        gridApi.exportDataAsCsv({
          onlySelected: true,
        });
      } else gridApi.exportDataAsCsv();
    }
  }, [selected]);

  return (
    <div className="flex flex-col w-full h-full animate-show-down opacity-0 mb-9">
      <TableHeader
        table={table}
        onClick={fetchData}
        selected={selected}
        onPrint={onPrint}
        setIsComplete={setIsComplete}
      />
      <div className="table-container">
        {" "}
        {/* Add this div */}
        <AgGridReact
          className="ag-theme-quartz-dark w-full"
          rowData={rowData}
          columnDefs={columnDefs}
          domLayout="autoHeight"
          defaultColDef={defaultColDef}
          overlayNoRowsTemplate="No Transactions Found"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          selection={!isComplete ? rowSelection : undefined}
          onSelectionChanged={handleSelectedRows}
          ref={gridRef}
        />
      </div>

      <TrackerFooter
        table={table}
        rowData={rowData}
        updatedTransaction={updatedTransaction}
        isComplete={isComplete}
        selections={selected}
      />
    </div>
  );
}
