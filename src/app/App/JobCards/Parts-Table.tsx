"use client";

import { AgGridReact } from "ag-grid-react";
import { useEffect, useMemo, useState } from "react";

import {
  AllCommunityModule,
  ColDef,
  ModuleRegistry,
  RowSelectionOptions,
} from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community"; // Import the missing module
import { useTableTheme } from "@/hooks/use-TableTheme";
import { useJobCardForm } from "./form-store";

// Register the required modules
ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule]);

export default function PartTable(props: { editable?: boolean }) {
  const { parts, setParts, formValues, setFormValues, totalAmount } =
    useJobCardForm();
  const tableTheme = useTableTheme();

  const row = {
    partCode: "",
    description: "",
    quantity: 0,
    rate: 0,
    amount: 0,
  };

  const rowSelection = useMemo<RowSelectionOptions>(() => {
    return {
      mode: "multiRow",
    };
  }, []);

  function onCellValueChanged(params: any) {
    // check if the cell value is changed and the row is empty and not the last row then remove the row
    if (
      params.data.quantity === 0 &&
      params.data.rate === 0 &&
      params.data.description === null &&
      params.data.partCode === null
    ) {
      const updatedRowData = [...parts];
      const index = updatedRowData.findIndex((row) => row === params.data);
      if (index > -1) {
        updatedRowData.splice(index, 1);
        setParts(updatedRowData);
      }
    }

    //  get last element of the row data
    const lastElement = parts[parts.length - 1];
    // check if the last all fields are filled
    if (
      lastElement.partCode &&
      lastElement.rate &&
      lastElement.description &&
      lastElement.quantity
    ) {
      // add new empty row data
      setParts((prev) => [...prev, row]);
    }
    console.log(parts);
  }

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
        field: "quantity",
        headerName: "Qty",
        editable: props?.editable !== undefined ? props.editable : true,
        sortable: true,
        filter: true,

        valueGetter: (params: { data: { quantity: number } }) => {
          return params.data?.quantity ? params.data.quantity : undefined;
        },
        valueSetter: (params: {
          data: { quantity: number };
          newValue: number;
        }) => {
          if (params.data) {
            params.data.quantity = Number(params.newValue);
            return true;
          }
          return false;
        },
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
      <AgGridReact
        theme={tableTheme}
        rowData={parts}
        columnDefs={colDefs}
        onCellValueChanged={onCellValueChanged}
      />
    </div>
  );
}
