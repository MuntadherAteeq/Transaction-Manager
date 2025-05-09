"use client";

import { AgGridReact } from "ag-grid-react";
import { useMemo, useState } from "react";

import {
  AllCommunityModule,
  ColDef,
  ModuleRegistry,
  RowSelectionOptions,
} from "ag-grid-community";
import { useTableTheme } from "@/hooks/use-TableTheme";
import { Edit, Plus, Trash } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { JobCard } from "@prisma/client";
import useSWR from "swr";
import { useRouter } from "next/navigation";

// Register the required modules
ModuleRegistry.registerModules([AllCommunityModule]);

export default function AccountTable() {
  const tableTheme = useTableTheme();

  const isMobile = useIsMobile();

  const [rowData, setRowData] = useState<JobCard[]>([]);

  const [selectedRow, setSelectedRow] = useState<JobCard | null>(null);

  const router = useRouter();

  const onRowSelected = (event: any) => {
    setSelectedRow(event.data);
  };

  const { data } = useSWR("/api/jobCards", {
    fetcher: (url: string) => fetch(url).then((res) => res.json()),
  });

  useMemo(() => {
    if (data) {
      setRowData(data);
    }
  }, [data]);

  const colDefs: ColDef[] = [
    {
      field: "date",
      headerName: "",
      resizable: false,
      cellClass: "w-full h-full",
      lockPosition: true,
      flex: isMobile ? 0 : 1,
      filter: false,
    },
    {
      field: "id",
      sortable: true,
      lockPosition: true,
      filter: true,
      flex: isMobile ? 0 : 1,
    },
    {
      field: "operator",
      sortable: true,
      filter: true,
      lockPosition: true,
      flex: isMobile ? 0 : 1,
    },
    {
      field: "department",
      sortable: true,
      filter: true,
      lockPosition: true,
      flex: isMobile ? 0 : 1,
    },
    {
      field: "mechanic",
      sortable: true,
      filter: true,
      lockPosition: true,
      flex: isMobile ? 0 : 1,
    },
    {
      field: "totalAmount",
      headerName: "",
      resizable: false,
      lockPosition: true,
      flex: isMobile ? 0 : 1,
    },
  ];

  const rowSelection = useMemo<
    RowSelectionOptions | "single" | "multiple"
  >(() => {
    return {
      mode: "singleRow",
    };
  }, []);

  return (
    <div className=" flex flex-col w-full h-full">
      <Card className="flex flex-row p-0 m-0 rounded-none">
        <CardContent className="w-full p-3 space-x-3">
          <Button
            variant={"default"}
            onClick={() => router.push("/App/JobCards/New")}
          >
            <Plus />
            New Job Card
          </Button>
          {/* <Button
            variant={"ghost"}
            className=" bg-transparent hover:bg-background  border "
          >
            <Edit />
            <span className="max-sm:hidden me-2 ">Edit</span>
          </Button> */}

          {/* <Button
            variant={"destructive"}
            className=" bg-transparent hover:bg-background hover:text-destructive-foreground border"
          >
            <Trash />
            <span className="max-sm:hidden me-2 ">Delete</span>
          </Button> */}
        </CardContent>
      </Card>
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
        onRowSelected={onRowSelected}
      />
    </div>
  );
}
