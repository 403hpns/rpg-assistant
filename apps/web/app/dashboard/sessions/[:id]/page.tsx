"use client";

import { useState } from "react";
import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Input } from "@repo/ui/components/ui/input";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { Send, Dice1, Swords } from "lucide-react";
import { CombatScreen } from "@/components/combat-screen";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";

export default function SessionDashboard() {
  const [messages, setMessages] = useState<
    { sender: string; content: string }[]
  >([{ sender: "System", content: "Witaj w sesji! Możesz rozpocząć grę." }]);
  const [inputMessage, setInputMessage] = useState("");
  const [diceResult, setDiceResult] = useState<string | null>(null);
  const [showCombat, setShowCombat] = useState(false);

  const sendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { sender: "MG", content: inputMessage }]);
      setInputMessage("");
    }
  };

  const rollDice = (sides: number) => {
    const result = Math.floor(Math.random() * sides) + 1;
    setDiceResult(`Wynik rzutu k${sides}: ${result}`);
    setMessages([
      ...messages,
      { sender: "System", content: `Rzut k${sides}: ${result}` },
    ]);
  };

  return (
    <div className="container mx-auto flex flex-col min-h-screen">
      <div>
        <Card className="space-2">
          <CardHeader>
            <CardDescription>Aktywni uczestnicy</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-1.5">
            {[...Array(5)].map((u, i) => (
              <Avatar key={i}>
                <AvatarImage src="" alt="@shadcn" />
                <AvatarFallback>{i}</AvatarFallback>
              </Avatar>
            ))}
          </CardContent>
        </Card>
      </div>

      <main className="flex-1 container py-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="col-span-2 md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-1.5">
                Czat sesji{" "}
                <div className="bg-secondary rounded-full size-7 text-sm flex justify-center items-center">
                  {messages.length}
                </div>
              </CardTitle>
              <CardDescription>Porozmawiaj z drużyną</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] w-full pr-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className="mb-2 odd:bg-secondary/10 p-4 rounded"
                  >
                    <p className="font-semibold">{msg.sender}:</p>
                    <p>{msg.content}</p>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="flex w-full gap-2"
              >
                <Input
                  placeholder="Wpisz wiadomość..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                />
                <Button type="submit">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardFooter>
          </Card>
          <div className="col-span-2 md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Rzuty kośćmi</CardTitle>
                <CardDescription>Wykonaj rzuty różnymi kośćmi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {[4, 6, 8, 10, 12, 20, 100].map((sides) => (
                    <Button
                      key={sides}
                      onClick={() => rollDice(sides)}
                      variant="outline"
                    >
                      k{sides}
                    </Button>
                  ))}
                </div>
                {diceResult && (
                  <p className="mt-4 text-center font-semibold">{diceResult}</p>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Narzędzia MG</CardTitle>
                <CardDescription>
                  Dodatkowe opcje dla prowadzącego
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full"
                  variant={showCombat ? "destructive" : "default"}
                  onClick={() => setShowCombat(!showCombat)}
                >
                  <Swords className="mr-2 h-4 w-4" />
                  {showCombat ? "Zakończ walkę" : "Rozpocznij walkę"}
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Notatki sesji</CardTitle>
                <CardDescription>
                  Szybkie notatki do wykorzystania później
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Wpisz swoje notat
ki z sesji tutaj..."
                  className="min-h-[100px]"
                />
              </CardContent>
            </Card>
          </div>
        </div>
        {showCombat && (
          <div className="mt-6">
            <CombatScreen />
          </div>
        )}
      </main>
    </div>
  );
}
