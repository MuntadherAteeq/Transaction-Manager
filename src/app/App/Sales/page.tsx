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

import { Account } from "@prisma/client";
import useSWR from "swr";
import { Alert_Dialog } from "@/components/Alert_Dialog";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CustomerDialog from "./CustomerDialog";

// Register the required modules
ModuleRegistry.registerModules([AllCommunityModule]);

export default function VehiclesTable() {
  const tableTheme = useTableTheme();

  const isMobile = useIsMobile();

  const [rowData, setRowData] = useState<Account[]>([]);

  const { data, error, mutate, isLoading } = useSWR("/api/sales", {
    fetcher: (url: string) => fetch(url).then((res) => res.json()),
  });

  useMemo(() => {
    if (data) {
      setRowData(data);
    }
  }, [data]);

  const colDefs: ColDef[] = [
    {
      field: "vehicleNo",
      headerName: "Vehicle No",
      sortable: true,
      lockPosition: true,
      filter: true,
      flex: isMobile ? 0 : 1,
    },
    {
      field: "type",
      headerName: "Type",
      sortable: true,
      lockPosition: true,
      filter: true,
      flex: isMobile ? 0 : 1,
    },
    {
      field: "driver",
      headerName: "Driver / Operator",
      sortable: true,
      lockPosition: true,
      filter: true,
      flex: isMobile ? 0 : 1,
    },
    {
      field: "mechanic",
      sortable: true,
      lockPosition: true,
      filter: true,
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
      {isMobile ? (
        <>
          <CustomerDialog />
        </>
      ) : (
        <AgGridReact
          theme={tableTheme}
          className=" h-full w-full "
          rowData={rowData}
          columnDefs={colDefs}
          // this will make the grid responsive
          rowHeight={60}
          // This will prevent the column from removed when dragged out
          suppressDragLeaveHidesColumns
          // this will allow us to select multiple rows
          rowSelection={rowSelection}
        />
      )}
    </div>
  );
}
