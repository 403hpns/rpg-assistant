import { useTranslation } from 'react-i18next';
import { CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

export function WizardHeader({ username }: { username: string }) {
  const { t } = useTranslation();

  return (
    <CardHeader>
      <CardTitle>
        {t('app.index.greetings')},{' '}
        {username ? (
          <>{username}</>
        ) : (
          <Skeleton className="inline-block h-4 w-[100px]" />
        )}
        👋
      </CardTitle>
      <CardDescription>
        Wypełnij krótką ankietę, dzięki której lepiej się poznamy.
      </CardDescription>
    </CardHeader>
  );
}
