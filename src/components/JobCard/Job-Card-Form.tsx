"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import PartsTable from "./Parts-Table";

// Define the schema for the form
const formSchema = z.object({
  date: z.string().min(1, { message: "Date is required" }),
  km: z
    .string()
    .min(1, { message: "Kilometer reading is required" })
    .transform(Number),
  operator: z.string().min(1, { message: "Operator name is required" }),
  department: z.string().min(1, { message: "Department is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  type: z.string().optional(),
  vehicleId: z
    .string()
    .min(1, { message: "Vehicle ID is required" })
    .transform(Number),
  nextServiceDate: z
    .string()
    .min(1, { message: "Next service date is required" }),
  nextServiceKm: z
    .string()
    .min(1, { message: "Next service kilometer is required" })
    .transform(Number),
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

export function JobCardForm() {
  const router = useRouter();
  const [parts, setParts] = useState<Part[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      km: 0,
      operator: "",
      department: "",
      description: "",
      type: "",
      vehicleId: 0,
      nextServiceDate: "",
      nextServiceKm: 0,
    },
  });

  // Update total amount when parts change
  const updateTotalAmount = (newParts: Part[]) => {
    const total = newParts.reduce((sum, part) => sum + part.amount, 0);
    setTotalAmount(total);
  };

  // Handle parts changes
  const handlePartsChange = (newParts: Part[]) => {
    setParts(newParts);
    updateTotalAmount(newParts);
  };

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Prepare the data for submission
      const jobCardData = {
        ...values,
        totalAmount,
        parts: parts.map((part) => ({
          partCode: part.partCode,
          description: part.description,
          quantity: part.quantity,
          rate: part.rate,
          amount: part.amount,
        })),
      };

      // Here you would typically send the data to your API
      console.log("Submitting job card:", jobCardData);

      // Show success message
      toast("Job Card Created", {
        description: "The job card has been successfully created.",
      });

      // Redirect to job cards list
      router.push("/job-cards");
    } catch (error) {
      console.error("Error submitting job card:", error);
      toast.error("Error", {
        description:
          "There was an error creating the job card. Please try again.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="km"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kilometer Reading</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="operator"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Operator</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="vehicleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle ID</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-full w-full bg-card" >
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="regular">Regular</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nextServiceDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Next Service Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nextServiceKm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Next Service KM</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea rows={3} {...field} className="bg-card" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </CardContent>
        <PartsTable />
      </form>
    </Form>
  );
}
