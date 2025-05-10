"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { CurrencySelector } from "@/components/Currency-Selector";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const CompanyProfileSchema = z.object({
  name: z.string().min(1, "Company name is required"),
  address: z.string().min(1, "Company address is required"),
  contactNumber: z.string().min(1, "Contact number is required"),
  currency: z.string().min(1, "Currency is required"),
});

type CompanyProfile = z.infer<typeof CompanyProfileSchema>;

export function ProfileSettings() {
  const {
    data,
    error,
    mutate,
    isLoading: isFetching,
  } = useSWR<CompanyProfile>(`/api/CompanyProfile`, (url: string) =>
    fetch(url).then((res) => res.json())
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CompanyProfile>({
    resolver: zodResolver(CompanyProfileSchema),
    defaultValues: data,
  });

  const onSubmit = async (formData: CompanyProfile) => {

  };

  if (isFetching) {
    return <Loader2 className="animate-spin" />;
  }

  if (error) {
    return <div>Error loading profile settings</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Company Profile Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your company profile and preferences
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="shadow-sm">
          <CardContent className="space-y-6 pt-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Avatar className="h-20 w-20 border">
                <AvatarImage alt="Company Logo" />
                <AvatarFallback className="text-lg">CO</AvatarFallback>
              </Avatar>
              <Button type="button" variant="outline">
                Change Logo
              </Button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Company Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter company name"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-red-500">{errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Company Address</Label>
                  <Input
                    id="address"
                    placeholder="Enter company address"
                    {...register("address")}
                  />
                  {errors.address && (
                    <p className="text-red-500">{errors.address.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactNumber">Contact Number</Label>
                  <Input
                    id="contactNumber"
                    type="text"
                    placeholder="+973 173789"
                    {...register("contactNumber")}
                  />
                  {errors.contactNumber && (
                    <p className="text-red-500">
                      {errors.contactNumber.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Company Currency</Label>
                  <CurrencySelector
                    value={data?.currency || ""} // Provide a default empty string
                    onChange={(value) => {
                      reset((prev) => ({ ...prev, currency: value }));
                    }}
                  />
                  {errors.currency && (
                    <p className="text-red-500">{errors.currency.message}</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save changes"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
