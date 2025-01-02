import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sword, Shield, Heart, Skull } from "lucide-react";

interface Combatant {
  id: number;
  name: string;
  initiative: number;
  health: number;
  maxHealth: number;
}

export function CombatScreen() {
  const [combatants, setCombatants] = useState<Combatant[]>([
    { id: 1, name: "Gracz 1", initiative: 15, health: 20, maxHealth: 20 },
    { id: 2, name: "Wróg 1", initiative: 12, health: 15, maxHealth: 15 },
    { id: 3, name: "Gracz 2", initiative: 18, health: 25, maxHealth: 25 },
  ]);
  const [newCombatant, setNewCombatant] = useState({ name: "", initiative: 0 });

  const addCombatant = () => {
    if (newCombatant.name) {
      setCombatants([
        ...combatants,
        {
          id: Date.now(),
          name: newCombatant.name,
          initiative: newCombatant.initiative,
          health: 20,
          maxHealth: 20,
        },
      ]);
      setNewCombatant({ name: "", initiative: 0 });
    }
  };

  const updateHealth = (id: number, change: number) => {
    setCombatants(
      combatants.map((c) =>
        c.id === id
          ? {
              ...c,
              health: Math.max(0, Math.min(c.health + change, c.maxHealth)),
            }
          : c
      )
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Ekran Walki</CardTitle>
        <CardDescription>
          Zarządzaj inicjatywą i zdrowiem uczestników walki
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] w-full pr-4">
          {combatants
            .sort((a, b) => b.initiative - a.initiative)
            .map((combatant) => (
              <div
                key={combatant.id}
                className="flex items-center justify-between mb-4 p-2 bg-secondary/10 rounded-lg"
              >
                <div>
                  <p className="font-semibold">{combatant.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Inicjatywa: {combatant.initiative}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateHealth(combatant.id, -1)}
                  >
                    <Sword className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span>
                      {combatant.health}/{combatant.maxHealth}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateHealth(combatant.id, 1)}
                  >
                    <Shield className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateHealth(combatant.id, 1)}
                  >
                    <Skull className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addCombatant();
          }}
          className="flex w-full gap-2"
        >
          <div className="grid w-full gap-1.5">
            <Label htmlFor="name">Nazwa</Label>
            <Input
              id="name"
              value={newCombatant.name}
              onChange={(e) =>
                setNewCombatant({ ...newCombatant, name: e.target.value })
              }
              placeholder="Nowy uczestnik"
            />
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="initiative">Inicjatywa</Label>
            <Input
              id="initiative"
              type="number"
              value={newCombatant.initiative}
              onChange={(e) =>
                setNewCombatant({
                  ...newCombatant,
                  initiative: parseInt(e.target.value) || 0,
                })
              }
              placeholder="Inicjatywa"
            />
          </div>
          <Button type="submit" className="mt-auto">
            Dodaj
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
