"use client";

export default function JobCards(props: any) {
  // Define the column definitions
  const colDefs = [
    { field: "description", headerName: "Description" },
    { field: "qty", headerName: "Quantity" },
    { field: "rate", headerName: "Rate" },
    { field: "amount", headerName: "Amount" },
  ];
  // Define the row data
  const rowData = [
    { description: "Part A", qty: 10, rate: 100, amount: 1000 },
    { description: "Part B", qty: 5, rate: 200, amount: 1000 },
    { description: "Part C", qty: 2, rate: 300, amount: 600 },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
      Hello world
    </div>
  );
}
