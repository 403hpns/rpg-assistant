"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@repo/ui/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import apiClient from "@/lib/axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, { message: "Nazwa użytkownika jest wymagana" }),
  password: z
    .string()
    .min(4, { message: "Hasło musi mieć co najmniej 4 znaki" }),
});

export function LoginForm() {
  const { push } = useRouter();

  const mutation = useMutation({
    mutationFn: async (formData: z.infer<typeof formSchema>) => {
      return await apiClient.post("/api/v1/auth/login", formData, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      push("/dashboard");
    },
    onError: (error: any) => {
      console.error("Błąd logowania:", error);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Wprowadź dane, aby zalogować się na swoje konto
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              {/* Nazwa użytkownika */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nazwa użytkownika</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Podaj nazwę użytkownika"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Hasło */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hasło</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Podaj hasło"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Logowanie..." : "Zaloguj się"}
            </Button>

            <div className="mt-4 text-center text-sm">
              Nie masz konta?{" "}
              <a href="/register" className="underline">
                Zarejestruj się
              </a>
            </div>

            <div className="text-sm text-center">
              <a href="/" className="underline">
                Wejdź jako gość
              </a>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
