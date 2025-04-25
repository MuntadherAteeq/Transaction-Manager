"use client";

import React, { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Loader2, User } from "lucide-react";
import { z } from "zod";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

// Define the form schema with Zod
export const SignUpSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    roles: z
      .array(z.enum(["User", "Admin"]))
      .min(1, "Please select at least one role"),
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

export const SignUpForm = (props: any) => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      roles: [],
      image: undefined,
    },
  });

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (1MB = 1048576 bytes)
    if (file.size > 1048576) {
      alert("Avatar image must be less than 1MB");
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    // Convert image to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      form.setValue("image", base64);
      setAvatarPreview(base64);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
  };

  return (
    <Card className="gap-0" {...props}>
      <div className="flex flex-row px-6 pt-6 justify-between items-start">
        <div className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
          <CardDescription>Create an account to get started</CardDescription>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <div
            className="relative group cursor-pointer hover:outline-5 hover:outline-blue-500 rounded-full"
            onClick={handleAvatarClick}
          >
            <Avatar className="w-24 h-24 border-transparent">
              {avatarPreview ? (
                <AvatarImage
                  src={avatarPreview}
                  className="object-cover"
                  alt="Avatar preview"
                />
              ) : (
                <AvatarFallback className="bg-card border-3 border-muted-foreground/50">
                  <User className="w-12 h-12 text-accent-foreground/50" />
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
        <Form {...props} onSubmit={onSubmit}>
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    placeholder="user@example.com"
                    className="border-1 border-muted-foreground/50"
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.email?.message}
                </FormMessage>
              </FormItem>
            )}
          ></FormField>

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    id="password"
                    type="password"
                    className={`border-1 ${
                      form.formState.errors.password
                        ? "border-red-500"
                        : "border-muted-foreground/50"
                    }`}
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.password?.message}
                </FormMessage>
              </FormItem>
            )}
          ></FormField>

          {/* Confirm Password Field */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    id="confirmPassword"
                    type="password"
                    className={`border-1 ${
                      form.formState.errors.confirmPassword
                        ? "border-red-500"
                        : "border-muted-foreground/50"
                    }`}
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.confirmPassword?.message}
                </FormMessage>
              </FormItem>
            )}
          ></FormField>

          <Button disabled={loading} type="submit" className="w-full font-bold">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {!loading && "Sign Up"}
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
