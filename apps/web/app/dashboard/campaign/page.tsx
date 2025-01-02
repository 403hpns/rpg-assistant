'use client';
import { signIn } from '@/app/actions/auth';
import { joinCampaignWithInvite } from '@/app/actions/join-campaign-by-code';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon } from 'lucide-react';
import { startTransition, useActionState, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Nazwa użytkownika jest wymagana' }),
  description: z.string().optional(),
});

const joinCampaignSchema = z.object({
  code: z.string().min(1, { message: 'Nazwa użytkownika jest wymagana' }),
});

export default function FirstCampaignPage() {
  const [cardStatus, setCardStatus] = useState<'create' | 'join'>('create');

  return (
    <div className="flex items-center justify-center h-screen">
      {cardStatus === 'create' ? (
        <NewFirstCampaignCard onCardStatusChange={setCardStatus} />
      ) : (
        <JoinFirstCampaignCard onCardStatusChange={setCardStatus} />
      )}
    </div>
  );
}

interface NewFirstCampaignCardProps {
  onCardStatusChange: (status: 'create' | 'join') => void;
}

function NewFirstCampaignCard({
  onCardStatusChange,
}: NewFirstCampaignCardProps) {
  const [state, action, pending] = useActionState(signIn, undefined);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = form.handleSubmit(() => {
    startTransition(() => {
      action(new FormData(formRef.current!));
    });
  });

  return (
    <Card className="lg:min-w-[25%] lg:max-w-[25%]">
      <CardHeader>
        <CardTitle>Tworzenie pierwszej kampani</CardTitle>
        <CardDescription>
          Stwórz swoją pierwszą kampanię jako Mistrz Gry.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            ref={formRef}
            action={action}
            onSubmit={onSubmit}
            className="space-y-6">
            <FormField
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nazwa kampani</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Rozgniewane Athel Loren"
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

            <Button className="w-full">Stwórz kampanię</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="bg-muted/50 p-4 grid gap-3">
        <Button onClick={() => onCardStatusChange('join')} variant="secondary">
          Dołącz do istniejącej jako gracz
        </Button>
      </CardFooter>
    </Card>
  );
}

interface JoinFirstCampaignCardProps {
  onCardStatusChange: (status: 'create' | 'join') => void;
}

function JoinFirstCampaignCard({
  onCardStatusChange,
}: JoinFirstCampaignCardProps) {
  const [state, action, pending] = useActionState(
    joinCampaignWithInvite,
    undefined
  );

  const form = useForm<z.infer<typeof joinCampaignSchema>>({
    resolver: zodResolver(joinCampaignSchema),
  });

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = form.handleSubmit(() => {
    startTransition(() => {
      action(new FormData(formRef.current!));
    });
  });

  return (
    <Card className="lg:min-w-[25%] lg:max-w-[25%]">
      <CardHeader>
        <CardTitle>Dołącz do istniejącej kampani</CardTitle>
        <CardDescription>
          Wprowadź kod zaproszenia, aby dołączyć do kampani.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            ref={formRef}
            action={action}
            onSubmit={onSubmit}
            className="space-y-6">
            <FormField
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kod zaproszenia</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="np. 153b0392-df6d-45bc-9ebf-7a8d5b45f1fc"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button disabled={pending} className="w-full">
              {pending ? (
                <span className="flex items-center gap-1.5">
                  <Loader2Icon className="animate-spin" /> Dołączanie
                </span>
              ) : (
                'Dołącz'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="bg-muted/50 p-4 grid gap-3">
        <Button
          onClick={() => onCardStatusChange('create')}
          variant="secondary">
          Stwórz własną kampanię
        </Button>
      </CardFooter>
    </Card>
  );
}
