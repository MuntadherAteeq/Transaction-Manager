"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
import { File, SendHorizonal } from "lucide-react";
import Link from "next/link";
import { JobCard, Vehicle } from "@prisma/client";
import { AutoComplete } from "@/components/Autocomplete";
// Define the schema for the form
const formSchema = z.object({
  date: z.string().min(1, { message: "Date is required" }),
  km: z.string().min(0, { message: "Kilometer reading is required" }),
  operator: z.string().min(1, { message: "Operator name is required" }),
  department: z.string().min(1, { message: "Department is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  type: z.string().min(1, { message: "Service type is required" }),
  vehicleId: z.string().min(1, { message: "Vehicle ID is required" }),
  nextServiceDate: z
    .string()
    .min(0, { message: "Next service date is required" }),
  nextServiceKm: z
    .string()
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

export function JobCardForm(props: { editable?: boolean; jobCard?: JobCard }) {
  const [editable, setEditable] = useState(props.editable ?? false);
  const router = useRouter();
  const [parts, setParts] = useState<Part[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const [vehicles, setVehicles] = useState<Vehicle[] | undefined>(undefined);
  const vehiclesNo = useMemo(() => {
    if (!vehicles) return undefined;
    return vehicles.map((vehicle) => vehicle.vehicleNo);
  }, [vehicles]);

  // Fetch vehicles from the API
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("/api/vehicles", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch vehicles");
        }
        const data = await response.json();
        console.log("Fetched vehicles:", data);
        setVehicles(data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, []);

  // ![TODO] - Delete this useEffect when the form is ready
  useEffect(() => {
    setEditable(true);
  }, []);

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      km: "",
      operator: "",
      department: "",
      description: "",
      type: "",
      vehicleId: "",
      nextServiceDate: "",
      nextServiceKm: "",
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
      // Validate the form
      const isValid = await form.trigger();
      if (!isValid) {
        toast.error("Error", {
          description: "Please fill in all required fields.",
        });

        return;
      }

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

      // Show success message
      toast("Job Card Created", {
        description: "The job card has been successfully created.",
      });

      // Redirect to job cards list
      setEditable(false);
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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div>
              <h2 className="text-4xl font-bold tracking-tight mb-4">
                No: 0001
              </h2>
            </div>
            <div>
              {editable ? (
                <AreYouSureDialog onSubmit={() => onSubmit(form.getValues())}>
                  <Button className="mb-4 flex items-center justify-center">
                    <span>Submit</span>
                    <SendHorizonal className="ml-2 " />
                  </Button>
                </AreYouSureDialog>
              ) : (
                <Link href="/jobCards/invoice">
                  <Button
                    variant="success"
                    className="mb-4 flex items-center justify-center"
                  >
                    <span>Invoice</span>
                    <File className="ml-2 " />
                  </Button>
                </Link>
              )}
            </div>
          </div>

          <Card>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input disabled={!editable} type="date" {...field} />
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
                      <Input
                        disabled={!editable}
                        type="number"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          form.clearErrors("km");
                        }}
                      />
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
                      <Input
                        disabled={!editable}
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          form.clearErrors("operator");
                        }}
                      />
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
                    <FormLabel>Site / Department</FormLabel>
                    <FormControl>
                      <Input
                        disabled={!editable}
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          form.clearErrors("department");
                        }}
                      />
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
                      <AutoComplete
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          form.clearErrors("vehicleId");
                        }}
                        disabled={!editable}
                      />
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
                    <FormLabel>Vehicle Type</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        form.clearErrors("type");
                      }}
                      defaultValue={field.value}
                      disabled={!editable}
                    >
                      <FormControl>
                        <SelectTrigger className="h-full w-full ">
                          <SelectValue placeholder="Select service type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Passenger Car">
                          Passenger Car
                        </SelectItem>
                        <SelectItem value="Motorcycle">Motorcycle</SelectItem>
                        <SelectItem value="Bus">Bus</SelectItem>
                        <SelectItem value="Commercial Vehicle">
                          Commercial Vehicle
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="h-5" />
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
                      <Input
                        disabled={!editable}
                        type="date"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          form.clearErrors("nextServiceDate");
                        }}
                      />
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
                      <Input
                        type="number"
                        disabled={!editable}
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          form.clearErrors("nextServiceKm");
                        }}
                      />
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
                      <FormLabel>Problem Description</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={3}
                          {...field}
                          disabled={!editable}
                          onChange={(e) => {
                            field.onChange(e);
                            form.clearErrors("description");
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </CardContent>
        <PartsTable />
      </form>
    </Form>
  );
}

export function AreYouSureDialog(props: {
  onSubmit: () => void;
  children: React.ReactNode;
}) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{props.children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              Are you sure you want to submit this form? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              variant="default"
              type="submit"
              onClick={() => {
                props.onSubmit();
              }}
            >
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
