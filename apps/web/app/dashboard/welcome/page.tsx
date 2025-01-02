'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';
import { useEffect, useMemo, useState, useTransition } from 'react';
import { setCookie } from 'cookies-next/client';
import confetti from 'canvas-confetti';
import { Loader2Icon } from 'lucide-react';

const questions = [
  {
    id: 0,
    question: 'Skąd wiesz o aplikacji?',
    answers: [
      { id: 'friends', text: 'Od znajomych' },
      { id: 'cv', text: 'Z Twojego CV' },
      { id: 'random', text: 'Wynik wyszukiwania' },
      { id: 'other', text: 'Inne' },
    ],
  },
  {
    id: 1,
    question: 'Jesteś...',
    answers: [
      { id: 'player', text: 'Graczem' },
      { id: 'master', text: 'Mistrzem Gry' },
      { id: 'both', text: 'Jednym i drugim' },
      {
        id: 'none',
        text: 'Żadnym z wymienionych',
      },
    ],
  },
];

export default function WelcomeWizardPage() {
  const [completed, setCompleted] = useState(false);

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="min-w-[33.3%] max-w-[50%]">
        {completed ? (
          <AboutMeWelcomeCard />
        ) : (
          <WelcomeWizardQuestions
            completed={completed}
            onCompletedChange={(state) => setCompleted(state)}
          />
        )}
      </Card>
    </div>
  );
}

interface WelcomeWizardQuestionsProps {
  completed: boolean;
  onCompletedChange: (state: boolean) => void;
}

const WelcomeWizardQuestions = ({
  completed,
  onCompletedChange,
}: WelcomeWizardQuestionsProps) => {
  const { user } = useAuth();

  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const currentQuestionData = useMemo(
    () => questions[currentQuestion],
    [currentQuestion]
  )!;

  const setNextQuestion = () => {
    if (isLastQuestion) {
      onCompletedChange(true);
    }

    setCurrentQuestion((prev) => ++prev);
  };

  const setPreviousQuestion = () => {
    if (isFirstQuestion) return;
    setCurrentQuestion((prev) => --prev);
  };

  const isFirstQuestion = currentQuestion === 0;
  const isLastQuestion = currentQuestion === questions.length - 1;

  if (!user) return null;

  return (
    <>
      <CardHeader>
        <CardTitle>Witaj, {user.name} 👋</CardTitle>
        <CardDescription>
          Wypełnij krótką ankietę, dzięki której lepiej się poznamy.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 flex-col">
          <div>
            <p className="text-muted-foreground text-sm">
              Pytanie {currentQuestion + 1} z {questions.length}
            </p>
            <p className="font-semibold text-lg">
              {currentQuestionData.question}
            </p>
          </div>

          <div className="grid gap-4 grid-cols-2">
            {currentQuestionData.answers.map((answer) => (
              <div key={answer.id} className="flex items-center space-x-2">
                <div
                  onClick={() => setSelectedAnswer(answer.id)}
                  className={`relative ${selectedAnswer === answer.id && 'bg-muted/50 before:absolute before:-right-2 before:-top-2 before:w-4 before:h-4 before:rounded-full before:bg-muted-foreground before:border before:border-muted/50 before:flex before:items-center before:justify-center before:content-["✓"] '} cursor-pointer hover:border-muted border-muted/50 border w-full rounded-lg p-4 flex gap-2 items-center text-sm font-medium leading-none`}>
                  {answer.text}
                </div>
              </div>
            ))}

            {completed && <div>Super!</div>}
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 flex items-center py-4">
        {!isFirstQuestion && (
          <Button onClick={setPreviousQuestion}>Wróć</Button>
        )}
        <Button
          className="ml-auto"
          disabled={!selectedAnswer}
          onClick={setNextQuestion}>
          {isLastQuestion ? 'Zakończ' : 'Dalej'}
        </Button>
      </CardFooter>
    </>
  );
};

const AboutMeWelcomeCard = () => {
  const finishOnboarding = async () => {
    startTransition(() => {
      setCookie('onboarding', 'true');
    });
  };

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
          {/* <ConfettiButton onClick={finishOnboarding} /> */}

          <Button disabled={isPending} onClick={finishOnboarding}>
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
