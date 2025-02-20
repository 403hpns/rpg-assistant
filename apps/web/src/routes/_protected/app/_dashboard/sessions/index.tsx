import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link, createFileRoute } from '@tanstack/react-router';
import {
  Calendar,
  Clock,
  MapPin,
  PlayCircle,
  Scroll,
  Users,
} from 'lucide-react';

export const Route = createFileRoute('/_protected/app/_dashboard/sessions/')({
  component: RouteComponent,
});

const sessions = [
  {
    id: 1,
    campaignName: 'Wielkie Imperium Kontraatakuje',
    date: '2023-06-15',
    time: '19:00',
    duration: '4 godziny',
    players: 5,
    location: 'Online (Discord)',
    description:
      'Bohaterowie zmierzą się z inwazją Chaosu na przedmieściach Altdorfu.',
    status: 'scheduled',
  },
  {
    id: 2,
    campaignName: 'Mroczne Sekrety Altdorfu',
    date: '2023-06-18',
    time: '20:00',
    duration: '3 godziny',
    players: 4,
    location: 'Dom Marka',
    description:
      'Śledztwo w sprawie tajemniczych morderstw w dzielnicy portowej nabiera tempa.',
    status: 'scheduled',
  },
  {
    id: 3,
    campaignName: 'Klątwa Morslieba',
    date: '2023-06-10',
    time: '18:30',
    duration: '5 godzin',
    players: 6,
    location: 'Online (Roll20)',
    description:
      'Drużyna odkryła starożytny artefakt związany z czerwonym księżycem.',
    status: 'completed',
  },
];

function RouteComponent() {
  return (
    <div className="container mx-auto flex flex-col min-h-screen">
      <main className="flex-1 container">
        <Tabs defaultValue="upcoming" className="space-y-4">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="upcoming">Nadchodzące</TabsTrigger>
              <TabsTrigger value="past">Zakończone</TabsTrigger>
            </TabsList>
            <Button asChild>
              <Link to="/app/sessions/new">
                <Calendar className="h-4 w-4 mr-2" />
                Zaplanuj nową sesję
              </Link>
            </Button>
          </div>
          <TabsContent value="upcoming" className="space-y-4">
            {sessions
              .filter((session) => session.status === 'scheduled')
              .map((session) => (
                <Card key={session.id}>
                  <CardHeader>
                    <CardTitle>{session.campaignName}</CardTitle>
                    <CardDescription>Sesja #{session.id}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{session.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {session.time} ({session.duration})
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{session.players} graczy</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{session.location}</span>
                      </div>
                      <div className="flex items-center gap-2 md:col-span-2">
                        <Scroll className="h-4 w-4 text-muted-foreground" />
                        <span>{session.description}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Edytuj</Button>
                    <Button>
                      Rozpocznij <PlayCircle />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </TabsContent>
          <TabsContent value="past" className="space-y-4">
            {sessions
              .filter((session) => session.status === 'completed')
              .map((session) => (
                <Card key={session.id}>
                  <CardHeader>
                    <CardTitle>{session.campaignName}</CardTitle>
                    <CardDescription>
                      Sesja #{session.id} - Zakończona
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{session.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {session.time} ({session.duration})
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{session.players} graczy</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{session.location}</span>
                      </div>
                      <div className="flex items-center gap-2 md:col-span-2">
                        <Scroll className="h-4 w-4 text-muted-foreground" />
                        <span>{session.description}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Szczegóły</Button>
                    <Button variant="secondary">Zobacz podsumowanie</Button>
                  </CardFooter>
                </Card>
              ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
