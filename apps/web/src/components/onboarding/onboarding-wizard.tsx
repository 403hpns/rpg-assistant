import apiClient from '@/lib/axios';
import { useState, useTransition } from 'react';
import { Card } from '../ui/card';
import { AboutMeWelcomeCard } from './wizard-about-me-card';
import { WizardContent } from './wizard-content';
import { WizardFooter } from './wizard-footer';
import { WizardHeader } from './wizard-header';

const data = {
  finished: false,
  currentQuestion: 0,
  questions: [
    {
      id: 0,
      question: 'Skąd wiesz o aplikacji?',
      options: [
        { id: 'friends', text: 'Od znajomych' },
        { id: 'cv', text: 'Z Twojego CV' },
        { id: 'random', text: 'Wynik wyszukiwania' },
        { id: 'other', text: 'Inne' },
      ],
      answer: '',
    },
    {
      id: 1,
      question: 'Jesteś...',
      options: [
        { id: 'player', text: 'Graczem' },
        { id: 'master', text: 'Mistrzem Gry' },
        { id: 'both', text: 'Jednym i drugim' },
        {
          id: 'none',
          text: 'Żadnym z wymienionych',
        },
      ],
      answer: '',
    },
  ],
};

export type WizardData = typeof data;

interface OnboardingWizardProps {
  username: string;
}

export function OnboardingWizard({ username }: OnboardingWizardProps) {
  const [wizardData, setWizardData] = useState<WizardData>(data);
  const [isPending, startTransition] = useTransition();

  const completeOnboarding = () => {
    startTransition(async () => {
      await apiClient.post(`/api/v1/onboarding`, {
        finished: true,
        options: wizardData.questions
          .filter((question) => question.answer)
          .map((question) => question.answer),
      });

      setWizardData((prev) => ({
        ...prev,
        finished: true,
      }));
    });
  };

  const isFirstQuestion = wizardData.currentQuestion === 0;
  const isLastQuestion =
    wizardData.currentQuestion === wizardData.questions.length - 1;

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      completeOnboarding();
      return;
    }

    setWizardData((prev) => ({
      ...prev,
      currentQuestion: prev.currentQuestion + 1,
    }));
  };

  const handlePreviousQuestion = () => {
    if (isFirstQuestion) return;
    setWizardData((prev) => ({
      ...prev,
      currentQuestion: prev.currentQuestion - 1,
    }));
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="min-w-[33.3%] max-w-[50%]">
        {wizardData.finished ? (
          <AboutMeWelcomeCard />
        ) : (
          <>
            <WizardHeader username={username} />

            <WizardContent
              wizardData={wizardData}
              onWizardDataChange={setWizardData}
            />

            <WizardFooter
              isFirstQuestion={isFirstQuestion}
              isLastQuestion={isLastQuestion}
              goNext={handleNextQuestion}
              goPrev={handlePreviousQuestion}
              canGoNext={
                !!wizardData.questions[wizardData.currentQuestion]?.answer
              }
              isPending={isPending}
            />
          </>
        )}
      </Card>
    </div>
  );
}
