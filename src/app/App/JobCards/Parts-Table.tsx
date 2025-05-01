"use client";

import { AgGridReact } from "ag-grid-react";
import { useState } from "react";

import { Part } from "@prisma/client";

import { AllCommunityModule, ColDef, ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community"; // Import the missing module
import { useTableTheme } from "@/hooks/use-TableTheme";
import { Card } from "@/components/ui/card";
import { PlusCircleIcon, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

// Register the required modules
ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule]);

export default function PartTable() {
  const tableTheme = useTableTheme();

  const [rowData, setRowData] = useState<Part[]>([]);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState<ColDef[]>([
    {
      flex: 1,
      field: "id",
      headerName: "Part Code",
      sortable: true,
      filter: true,
      editable: true,
    },

    {
      flex: 3,
      field: "description",
      sortable: true,
      filter: true,
      editable: true,
    },
    // Quantity column
    {
      flex: 1,
      field: "qty",
      sortable: true,
      filter: true,
      editable: true,
      valueGetter: (params: { data: { qty: number } }) => {
        return params.data?.qty ? params.data.qty : undefined;
      },
      valueSetter: (params: { data: { qty: number }; newValue: number }) => {
        if (params.data) {
          params.data.qty = Number(params.newValue);
          return true;
        }
        return false;
      },
      onCellValueChanged: (params: { data: { amount: number } }) => {},
    },
    // Rate column
    {
      flex: 1,
      field: "rate",
      sortable: true,
      filter: true,
      editable: true,
      valueGetter: (params: { data: { amount: number } }) => {
        return params.data?.amount ? params.data.amount / 1000 : undefined;
      },
      valueSetter: (params: { data: { amount: number }; newValue: number }) => {
        if (params.data) {
          params.data.amount = Number((params.newValue * 1000).toFixed(0));
          return true;
        }
        return false;
      },
      onCellValueChanged: (params: { data: { amount: number } }) => {},
    },
    // amount column
    {
      field: "amount",
      valueGetter: (params: { data: { amount: number; qty: number } }) => {
        if (params.data?.amount && params.data?.qty) {
          return `${((params.data.amount / 1000) * params.data.qty).toFixed(
            3
          )} BD`;
        }
        return "0.000 BD";
      },
      valueSetter: (params: { data: { amount: number }; newValue: number }) => {
        if (params.data) {
          params.data.amount = Number((params.newValue * 1000).toFixed(0));
          return true;
        }
        return false;
      },
    },
  ]);

  return (
    <div className="w-full h-full">
      <Card className="rounded-none p-3 flex flex-row gap-3">
        <Button
          type="button"
          variant={"ghost"}
          className="border-1 hover:border-1 hover:text-primary"
        >
          <PlusCircleIcon className="w-4 h-4 " />
          New
        </Button>
        <Button
          variant={"ghost"}
          className="border-1 hover:border-1 hover:text-destructive-foreground"
          type="button"
        >
          <Trash />
          Delete
        </Button>
      </Card>
      <AgGridReact
        theme={tableTheme}
        className="h-full w-full"
        rowData={rowData}
        columnDefs={colDefs}
      />
    </div>
  );
}
