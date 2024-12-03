import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui/tabs";
import {
  PlusCircle,
  Search,
  Users,
  Calendar,
  MapPin,
  Scroll,
} from "lucide-react";
import Link from "next/link";

export default function CampaignsPage() {
  const campaigns = [
    {
      id: 1,
      title: "Wielkie Imperium Kontraatakuje",
      description: "Epicka kampania w świecie Warhammera Fantasy",
      players: 5,
      sessions: 12,
      nextSession: "15.06.2023",
      location: "Online (Discord)",
    },
    {
      id: 2,
      title: "Mroczne Sekrety Altdorfu",
      description: "Śledztwo w stolicy Imperium",
      players: 4,
      sessions: 8,
      nextSession: "22.06.2023",
      location: "Dom Marka",
    },
    {
      id: 3,
      title: "Klątwa Morslieba",
      description: "Horror w cieniu czerwonego księżyca",
      players: 6,
      sessions: 15,
      nextSession: "29.06.2023",
      location: "Online (Roll20)",
    },
  ];

  return (
    <div className="container mx-auto flex flex-col min-h-screen">
      <main className="flex-1 container py-6">
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
                <Link href="/campaigns/new">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Nowa kampania
                </Link>
              </Button>
            </div>
          </div>
          <TabsContent value="active" className="space-y-4">
            {campaigns.map((campaign) => (
              <Card key={campaign.id}>
                <CardHeader>
                  <CardTitle>{campaign.title}</CardTitle>
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
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{campaign.location}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-1.5">
                  <Button variant="outline">Szczegóły</Button>
                  <Button>Uruchom kampanię</Button>
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
