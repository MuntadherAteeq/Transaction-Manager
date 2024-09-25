"use client"
import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Input } from "./ui/input"

import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { signUp } from "@/app/Auth/auth.actions"
import { useToast } from "@/hooks/use-toast"

// Updated schema with custom validation
export const SignUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    password2: z.string().min(6),
  })
  .refine((data) => data.password === data.password2, {
    message: "Passwords must match",
    path: ["password2"], // Set the error on the second password field
  })

export default function SignUpTab() {
  const router = useRouter()

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      password2: "",
    },
  })
  const popup = useToast()
  async function onSubmit(data: z.infer<typeof SignUpSchema>) {
    const res = await signUp(data)
    if (res.error)
      popup.toast({
        title: "Error",
        description: res.error,
        variant: "destructive",
        duration: 2000,
      })
    if (res.success) {
      router.push("/")
    }
  }
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
          <CardDescription>
            Sign in or create an account to begin managing your finances.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-2">
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
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.email?.message}
                    </FormMessage>
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input id="password" type="password" {...field} />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.password?.message}
                    </FormMessage>
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="password2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input id="password2" type="password" {...field} />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.password2?.message}
                    </FormMessage>
                  </FormItem>
                )}
              ></FormField>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="font-bold">
                Create Account
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  )
}
