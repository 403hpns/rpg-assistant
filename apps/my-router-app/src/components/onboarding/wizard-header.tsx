import { CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

export function WizardHeader({ username }: { username: string }) {
  return (
    <CardHeader>
      <CardTitle>
        Witaj,{' '}
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
