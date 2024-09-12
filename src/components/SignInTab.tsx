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
import { signIn } from "@/app/Auth/signIn"
import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export default function SignInTab() {
  const [error, setError] = useState("")

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  async function onSubmit(data: z.infer<typeof SignInSchema>) {
    const res = await signIn(data)
    setError(res.error)
  }
  return (
    <>
      <Card>
        {error && (
          <div className="p-6 pb-0">
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {error || "An error occurred"}
              </AlertDescription>
            </Alert>
          </div>
        )}
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
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
            </CardContent>
            <CardFooter>
              <Button type="submit" className="font-bold">
                Log In
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  )
}
