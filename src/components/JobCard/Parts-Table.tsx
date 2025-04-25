"use client";

import { AgGridReact } from "ag-grid-react";
import { useState } from "react";

import { Account, Part } from "@prisma/client";

import { AllCommunityModule, ColDef, ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community"; // Import the missing module
import Image from "next/image";
import { useTableTheme } from "@/hooks/use-TableTheme";

// Register the required modules
ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule]);

export default function PartTable() {
  const tableTheme = useTableTheme();

  const [rowData, setRowData] = useState<Part[]>([
    {
      id: 1,
      description: "Part 1",
      qty: 10,
      rate: 100,
      amount: 1000,
      partCode: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      serviceId: 0,
      jobCardId: null,
    },
    {
      id: 2,
      description: "Part 2",
      qty: 5,
      rate: 200,
      amount: 1000,
      partCode: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      serviceId: 0,
      jobCardId: null,
    },
    {
      id: 3,
      description: "Part 3",
      qty: 8,
      rate: 150,
      amount: 1200,
      partCode: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      serviceId: 0,
      jobCardId: null,
    },
    {
      id: 4,
      description: "Part 4",
      qty: 12,
      rate: 80,
      amount: 960,
      partCode: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      serviceId: 0,
      jobCardId: null,
    },
    {
      id: 5,
      description: "Part 5",
      qty: 20,
      rate: 50,
      amount: 1000,
      partCode: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      serviceId: 0,
      jobCardId: null,
    },
  ]);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState<ColDef[]>([
    {
      flex: 1,
      field: "id",
      headerName: "Part Code",
      sortable: true,
      filter: true,
    },

    { flex: 3, field: "description", sortable: true, filter: true },

    { flex: 1, field: "qty", sortable: true, filter: true },
    { flex: 1, field: "rate", sortable: true, filter: true },
    {
      flex: 1,
      field: "amount",
      sortable: true,
      filter: true,
      resizable: false,
    },
  ]);

  return (
    <div className="w-full h-full">
      <AgGridReact
        theme={tableTheme}
        className="h-full w-full"
        rowData={rowData}
        columnDefs={colDefs}
      />
    </div>
  );
}
