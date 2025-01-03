"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import apiClient from "@/lib/axios";
import { useAuth } from "@/hooks/use-auth";

const formSchema = z.object({
  campaign: z.string({ required_error: "Musisz wybrać kampanię." }),
  name: z.string({ required_error: "Musisz nadać nazwę kampani." }),
  description: z.string().optional(),
  date: z.string(),
  time: z.string(),
  duration: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => val >= 1, {
      message: "Wprowadź liczbę większą lub równą 1.",
    })
    .optional(),
});

export default function NewSessionPage() {
  const { user } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const mutation = useMutation({
    mutationFn: async (formValues: z.infer<typeof formSchema>) => {
      const { data } = await apiClient.post("/api/v1/sessions", {
        ...formValues,
        ownerId: user?.id,
      });

      if (data.success) {
        toast({
          title: "Operacja udana",
          description: "Pomyślnie utworzono sesję.",
        });
      }
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    mutation.mutate(values);

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto py-6">
        <Card>
          <CardHeader>
            <CardTitle>Nowa sesja</CardTitle>
            <CardDescription>
              Wypełnij poniższe pola, aby zaplanować nową sesję.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="campaign"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kampania</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        {...field}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Wybierz kampanię" />
                          </SelectTrigger>
                        </FormControl>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nazwa sesji</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="np. Pod Wichrowym Wzgórzem"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Opis sesji</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="np. Bohaterowie docierają do Wichrowego Wzgórza, gdzie czeka na nich kolejna przygoda."
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data sesji</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Godzina rozpoczęcia</FormLabel>
                      <FormControl>
                        <Input {...field} type="time" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Przewidywany czas trwania</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          placeholder="12"
                          {...field}
                        />
                      </FormControl>

                      <FormDescription>
                        Wprowadź liczbę godzin jaką przewidujesz na sesję.
                      </FormDescription>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Zaplanuj sesję</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}