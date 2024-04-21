"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import * as z from "zod"

import { LoginSchema } from "@/schemas"

import { CardWrapper } from "@/components/auth/card-wrapper"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import FormError from "@/components/form-error"
import FormSuccess from "@/components/form-success"
import { useState, useTransition } from "react"
import { login } from "@/actions/login"

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>("")
  const [successMessage, setSuccessMessage] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      nickname: "",
      password: "",
    },
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setErrorMessage("")
    setSuccessMessage("")
    startTransition(async () => {
      const loginResponse = await login(values)
      setErrorMessage(loginResponse.error)

      // if (loginResponse.success) {
      //   setSuccessMessage(loginResponse.success)
      // }
    })
  }

  return (
    <CardWrapper
      headerLabel="Willkommen zurück"
      backButtonLabel="Du hast noch keinen Zugang?"
      backButtonHref="/auth/register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nickname</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="johndoe" type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="******" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={errorMessage} />
          <FormSuccess message={successMessage} />
          <Button type="submit" disabled={isPending} className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default LoginForm
