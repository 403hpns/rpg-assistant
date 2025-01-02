'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader2Icon } from 'lucide-react';
import { startTransition, useActionState, useRef } from 'react';
import { signIn } from '@/app/actions/auth';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Nazwa użytkownika jest wymagana' }),
  password: z
    .string()
    .min(4, { message: 'Hasło musi mieć co najmniej 4 znaki' }),
});

export function LoginForm() {
  const [state, action, pending] = useActionState(signIn, undefined);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      password: '',
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = form.handleSubmit(() => {
    startTransition(() => {
      action(new FormData(formRef.current!));
    });
  });

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Wprowadź dane, aby zalogować się na swoje konto.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            ref={formRef}
            action={action}
            onSubmit={onSubmit}
            className="space-y-6">
            <div className="space-y-4">
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

            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? (
                <div className="flex items-center gap-1.5">
                  <Loader2Icon className="animate-spin" /> Logowanie...
                </div>
              ) : (
                'Zaloguj się'
              )}
            </Button>

            <div className="mt-4 text-center text-sm">
              Nie masz konta?{' '}
              <a href="/register" className="underline">
                Zarejestruj się
              </a>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
