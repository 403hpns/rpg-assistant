'use server';

import { redirect } from '@tanstack/react-router';

export async function signIn(_: any, formData: FormData) {
  const name = formData.get('name');
  const password = formData.get('password');

  if (!name || !password) {
    return { error: 'Nazwa użytkownika i hasło są wymagane' };
  }

  try {
    const response = await fetch('/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, password }),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || 'Nieprawidłowe dane logowania' };
    }

    throw redirect({
      to: '/auth/login',
      search: { redirect: location.href },
    });

    return { success: true };
  } catch (error) {
    return { error: 'Wystąpił błąd podczas logowania' };
  }
}
