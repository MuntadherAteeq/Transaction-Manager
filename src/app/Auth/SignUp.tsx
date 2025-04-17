"use client";

import React, { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AlertCircle, Loader2, User } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import { redirect, useRouter } from "next/navigation";

// Define the form schema with Zod
const SignUpSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
    image: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof SignUpSchema>;
type FormErrors = Partial<Record<keyof FormData, string>>;

const SignUpForm = () => {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear the specific field error when the user starts typing again
    if (formErrors[name as keyof FormData]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (1MB = 1048576 bytes)
    if (file.size > 1048576) {
      setFormErrors((prev) => ({
        ...prev,
        image: "Avatar image must be less than 1MB",
      }));
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      setFormErrors((prev) => ({
        ...prev,
        image: "Please upload an image file",
      }));
      return;
    }

    setFormErrors((prev) => ({ ...prev, image: undefined }));

    // Convert image to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setForm((prev) => ({ ...prev, image: base64 }));
      setAvatarPreview(base64);
    };
    reader.readAsDataURL(file);
  };

  const validateForm = (): boolean => {
    try {
      SignUpSchema.parse(form);
      setFormErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: FormErrors = {};
        error.errors.forEach((err) => {
          const path = err.path[0] as keyof FormData;
          errors[path] = err.message;
        });
        setFormErrors(errors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Form validation passed
    const { data, error } = await authClient.signUp.email(
      {
        name: form.name,
        email: form.email,
        password: form.password,
        image: form.image,
      },
      {
        onRequest: (ctx) => {
          // Handle request start (e.g., show a loading spinner)
          setLoading(true);
        },
        onSuccess: (ctx) => {
          // Handle successful response (e.g., redirect to a different page)
          console.log("Sign up successful:", ctx.data);
          setLoading(false);
         },
        onError: (ctx) => {
          setLoading(false);
          setFormErrors((prev) => ({
            ...prev,
            image: ctx.error.message,
          }));
        },
      }
    );

    // Here you would typically send the data to your backend
  };

  return (
    <Card className="  gap-0">
      <div className="flex flex-row px-6 pt-6 justify-between items-start">
        <div className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
          <CardDescription>Create an account to get started</CardDescription>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <div
            className="relative group cursor-pointer hover:outline-5  hover:outline-blue-500 rounded-full"
            onClick={handleAvatarClick}
          >
            <Avatar className="w-24 h-24 border-transparent  ">
              {avatarPreview ? (
                <AvatarImage
                  src={avatarPreview}
                  className="object-cover"
                  alt="Avatar preview"
                />
              ) : (
                <AvatarFallback className="bg-card border-3 border-muted-foreground/50 ">
                  <User className="w-12 h-12 text-accent-foreground/50 " />
                </AvatarFallback>
              )}
            </Avatar>

            <div className="absolute inset-0 flex items-center justify-center bg-background bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <i className="icon-[line-md--cloud-alt-upload-filled] text-6xl opacity-50" />
            </div>
          </div>

          <Input
            ref={fileInputRef}
            id="image"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />

          <p className="text-xs text-center text-gray-500">Max size: 1MB</p>
        </div>
      </div>

      <CardContent className="pt-6">
        {formErrors.image && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{formErrors.image}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              className={`border-1 ${
                formErrors.name
                  ? "border-red-500"
                  : "border-muted-foreground/50"
              }`}
            />
            {formErrors.name && (
              <p className="text-sm text-red-500">{formErrors.name}</p>
            )}
          </div>
          {/* Email Field */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleInputChange}
              className={`border-1 ${
                formErrors.email
                  ? "border-red-500"
                  : "border-muted-foreground/50"
              }`}
            />
            {formErrors.email && (
              <p className="text-sm text-red-500">{formErrors.email}</p>
            )}
          </div>
          {/* Password Field */}
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleInputChange}
              className={`border-1 ${
                formErrors.password
                  ? "border-red-500"
                  : "border-muted-foreground/50"
              }`}
            />
            {formErrors.password && (
              <p className="text-sm text-red-500">{formErrors.password}</p>
            )}
          </div>
          {/* Confirm Password Field */}
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleInputChange}
              className={`border-1 ${
                formErrors.confirmPassword
                  ? "border-red-500"
                  : "border-muted-foreground/50"
              }`}
            />
            {formErrors.confirmPassword && (
              <p className="text-sm text-red-500">
                {formErrors.confirmPassword}
              </p>
            )}
          </div>

          <Button disabled={loading} type="submit" className="w-full font-bold">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {!loading && "Sign Up"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="inline px-6 pt-6 ">
        By signing up, you agree to our
        <a
          href="#"
          className="inline text-primary hover:underline px-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms of Service
        </a>
        and
        <a
          href="#"
          className="inline text-primary hover:underline px-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>
      </CardFooter>
    </Card>
  );
};

export default SignUpForm;
