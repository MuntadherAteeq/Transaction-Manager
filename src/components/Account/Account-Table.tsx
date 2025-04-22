"use client";

import { AgGridReact } from "ag-grid-react";
import { useMemo, useState } from "react";

import { User } from "@prisma/client";

import {
  AllCommunityModule,
  ColDef,
  FilterManager,
  FilterValueService,
  ModuleRegistry,
  RowSelectionOptions,
} from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community"; // Import the missing module
import { useTableTheme } from "@/hooks/use-TableTheme";
import { Badge } from "@/components/ui/badge";
import { User2 } from "lucide-react";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";

// Register the required modules
ModuleRegistry.registerModules([AllCommunityModule]);

export default function AccountTable({ users }: { users: User[] }) {
  const tableTheme = useTableTheme();

  const isMobile = useIsMobile();

  const [rowData, setRowData] = useState<User[]>(users || []);
  // Column Definitions: Defines the columns to be displayed.

  const colDefs: ColDef[] = [
    {
      field: "image",
      headerName: "",
      width: 80,
      resizable: false,
      cellClass: "w-full h-full",
      lockPosition: true,
      filter: false,
      cellRenderer: (params: { value: string; data: User }) => {
        return (
          <div className="flex items-center justify-center w-full h-full">
            <Avatar className="size-10">
              <AvatarImage
                className="size-10 shrink-0 rounded-full object-cover"
                src={params.value}
                alt="Image"
              />
              <AvatarFallback>{params.data.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        );
      },
    },
    {
      field: "name",
      sortable: true,
      cellClass: "flex items-center justify-center pt-1",
      editable: true,
      lockPosition: true,
      filter: true,
      flex: isMobile ? 0 : 1,
    },
    {
      field: "email",
      sortable: true,
      filter: true,
      cellClass: "flex items-center justify-center pt-1",
      lockPosition: true,
      flex: isMobile ? 0 : 1,
    },
    {
      field: "rules",
      sortable: true,
      filter: true,
      lockPosition: true,
      flex: isMobile ? 0 : 1,

      cellRenderer: (params: { value: string }) => {
        const rules = ["Admin", "User", "Manager", "Editor"];
        return (
          <div className="flex w-full h-full items-center justify-center gap-2 flex-wrap max-sm:overflow-y-scroll max-sm:overflow-x-hidden ">
            {rules.map((rule: string, index: number) => {
              const trimmedRule = rule.trim();
              return (
                <Badge
                  key={index}
                  variant={trimmedRule === "Admin" ? "destructive" : "default"}
                >
                  <User2 className="mr-2 h-4 w-4 " />
                  {trimmedRule}
                </Badge>
              );
            })}
          </div>
        );
      },
    },
  ];

  const rowSelection = useMemo<
    RowSelectionOptions | "single" | "multiple"
  >(() => {
    return {
      mode: "multiRow",
    };
  }, []);

  return (
    <div className=" flex flex-col w-full h-full bg-popover">
      <AgGridReact
        theme={tableTheme}
        className="h-full w-full"
        rowData={rowData}
        columnDefs={colDefs}
        // this will make the grid responsive
        rowHeight={60}
        // This will prevent the column from removed when dragged out
        suppressDragLeaveHidesColumns
        // this will allow us to select multiple rows
        rowSelection={rowSelection}
      />
    </div>
  );
}
