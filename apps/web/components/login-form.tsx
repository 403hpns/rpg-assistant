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
import { signIn } from '@/app/[locale]/actions/auth';
import { useTranslations } from 'next-intl';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Nazwa użytkownika jest wymagana' }),
  password: z
    .string()
    .min(4, { message: 'Hasło musi mieć co najmniej 4 znaki' }),
});

export function LoginForm() {
  const [state, action, pending] = useActionState(signIn, undefined);
  const t = useTranslations('login');

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
        <CardTitle className="text-2xl">{t('card.title')}</CardTitle>
        <CardDescription>{t('card.description')}</CardDescription>
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
                    <FormLabel>{t('form.inputs.name.label')}</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder={t('form.inputs.name.placeholder')}
                        data-cy="username"
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
                    <FormLabel>{t('form.inputs.password.label')}</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={t('form.inputs.password.placeholder')}
                        data-cy="password"
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
              disabled={pending}
              data-cy="login-button">
              {pending ? (
                <div className="flex items-center gap-1.5">
                  <Loader2Icon className="animate-spin" /> Logowanie...
                </div>
              ) : (
                <>{t('form.submit')}</>
              )}
            </Button>

            <div className="mt-4 text-center text-sm">
              {t('card.footer.noAccountText')}{' '}
              <a href="/register" className="underline">
                {t('card.footer.noAccountCta')}
              </a>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
