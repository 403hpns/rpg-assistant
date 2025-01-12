'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';

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
import apiClient from '@/lib/axios';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

const formSchema = z
  .object({
    name: z.string().min(1, { message: 'Nazwa użytkownika jest wymagana' }),
    email: z.string().email({ message: 'Podaj poprawny adres e-mail' }),
    password: z
      .string()
      .min(4, { message: 'Hasło musi mieć co najmniej 4 znaki' }),
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'Hasła muszą być takie same',
      });
    }
  });

export function RegisterForm() {
  const t = useTranslations('register');

  const mutation = useMutation({
    mutationFn: async (formData: z.infer<typeof formSchema>) => {
      return await apiClient.post('/api/v1/auth/register', formData, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      console.log('Zalogowano pomyślnie');
      window.location.href = '/login';
    },
    onError: (error: any) => {
      console.error('Błąd logowania:', error);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      password: '',
      email: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">{t('card.title')}</CardTitle>
        <CardDescription>{t('card.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.inputs.name.label')}</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder={t('form.inputs.name.placeholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.inputs.email.label')}</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t('form.inputs.email.placeholder')}
                        {...field}
                      />
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
                    <FormLabel>{t('form.inputs.password.label')}</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={t('form.inputs.password.placeholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t('form.inputs.confirmPassword.label')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={t(
                          'form.inputs.confirmPassword.placeholder'
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4">
              <Button
                type="submit"
                className="w-full"
                disabled={mutation.isPending}>
                {mutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin" />
                    Rejestrowanie...
                  </span>
                ) : (
                  <>{t('form.submit')}</>
                )}
              </Button>
              <Link href="/login">
                <Button variant="outline" className="w-full">
                  {t('form.back')}
                </Button>
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
