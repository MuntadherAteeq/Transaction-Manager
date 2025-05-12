"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Loader2, RefreshCcw, RefreshCcwDotIcon } from "lucide-react";
import { CurrencySelector } from "@/components/Currency-Selector";
import useSWR from "swr";
import { updateSettings } from "./Profile.actions";

export function ProfileSettings() {
  const [currency, setCurrency] = useState("USD");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contactNumber: "",
    currency: "USD",
  });
  const [errors, setErrors] = useState({
    name: "",
    address: "",
    contactNumber: "",
    currency: "",
  });

  const {
    data,
    error,
    mutate,
    isLoading: isFetching,
  } = useSWR("/api/settings", (url) => fetch(url).then((res) => res.json()));

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const name =
        data.find((item) => item.name === "companyName")?.value || "";
      const address =
        data.find((item) => item.name === "companyAddress")?.value || "";
      const contactNumber =
        data.find((item) => item.name === "companyPhone")?.value || "";
      const companyCurrency =
        data.find((item) => item.name === "companyCurrency")?.value || "USD";

      setFormData({
        name,
        address,
        contactNumber,
        currency: companyCurrency,
      });

      setCurrency(companyCurrency);
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    // Clear error when user starts typing
    if (errors[id]) {
      setErrors((prev) => ({
        ...prev,
        [id]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: formData.name ? "" : "Company name is required",
      address: formData.address ? "" : "Company address is required",
      contactNumber: formData.contactNumber ? "" : "Contact number is required",
      currency: formData.currency ? "" : "Currency is required",
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleCurrencyChange = (value: any) => {
    setCurrency(value);
    setFormData((prev) => ({
      ...prev,
      currency: value,
    }));

    if (errors.currency) {
      setErrors((prev) => ({
        ...prev,
        currency: "",
      }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const formattedData = [
      { name: "companyName", value: formData.name },
      { name: "companyAddress", value: formData.address },
      { name: "companyPhone", value: formData.contactNumber },
      { name: "companyCurrency", value: formData.currency },
    ];

    try {
      await updateSettings(formattedData);
      toast.success("Profile settings updated successfully");
      mutate();
    } catch (error) {
      toast.error("Error updating profile settings");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    // Reset form to current data
    if (data && Array.isArray(data)) {
      const name =
        data.find((item) => item.name === "companyName")?.value || "";
      const address =
        data.find((item) => item.name === "companyAddress")?.value || "";
      const contactNumber =
        data.find((item) => item.name === "companyPhone")?.value || "";
      const companyCurrency =
        data.find((item) => item.name === "companyCurrency")?.value || "USD";

      setFormData({
        name,
        address,
        contactNumber,
        currency: companyCurrency,
      });

      setCurrency(companyCurrency);
    }

    // Clear any validation errors
    setErrors({
      name: "",
      address: "",
      contactNumber: "",
      currency: "",
    });
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        Error loading profile settings. Please try again later.
      </div>
    );
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

      <form onSubmit={handleSubmit}>
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
                    value={formData.name}
                    onChange={handleInputChange}
                    autoComplete="off"
                    autoCorrect="off"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Company Address</Label>
                  <Input
                    id="address"
                    placeholder="Enter company address"
                    value={formData.address}
                    onChange={handleInputChange}
                    autoComplete="off"
                    autoCorrect="off"
                  />
                  {errors.address && (
                    <p className="text-sm text-red-500">{errors.address}</p>
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
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    autoComplete="off"
                    autoCorrect="off"
                  />
                  {errors.contactNumber && (
                    <p className="text-sm text-red-500">
                      {errors.contactNumber}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Company Currency</Label>
                  <CurrencySelector
                    value={currency}
                    onChange={handleCurrencyChange}
                  />
                  {errors.currency && (
                    <p className="text-sm text-red-500">{errors.currency}</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={handleCancel}
            >
              <RefreshCcw />
              Reset
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
