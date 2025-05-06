"use client";

import React, { createContext, useContext, useState } from "react";
import { z } from "zod";

// Define the schema for the form
const formSchema = z.object({
  date: z.string().min(1, { message: "Date is required" }),
  km: z.number().min(1, { message: "Kilometer reading is required" }),
  operator: z.string().min(1, { message: "Operator name is required" }),
  department: z.string().min(1, { message: "Department is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  type: z.string().min(1, { message: "Service type is required" }),
  vehicleId: z.string().min(1, { message: "Vehicle ID is required" }),
  nextServiceDate: z
    .string()
    .min(1, { message: "Next service date is required" }),
  nextServiceKm: z
    .number()
    .min(1, { message: "Next service kilometer is required" }),
});

// Define the part type
export type Part = {
  id?: number;
  partCode: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
};

// Define the context type
interface JobCardFormContextType {
  formValues: z.infer<typeof formSchema>;
  setFormValues: React.Dispatch<
    React.SetStateAction<z.infer<typeof formSchema>>
  >;
  parts: Part[];
  setParts: React.Dispatch<React.SetStateAction<Part[]>>;
  totalAmount: number;
  updateTotalAmount: (newParts: Part[]) => void;
}

// Create the context
const JobCardFormContext = createContext<JobCardFormContextType | undefined>(
  undefined
);

// Provider component
export function JobCardFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [formValues, setFormValues] = useState<z.infer<typeof formSchema>>({
    date: new Date().toISOString().split("T")[0],
    km: 0,
    operator: "",
    department: "",
    description: "",
    type: "",
    vehicleId: "",
    nextServiceDate: "",
    nextServiceKm: 0,
  });

  const [parts, setParts] = useState<Part[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const updateTotalAmount = (newParts: Part[]) => {
    const total = newParts.reduce((sum, part) => sum + part.amount, 0);
    setTotalAmount(total);
  };

  return (
    <JobCardFormContext.Provider
      value={{
        formValues,
        setFormValues,
        parts,
        setParts,
        totalAmount,
        updateTotalAmount,
      }}
    >
      {children}
    </JobCardFormContext.Provider>
  );
}

// Custom hook to use the context
export const useJobCardForm = () => {
  const context = useContext(JobCardFormContext);
  if (!context) {
    throw new Error("useJobCardForm must be used within a JobCardFormProvider");
  }
  return context;
};
