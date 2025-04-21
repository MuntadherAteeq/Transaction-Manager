"use client";

import { AgGridReact } from "ag-grid-react";
import { useState } from "react";

import { User } from "@prisma/client";

import { AllCommunityModule, ColDef, ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community"; // Import the missing module
import { useTableTheme } from "@/hooks/use-TableTheme";

// Register the required modules
ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule]);

export default function AccountTable({ users }: { users: User[] }) {
  const tableTheme = useTableTheme();

  const [rowData, setRowData] = useState<User[]>(users || []);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState<ColDef[]>([
    {
      field: "image",
      headerName: "",
      width: 70,
      cellClass: "flex items-center justify-center pt-1",
      cellRenderer: (params: { value: string }) => {
        return (
          <img
            className="w-[35px] h-[35px] rounded-full object-cover"
            src={params.value}
            alt="Image"
          />
        );
      },
    },
    {
      field: "name",
      sortable: true,
      filter: true,
      flex: 1,
      cellClass: "flex items-center justify-center pt-1",
    },
    {
      field: "email",
      sortable: true,
      filter: true,
      flex: 1,
      cellClass: "flex items-center justify-center pt-1",
    },
    {
      field: "rules",
      sortable: true,
      filter: true,
      flex: 1,
      cellClass: "flex items-center justify-center pt-1",
    },
  ]);

  return (
    <div className=" flex flex-col w-full h-full bg-popover">
      <AgGridReact
        theme={tableTheme}
        className="h-full w-full"
        rowData={rowData}
        columnDefs={colDefs}
        rowHeight={50}
      />
    </div>
  );
}
