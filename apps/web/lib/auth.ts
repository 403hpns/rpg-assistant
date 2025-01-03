import { cookies } from 'next/headers';
import apiClient from '@/lib/axios';

export async function getServerSession() {
  const cookieStore = await cookies();
  const jwt = cookieStore.get('access_token')?.value;

  if (!jwt) {
    return null;
  }

  try {
    const { data } = await apiClient.get('/api/v1/auth/me', {
      headers: {
        Cookie: `access_token=${jwt}`,
      },
      withCredentials: true,
    });

    return data;
  } catch (error) {
    console.error('Błąd walidacji sesji:', error);
    return null;
  }
}
