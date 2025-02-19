import { ChartOne } from '@/components/chart-one';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { gql, useQuery } from '@apollo/client';
import { Link, createFileRoute } from '@tanstack/react-router';
import {
  Calendar,
  ChevronRight,
  FileText,
  ScrollText,
  Star,
  Sword,
  Users,
} from 'lucide-react';
import { useAuth } from '../../hooks/use-auth';

export const Route = createFileRoute('/app/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useAuth();
  const stats = [];

  const { data } = useQuery(gql`
    query GetUsers {
      getUsers {
        id
      }
    }
  `);

  return (
    <div className="container mx-auto flex flex-col">
      <h2 className="font-bold text-2xl py-4">Witaj, {user?.name}!</h2>
      <Separator />

      <div className="flex-1 container flex gap-4 py-6">
        <main className="flex-1 gap-4 grid">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Aktywne kampanie
                </CardTitle>
                <ScrollText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.campaignCount}</div>
                <p className="text-xs text-muted-foreground">
                  +{stats.newCampaignsThisWeek} nowe w tym tygodniu
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Aktywne sesje
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.sessionCount}</div>
                <p className="text-xs text-muted-foreground">
                  + {stats.newSessionsThisWeek} nowe w tym tygodniu
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Nadchodzące sesje
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.upcomingSessionCount}
                </div>
                <p className="text-xs text-muted-foreground">
                  Następna za {stats.daysToNextSession} dni
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Karty postaci
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15</div>
                <p className="text-xs text-muted-foreground">
                  5 wymaga aktualizacji
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Przedmioty w bazie
                </CardTitle>
                <Sword className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">132</div>
                <p className="text-xs text-muted-foreground">
                  +12 nowych w tym miesiącu
                </p>
              </CardContent>
            </Card>
          </div>

          <ChartOne />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle className="w-full flex items-center gap-2">
                  Nadchodzące wydarzenia <Badge>Moduł w trakcie rozwoju</Badge>
                </CardTitle>
                <CardDescription>
                  Zaplanowane sesje i ważne daty
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-center justify-between p-2 bg-secondary/5 rounded-lg">
                    <div className="flex items-center gap-4">
                      <Calendar className="h-6 w-6 text-primary" />
                      <div>
                        <p className="font-medium">
                          Sesja "Wielkie Imperium Kontraatakuje"
                        </p>
                        <p className="text-sm text-muted-foreground">
                          15.06.2023, 18:00
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-24">
                      Szczegóły
                    </Button>
                  </li>
                  <li className="flex items-center justify-between p-2 bg-secondary/5 rounded-lg">
                    <div className="flex items-center gap-4">
                      <Star className="h-6 w-6 text-primary" />
                      <div>
                        <p className="font-medium">Urodziny gracza: Janush</p>
                        <p className="text-sm text-muted-foreground">
                          18.06.2023
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-24">
                      Przypomnij
                    </Button>
                  </li>
                  <li className="flex items-center justify-between p-2 bg-accent/5 rounded-lg">
                    <div className="flex items-center gap-4">
                      <Calendar className="h-6 w-6 text-primary" />
                      <div>
                        <p className="font-medium">
                          Sesja "Mroczne Sekrety Altdorfu"
                        </p>
                        <p className="text-sm text-muted-foreground">
                          22.06.2023, 19:00
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-24">
                      Szczegóły
                    </Button>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="self-start">
              <CardHeader>
                <CardTitle>Szybkie akcje</CardTitle>
                <CardDescription>
                  Rozpocznij nową kampanię lub kontynuuj istniejącą
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Button asChild variant="outline" className="w-full">
                  <Link to="/app">
                    Stwórz nową kampanię <ChevronRight />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/app">
                    Zaplanuj nową sesję <ChevronRight />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        d
      </div>
    </div>
  );
}
