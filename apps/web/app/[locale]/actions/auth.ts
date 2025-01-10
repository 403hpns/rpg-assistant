import { z } from 'zod';
import { AxiosError } from 'axios';
import { toast } from '@/hooks/use-toast';
import apiClient from '@/lib/axios';
import { redirect } from 'next/navigation';
import { isRedirectError } from 'next/dist/client/components/redirect';

export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

const LoginSchema = z.object({
  name: z.string().min(1, { message: 'Nazwa użytkownika jest wymagana' }),
  password: z
    .string()
    .min(4, { message: 'Hasło musi mieć co najmniej 4 znaki' }),
});

export async function logOut() {
  try {
    const { status } = await apiClient.post('/api/v1/auth/logout', null, {
      withCredentials: true,
    });

    if (status === 201) {
      redirect('/login');
    }
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
  }
}

export async function signIn(prevState: FormState, formData: FormData) {
  const validatedFiels = LoginSchema.safeParse(Object.fromEntries(formData));

  if (!validatedFiels.success) {
    return {
      errors: validatedFiels.error.flatten().fieldErrors,
    };
  }

  const honeyPot = formData.get('honeyPot');

  if (honeyPot) {
    return {
      error: 'Bot detected',
    };
  }

  try {
    const { status } = await apiClient.post(
      '/api/v1/auth/login',
      validatedFiels.data,
      { withCredentials: true }
    );

    if (status === 200) {
      toast({
        description: 'Zalogowano pomyślnie!',
      });

      redirect('/dashboard');
    }
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof AxiosError) {
      switch (error.response?.status) {
        case 401:
        case 404:
          toast({
            title: 'Błąd logowania',
            description: 'Nieprawidłowa nazwa lub hasło.',
          });
          break;
        default:
          toast({
            title: 'Nieznany błąd',
            description: 'Wystąpił nieznany błąd. Spróbuj ponownie później.',
          });
          break;
      }
    } else {
      toast({
        title: 'Błąd',
        description: 'Wystąpił problem. Spróbuj ponownie.',
      });
    }
  }
}

export async function signUp(state: FormState, formData: FormData) {
  const honeyPotDetected = formData.get('honeyPot');
  if (honeyPotDetected) {
    return {
      error: 'Bot detected',
    };
  }

  const validatedFiels = LoginSchema.safeParse({
    name: formData.get('name'),
    password: formData.get('password'),
  });

  if (!validatedFiels.success) {
    return {
      errors: validatedFiels.error.flatten().fieldErrors,
    };
  }

  //
}
