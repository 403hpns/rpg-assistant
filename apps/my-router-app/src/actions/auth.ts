export async function signIn(_: any, formData: FormData) {
  const name = formData.get('name');
  const password = formData.get('password');

  if (!name || !password) {
    return { error: 'Nazwa użytkownika i hasło są wymagane' };
  }

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || 'Nieprawidłowe dane logowania' };
    }

    return { success: true };
  } catch (error) {
    return { error: 'Wystąpił błąd podczas logowania' };
  }
}
