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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { AxiosError } from 'axios';
import { Loader2Icon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const Route = createFileRoute('/_protected/app/_dashboard/campaigns/new')({
  component: RouteComponent,
});

const formSchema = z.object({
  name: z.string().min(1).trim(),
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
      try {
        const { data, status } = await apiClient.post('/api/v1/campaigns', {
          ...values,
          ownerId: user?.userId,
        });

        if (data.success) {
          form.reset();

          toast({
            description: `Pomyślnie utworzono kampanię ${values.name}.`,
          });

          router.navigate({ to: `/app/campaigns/${data.data.id}` });
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          switch (error.status) {
            case 409: {
              toast({
                title: 'Wystąpił problem',
                description: 'Kampania o podanej nazwie już istnieje.',
                action: (
                  <ToastAction
                    altText="Try again"
                    onClick={() => newCampaignMutation.mutate(form.getValues())}
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
      queryClient.invalidateQueries({ queryKey: ['game-campaigns'] });
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
