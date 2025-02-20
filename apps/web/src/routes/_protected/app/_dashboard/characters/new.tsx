import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { ToastAction } from '@/components/ui/toast';
import { useAuth } from '@/hooks/use-auth';
import { toast } from '@/hooks/use-toast';
import apiClient from '@/lib/axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { AxiosError } from 'axios';
import { Loader2Icon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const Route = createFileRoute(
  '/_protected/app/_dashboard/characters/new'
)({
  component: RouteComponent,
});

const formSchema = z.object({
  firstName: z.string().min(1).trim(),
  middleName: z.string().optional(),
  lastName: z.string().min(1),
  race: z.string().min(1).trim(),
  currentProffesion: z.string().min(1).trim(),
  previousProffesion: z.string().min(1).trim().optional(),
  sex: z.string(),
  age: z
    .string()
    .refine((value) => !isNaN(Number(value)) && Number(value) > 0, {
      message: 'Age must be a positive number',
    })
    .transform((value) => Number(value)),
  weight: z
    .string()
    .refine((value) => !isNaN(Number(value)) && Number(value) > 0, {
      message: 'Weight must be a positive number',
    })
    .transform((value) => Number(value)),
  height: z
    .string()
    .refine((value) => !isNaN(Number(value)) && Number(value) > 0, {
      message: 'Height must be a positive number',
    })
    .transform((value) => Number(value)),
  eyeColor: z.string().min(1).optional(),
  starSign: z.string().min(1).optional(),
  placeOfBirth: z.string().min(1).optional(),
  siblings: z
    .string()
    .refine(
      (value) => value === '' || (!isNaN(Number(value)) && Number(value) >= 0),
      {
        message: 'Siblings must be a non-negative number',
      }
    )
    .optional()
    .transform((value) => (value === '' ? undefined : Number(value))),
  description: z.string().optional(),
});

function RouteComponent() {
  const { user } = useAuth();

  const queryClient = useQueryClient();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      newCharacterMutation.mutate(values);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Coś poszło nie tak.',
      });
    }
  };

  const newCharacterMutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      try {
        const res = await apiClient.post('/api/v1/characters', {
          ...values,
          ownerId: user?.userId,
        });

        if (res.data) {
          form.reset();

          toast({
            description: 'Pomyślnie utworzono postać.',
          });

          router.navigate({ to: `/app/characters/${res.data.data.id}` });
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          switch (error.status) {
            case 409: {
              toast({
                title: 'Wystąpił problem',
                description: 'Postać o podanej nazwie już istnieje.',
                action: (
                  <ToastAction
                    altText="Try again"
                    onClick={() =>
                      newCharacterMutation.mutate(form.getValues())
                    }
                  >
                    Spróbuj ponownie
                  </ToastAction>
                ),
              });
              break;
            }
          }
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['characters'] });
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nowa postać</CardTitle>
        <CardDescription>Stwórz nową postać.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="character">
          <TabsList className="w-full mb-8">
            <TabsTrigger className="w-full" value="character">
              Postać
            </TabsTrigger>
            <TabsTrigger className="w-full" value="skills">
              Umiejętności
            </TabsTrigger>
            <TabsTrigger className="w-full" value="abilities">
              Zdolności
            </TabsTrigger>
          </TabsList>
          <TabsContent value="character">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="flex justify-between gap-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Imię</FormLabel>
                        <FormControl>
                          <Input placeholder="Alarith" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="middleName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Drugie imię</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Nazwisko</FormLabel>
                        <FormControl>
                          <Input placeholder="Valtaris" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="race"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Rasa</FormLabel>
                      <FormControl>
                        <Input placeholder="Krasnolud" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="currentProffesion"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Aktualna profesja</FormLabel>
                        <FormControl>
                          <Input placeholder="Łowca Wampirów" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="previousProffesion"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Poprzednia profesja</FormLabel>
                        <FormControl>
                          <Input placeholder="Najemnik" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="sex"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Płeć</FormLabel>
                        <FormControl>
                          <Input placeholder="M" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Wiek</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="25" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Wzrost</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={0}
                            max={300}
                            placeholder="170"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Waga</FormLabel>
                        <FormControl>
                          <Input
                            min={0}
                            max={300}
                            type="number"
                            placeholder="70"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="placeOfBirth"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Miejsce urodzenia</FormLabel>
                      <FormControl>
                        <Input placeholder="Altdorf" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="siblings"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Ilość rodzeństwa</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="2" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Opis postaci</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Wysoki, szczupły, z długimi włosami i zielonymi oczami. Urodzony w Altdorfie, w rodzinie kupieckiej. Ma dwóch braci i siostrę."
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex justify-between">
                  <Button type="submit">
                    {newCharacterMutation.isPending ? (
                      <Loader2Icon className="animate-spin" />
                    ) : (
                      'Stwórz postać'
                    )}
                  </Button>
                  <Button
                    type="reset"
                    variant="outline"
                    onClick={() => form.reset()}
                  >
                    Wyczyść
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
