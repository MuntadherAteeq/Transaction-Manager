"use client";

import { useState } from "react";
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
import { File, Loader2, SendHorizonal } from "lucide-react";
import Link from "next/link";
import { JobCard, VehicleType } from "@prisma/client";
import { JobCardSchema, useJobCardForm } from "./form-store";
import { createJobCard } from "./Jobcard.actions";
import { useRouter } from "next/navigation";
import useSWR from "swr";
// Define the schema for the form

export function JobCardForm(props: { editable?: boolean; jobCard?: JobCard }) {
  const [editable, setEditable] = useState(props.editable ?? false);
  const { parts, setParts, formValues, setFormValues } = useJobCardForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    data: VehiclesTypes = [],
    error,
    mutate,
    isLoading,
  } = useSWR<VehicleType[]>("/api/vehicleTypes", {
    fetcher: (url: string) => fetch(url).then((res) => res.json()),
  });
  // Fetch vehicles from the API

  // Initialize the form
  const form = useForm<z.infer<typeof JobCardSchema>>({
    resolver: zodResolver(JobCardSchema),
    defaultValues: {
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
    },
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof JobCardSchema>) => {
    // set the form value parts to the parts state and remove the last part
    form.setValue("parts", parts.slice(0, -1));
    form.setValue("totalAmount", formValues.totalAmount); // Set the total amount in the form values
    console.log("Form values:", form.getValues());
    try {
      // Prepare the data for submission

      // Validate the form
      const isValid = await form.trigger();
      if (!isValid) {
        toast.error("Error", {
          description: "Please fill in all required fields.",
        });

        return;
      }

      const res = await createJobCard(form.getValues());
      if (res && "error" in res) {
        toast.error("Error", {
          description: res.error,
        });
        return;
      }
      if (res && "jobCard" in res) {
        router.push(`/App/JobCards/${res.jobCard.id}`);
        setLoading(true);
      }
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
              {!editable && (
                <h2 className="text-4xl font-bold tracking-tight mb-4">
                  No: {props.jobCard?.id.toString().padStart(5, "0")}
                </h2>
              )}
            </div>
            <div>
              {editable ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      disabled={loading}
                      className="mb-4 flex items-center justify-center"
                    >
                      {loading ? (
                        <Loader2 className="mx-2 h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <span>Submit</span>
                          <SendHorizonal className="ml-2 " />
                        </>
                      )}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Are you sure?</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to submit this form? This action
                        cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end space-x-2">
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button
                          disabled={loading}
                          variant="default"
                          type="submit"
                          onClick={() => {
                            onSubmit(form.getValues());
                          }}
                        >
                          {loading ? (
                            <Loader2 className="mx-2 h-4 w-4 animate-spin" />
                          ) : (
                            <span>Submit</span>
                          )}
                        </Button>
                      </DialogClose>
                    </div>
                  </DialogContent>
                </Dialog>
              ) : (
                <Link href={`/App/JobCards/${props.jobCard?.id}/Invoice`}>
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
                      {props.jobCard?.date ? (
                        <Input
                          disabled={true}
                          type="text"
                          value={new Date(
                            props.jobCard.date
                          ).toLocaleDateString("en-GB")}
                        />
                      ) : (
                        <Input disabled={!editable} type="date" {...field} />
                      )}
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
                        type="text"
                        {...field}
                        onChange={(e) => {
                          const intValue = parseInt(e.target.value, 10) || ""; // Convert to integer
                          field.onChange(intValue); // Update the form value
                          form.clearErrors("km"); // Clear any validation errors
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
                      <Input
                        disabled={!editable}
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          form.clearErrors("vehicleId");
                        }}
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
                          <SelectValue
                            placeholder={
                              isLoading ? "loading..." : "Select type"
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {VehiclesTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name}
                          </SelectItem>
                        ))}
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
                        {...field}
                        disabled={!editable}
                        type="date"
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
                        {...field}
                        type="text"
                        disabled={!editable}
                        onChange={(e) => {
                          const intValue = parseInt(e.target.value, 10) || ""; // Convert to integer
                          field.onChange(intValue); // Update the form value
                          form.clearErrors("nextServiceKm"); // Clear any validation errors
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
        <PartsTable editable={editable} />
      </form>
    </Form>
  );
}

export function AreYouSureDialog(props: {
  onSubmit: () => void;
  children: React.ReactNode;
}) {
  return <></>;
}
