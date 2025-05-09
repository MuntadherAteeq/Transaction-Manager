"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { z } from "zod";

// Define the schema for the form
export const formSchema = z.object({
  date: z.string().min(1, { message: "Date is required" }).optional(),
  km: z
    .number()
    .min(1, { message: "Kilometer reading is required" })
    .optional(),
  operator: z
    .string()
    .min(1, { message: "Operator name is required" })
    .optional(),
  department: z
    .string()
    .min(1, { message: "Department is required" })
    .optional(),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .optional(),
  type: z.string().min(1, { message: "Service type is required" }).optional(),
  vehicleId: z
    .string()
    .min(1, { message: "Vehicle ID is required" })
    .optional(),
  totalAmount: z
    .number()
    .min(0, { message: "Total amount is required" })
    .optional(),
  nextServiceDate: z
    .string()
    .min(1, { message: "Next service date is required" })
    .optional(),
  nextServiceKm: z
    .number()
    .min(1, { message: "Next service kilometer is required" })
    .optional(),
  parts: z.array(
    z
      .object({
        partCode: z.string().min(1, { message: "Part code is required" }),
        description: z.string().min(1, { message: "Description is required" }),
        quantity: z.number().min(1, { message: "Quantity is required" }),
        rate: z.number().min(1, { message: "Rate is required" }),
        amount: z.number().min(1, { message: "Amount is required" }),
      })
      .optional()
  ),
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
    totalAmount: 0,
    parts: [],
  });

  const [parts, setParts] = useState<Part[]>([
    {
      partCode: "",
      description: "",
      quantity: 0,
      rate: 0,
      amount: 0,
    },
  ]);
  useEffect(() => {
    let total = 0;
    parts.forEach((part) => {
      const updatedAmount =
        part.rate && part.quantity ? (part.rate / 1000) * part.quantity : 0;
      part.amount = updatedAmount;
      total += updatedAmount;
    });

    setFormValues((prev) => ({
      ...prev,
      totalAmount: total,
      parts: parts,
    }));
  }, [parts]);

  // ! Remove this useEffect when you are done with the form
  useEffect(() => {
    console.log(formValues);
  }, [formValues]);

  return (
    <JobCardFormContext.Provider
      value={{
        formValues,
        setFormValues,
        parts,
        setParts,
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
