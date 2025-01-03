'use client';

import { useEffect, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { Loader2Icon } from 'lucide-react';

export const AboutMeWelcomeCard = () => {
  useEffect(() => {
    launchFireworks();
  }, []);

  const launchFireworks = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  const [isPending, startTransition] = useTransition();

  return (
    <>
      <CardHeader>
        <CardTitle>😎 Cool!</CardTitle>
        <CardDescription>To już wszystkie pytania.</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <p>
            Dziękuję za odpowiedzi i zainteresowanie się aplikacją. Miłego
            korzystania!
          </p>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 flex items-center py-4">
        <Link href="/dashboard" className="ml-auto">
          <Button
            disabled={isPending}
            onClick={() => startTransition(() => undefined)}>
            {isPending ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              'Przejdź do panelu'
            )}
          </Button>
        </Link>
      </CardFooter>
    </>
  );
};
