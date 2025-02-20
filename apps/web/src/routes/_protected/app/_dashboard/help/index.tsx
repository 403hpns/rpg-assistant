import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/app/_dashboard/help/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Pomoc</CardTitle>
          <CardDescription>
            Znalazłeś błąd? Potrzebujesz pomocy?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <a
            className="underline"
            href="mailto:dev.403hpns@pm.me?subject=TRPG Assistant Help"
          >
            dev.403hpns@pm.me
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
