'use client';

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
import { Textarea } from '@/components/ui/textarea';
import { ToastAction } from '@/components/ui/toast';
import { useAuth } from '@/hooks/use-auth';
import { toast } from '@/hooks/use-toast';
import apiClient from '@/lib/axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1).trim(),
  description: z.string().optional(),
});

export default function Page() {
  const { user } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const getGameCampaigns = async () => {
    //
    const { data } = await apiClient.get('/api/v1/campaigns');
    return data;
  };

  const query = useQuery({
    queryKey: ['game-sessions'],
    queryFn: getGameCampaigns,
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      newCampaignMutation.mutate(values);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Coś poszło nie tak.',
      });
    }
  };

  const newCampaignMutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const { data } = await apiClient.post('/api/v1/campaigns', {
        ...values,
        ownerId: user?.id,
      });

      if (data.success) {
        form.reset();

        toast({
          description: `Pomyślnie utworzono kampanię ${values.name}.`,
        });
      } else {
        toast({
          title: 'Wystąpił problem',
          description: 'Nie udało się stworzyć kampani.',
          action: (
            <ToastAction altText="Try again">Spróbuj ponownie</ToastAction>
          ),
        });
      }
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nowa kampania</CardTitle>
        <CardDescription>Stwórz nową kampanię.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nazwa kampani</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="np. Rozgniewane Athel Loren"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opis kampani</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Kampania opowiadająca o rozgniewanym smoku w Athel Loren"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" disabled={newCampaignMutation.isPending}>
              {newCampaignMutation.isPending ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                'Stwórz kampanię'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
