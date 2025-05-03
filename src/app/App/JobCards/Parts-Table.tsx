"use client";

import { AgGridReact } from "ag-grid-react";
import { useMemo, useState } from "react";

import {
  AllCommunityModule,
  ColDef,
  ModuleRegistry,
  RowSelectionOptions,
} from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community"; // Import the missing module
import { useTableTheme } from "@/hooks/use-TableTheme";

// Register the required modules
ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule]);

export default function PartTable(props: {
  editable?: boolean;
  onRowDataChange?: (rowData: any) => void;
  rowData?: any[];
  setRowData?: (rowData: any[]) => void;
  onCellValueChanged?: (params: any) => void;
  onRowSelected?: (params: any) => void;
  onRowDataUpdated?: (params: any) => void;
}) {
  const tableTheme = useTableTheme();

  const row = {
    partCode: null,
    rate: null,
    description: null,
    qty: null,
    amount: null,
  };

  const rowSelection = useMemo<RowSelectionOptions>(() => {
    return {
      mode: "multiRow",
    };
  }, []);

  function onCellValueChanged(params: any) {
    //  get last element of the row data
    const lastElement = rowData[rowData.length - 1];
    console.log("lastElement", lastElement);
    // check if the last all fields are filled
    if (
      lastElement.partCode &&
      lastElement.rate &&
      lastElement.description &&
      lastElement.qty
    ) {
      // add new empty row data
      setRowData((prevRowData) => [...prevRowData, row]);
    }
  }

  const [rowData, setRowData] = useState<(typeof row)[]>([row]);

  // Column Definitions: Defines the columns to be displayed.
  const colDefs = useMemo<ColDef[]>(
    () => [
      {
        flex: 1,
        field: "partCode",
        headerName: "Part Code",
        sortable: true,
        filter: true,
        // if props.editable is not defined then it will be editable
        editable: props?.editable !== undefined ? props.editable : true,
      },

      {
        flex: 3,
        field: "description",
        sortable: true,
        filter: true,
        editable: props?.editable,
      },
      // Quantity column
      {
        flex: 1,
        field: "qty",
        editable: props?.editable !== undefined ? props.editable : true,
        sortable: true,
        filter: true,

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
        editable: props?.editable !== undefined ? props.editable : true,
        valueGetter: (params: { data: { rate: number } }) => {
          return params.data?.rate ? params.data.rate / 1000 : undefined;
        },
        valueSetter: (params: { data: { rate: number }; newValue: number }) => {
          if (params.data) {
            params.data.rate = Number((params.newValue * 1000).toFixed(0));
            return true;
          }
          return false;
        },
        onCellValueChanged: (params: { data: { rate: number } }) => {},
      },
      // amount column
      {
        field: "amount",
        valueGetter: (params: { data: { rate: number; qty: number } }) => {
          if (params.data?.rate && params.data?.qty) {
            return `${((params.data.rate / 1000) * params.data.qty).toFixed(
              3
            )} BD`;
          }
          return "0.000 BD";
        },
        valueSetter: (params: { data: { rate: number }; newValue: number }) => {
          if (params.data) {
            params.data.rate = Number((params.newValue * 1000).toFixed(0));
            return true;
          }
          return false;
        },
      },
    ],
    [props.editable]
  );

  return (
    <div className="w-full h-full p-6">
      {/* <Card className="rounded-b-none p-3 flex flex-row gap-3">
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
      </Card> */}
      <AgGridReact
        theme={tableTheme}
        rowData={rowData}
        columnDefs={colDefs}
        onCellValueChanged={onCellValueChanged}
        // rowSelection={rowSelection}
      />
    </div>
  );
}
