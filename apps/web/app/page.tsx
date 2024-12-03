import Link from "next/link";
import { Button } from "@repo/ui/components/ui/button";
import { Badge } from "@repo/ui/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import {
  BookOpen,
  Users,
  Dice1Icon as Dice,
  Swords,
  ChevronRight,
  Dices,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="z-50 backdrop-blur-3xl opacity-95 fixed top-0 w-full left-0 lg:px-6 h-16 py-8 flex items-center bg-secondary/15">
        <Link className="flex items-center justify-center" href="/">
          <Dices className="h-6 w-6 text-primary" />
          <span className="ml-2 text-2xl font-bold">RPG Assistant</span>
        </Link>
        <div className="ml-auto flex gap-8">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#features"
          >
            Funkcje
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#testimonials"
          >
            Opinie
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#pricing"
          >
            Cennik
          </Link>
        </div>
      </nav>
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge>W trakcie rozwoju</Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Twój idealny Asystent RPG
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Prowadź epickie kampanie, zarządzaj sesjami i postaciami z
                  łatwością. RPG Assistant to wszystko, czego potrzebuje Mistrz
                  Gry.
                </p>
              </div>
              <div className="space-x-4">
                <Button variant="default" asChild size="lg">
                  <Link href="/login">Rozpocznij za darmo</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="#features">Dowiedz się więcej</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full py-12 md:py-24  bg-popover border-y"
        >
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Funkcje
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader>
                  <BookOpen className="w-10 h-10 text-primary mb-2" />
                  <CardTitle>Zarządzanie kampaniami</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Organizuj i śledź postępy w swoich epickich przygodach z
                    łatwością.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Users className="w-10 h-10 text-primary mb-2" />
                  <CardTitle>Karty postaci</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Twórz i zarządzaj kartami postaci graczy i NPC-ów w jednym
                    miejscu.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Dices className="w-10 h-10 text-primary mb-2" />
                  <CardTitle>Rzuty kośćmi</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Wbudowany system rzutów kośćmi dla wszystkich systemów RPG.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Swords className="w-10 h-10 text-primary mb-2" />
                  <CardTitle>Zarządzanie walką</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Prowadź dynamiczne walki z intuicyjnym systemem inicjatywy i
                    śledzenia obrażeń.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section
          id="testimonials"
          className="w-full py-12 md:py-24 lg:py-32 bg-secondary/15"
        >
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Co mówią nasi użytkownicy
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Niesamowite narzędzie!</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    "RPG Assistant zrewolucjonizował sposób, w jaki prowadzę
                    moje kampanie. Nie wyobrażam sobie teraz gry bez niego!"
                  </p>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    - Anna K., Mistrz Gry
                  </p>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Oszczędza mi mnóstwo czasu</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    "Dzięki RPG Assistant mogę skupić się na tworzeniu historii,
                    zamiast tracić czas na organizację. To niezbędne narzędzie
                    dla każdego MG."
                  </p>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    - Marek W., Twórca Kampanii
                  </p>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Intuicyjne i wszechstronne</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    "Prosta obsługa i bogactwo funkcji sprawiają, że RPG
                    Assistant to must-have dla każdego fana gier fabularnych."
                  </p>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    - Karolina S., Gracz RPG
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        <section
          id="pricing"
          className="w-full py-12 md:py-24 lg:py-32 bg-background"
        >
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Wybierz plan dla siebie
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Podstawowy</CardTitle>
                  <CardDescription>
                    Dla początkujących Mistrzów Gry
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">Za darmo</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4" />
                      Do 5 aktywnych kampani
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4" />
                      Do 100 kart postaci
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4" />
                      Podstawowe narzędzia MG
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Wybierz plan</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Zaawansowany</CardTitle>
                  <CardDescription>
                    Dla doświadczonych prowadzących
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">19,99 zł/mies</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4" />
                      Nielimitowane kampanie
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4" />
                      Nielimitowane karty postaci
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4" />
                      Zaawansowane narzędzia MG
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4" />
                      Priorytetowe wsparcie
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Wybierz plan</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <CardDescription>
                    Dla profesjonalnych twórców RPG
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">49,99 zł/mies</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4" />
                      Wszystko z planu Zaawansowanego
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4" />
                      Narzędzia do tworzenia własnych systemów
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4" />
                      Integracja z platformami streamingowymi
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4" />
                      Dedykowane wsparcie 24/7
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Wybierz plan</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">
          © 2024 RPG Assistant. Wszelkie prawa zastrzeżone.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Polityka prywatności
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Warunki korzystania
          </Link>
        </nav>
      </footer>
    </div>
  );
}
