import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCampaigns } from '@/hooks/use-campaigns';
import { Link, createFileRoute } from '@tanstack/react-router';
import { Calendar, PlusCircle, Scroll, Search, Users } from 'lucide-react';

export const Route = createFileRoute('/_protected/app/_dashboard/campaigns/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { campaigns, isLoading } = useCampaigns();

  return (
    <div className="container mx-auto flex flex-col min-h-screen">
      <main className="flex-1 container">
        <Tabs defaultValue="active" className="space-y-4">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="active">Aktywne</TabsTrigger>
              <TabsTrigger value="archived">Archiwum</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Szukaj kampanii"
                  className="pl-8 w-[250px]"
                />
              </div>
              <Button asChild>
                <Link to="/app/campaigns/new">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Nowa kampania
                </Link>
              </Button>
            </div>
          </div>
          <TabsContent value="active" className="space-y-4">
            {!isLoading &&
              campaigns.map((campaign) => (
                <Card key={campaign.id}>
                  <CardHeader>
                    <CardTitle>{campaign.name}</CardTitle>
                    <CardDescription>{campaign.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{campaign.players} graczy</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Scroll className="h-4 w-4 text-muted-foreground" />
                        <span>{campaign.sessions} sesji</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Następna sesja: {campaign.nextSession}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-1.5">
                    <Button variant="outline">Szczegóły</Button>
                    <Button>Przejdź do kampani</Button>
                  </CardFooter>
                </Card>
              ))}
          </TabsContent>
          <TabsContent value="archived">
            <Card>
              <CardHeader>
                <CardTitle>Archiwum Kampanii</CardTitle>
                <CardDescription>
                  Tu znajdziesz zakończone lub wstrzymane kampanie.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Brak zarchiwizowanych kampanii.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
