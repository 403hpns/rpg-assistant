import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/use-auth';
import { Link, useNavigate } from '@tanstack/react-router';
import { Loader2Icon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Nazwa użytkownika jest wymagana' }),
  password: z
    .string()
    .min(4, { message: 'Hasło musi mieć co najmniej 4 znaki' }),
});

export function LoginForm() {
  const { login, isLoading } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate({ from: '/auth/login' });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await login(values.name, values.password);
    navigate({ to: '/app' });
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">{t('login.card.title')}</CardTitle>
        <CardDescription>{t('login.card.description')}</CardDescription>
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
                    <FormLabel>{t('login.form.inputs.name.label')}</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder={t('login.form.inputs.name.placeholder')}
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
                    <FormLabel>
                      {t('login.form.inputs.password.label')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={t(
                          'login.form.inputs.password.placeholder'
                        )}
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
              disabled={isLoading}
              data-cy="login-button"
            >
              {isLoading ? (
                <div className="flex items-center gap-1.5">
                  <Loader2Icon className="animate-spin" /> Logowanie...
                </div>
              ) : (
                <>{t('login.form.submit')}</>
              )}
            </Button>

            <div className="mt-4 text-center text-sm">
              {t('login.card.footer.noAccountText')}{' '}
              <Link to="/auth/register" className="underline">
                {t('login.card.footer.noAccountCta')}
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
