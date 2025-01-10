import { toast } from '@/hooks/use-toast';
import apiClient from '@/lib/axios';
import { AxiosError } from 'axios';

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

export async function joinCampaignWithInvite(
  state: FormState,
  formData: FormData
) {
  try {
    const inviteCode = formData.get('code');

    const { data } = await apiClient.post(
      '/api/v1/invitations/join',
      {
        inviteCode,
      },
      { withCredentials: true }
    );

    toast({
      description: 'Pomyślnie dołączono do kampani.',
    });

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      switch (error.status) {
        case 400:
          toast({
            title: 'Błąd',
            description: 'Wprowadzony kod jest nieprawidłowy.',
          });
          break;
        case 410:
          toast({
            title: 'Błąd',
            description: 'Zaproszenie wygasło.',
          });
          break;
        case 403:
          toast({
            title: 'Błąd',
            description: 'Jesteś już w tej kampani.',
          });
          break;

        default:
          toast({
            description: 'Wystąpił nieznany problem. Spróbuj ponownie...',
          });
          break;
      }
    }

    console.log('Error.');
  }
}
