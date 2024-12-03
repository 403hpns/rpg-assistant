import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { Textarea } from "@repo/ui/components/ui/textarea";

export default function NewSessionPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto py-6">
        <Card>
          <CardHeader>
            <CardTitle>Nowa sesja</CardTitle>
            <CardDescription>
              Wypełnij poniższe pola, aby zaplanować nową sesję
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6 w-1/3">
              <div
                className="grid gap-4 md:grid-
cols-2"
              >
                <div className="space-y-2">
                  <Label htmlFor="campaign">Kampania</Label>
                  <Select>
                    <SelectTrigger id="campaign">
                      <SelectValue placeholder="Wybierz kampanię" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="empire">
                        Wielkie Imperium Kontraatakuje
                      </SelectItem>
                      <SelectItem value="altdorf">
                        Mroczne Sekrety Altdorfu
                      </SelectItem>
                      <SelectItem value="morrslieb">
                        Klątwa Morslieba
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Data Sesji</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Godzina Rozpoczęcia</Label>
                  <Input id="time" type="time" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">
                    Przewidywany Czas Trwania (godziny)
                  </Label>
                  <Input
                    id="duration"
                    type="number"
                    min="1"
                    max="12"
                    placeholder="4"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Miejsce Sesji</Label>
                <Input
                  id="location"
                  placeholder="Np. Online (Discord) lub adres fizyczny"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="players">Gracze</Label>
                <Textarea
                  id="players"
                  placeholder="Lista graczy (jeden na linię)"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Opis Sesji</Label>
                <Textarea
                  id="description"
                  placeholder="Krótki opis planowanej sesji, główne wydarzenia, cele..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notatki dla MG</Label>
                <Textarea
                  id="notes"
                  placeholder="Prywatne notatki, przypomnienia, ważne punkty fabuły..."
                />
              </div>
              <Button type="submit" className="w-full">
                Zaplanuj Sesję
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
