import { CardContent } from '@/components/ui/card';
import { WizardData } from './onboarding-wizard';
import { SetStateAction, useMemo } from 'react';

interface _WizardContentProps {
  wizardData: WizardData;
  onWizardDataChange: (prevState: SetStateAction<WizardData>) => void;
}

export const WizardContent = ({
  wizardData,
  onWizardDataChange,
}: _WizardContentProps) => {
  const { currentQuestion, questions } = wizardData;

  const currentQuestionData = useMemo(() => {
    return currentQuestion >= 0 && currentQuestion < questions.length
      ? questions[currentQuestion]
      : null;
  }, [wizardData]);

  const handleAnswerSelect = (answerId: string) => {
    onWizardDataChange((prevState) => ({
      ...prevState,
      questions: prevState.questions.map((question, index) => ({
        ...question,
        answer: index === currentQuestion ? answerId : question.answer,
      })),
    }));
  };

  return (
    <CardContent>
      <div className="flex gap-4 flex-col">
        <div>
          <p className="text-muted-foreground text-sm">
            Pytanie {currentQuestion + 1} z {questions.length}
          </p>
          <p className="font-semibold text-lg">
            {questions[currentQuestion]?.question}
          </p>
        </div>

        <div className="grid gap-4 grid-cols-2">
          {currentQuestionData?.options.map((answer) => (
            <div
              key={answer.id}
              className="flex items-center space-x-2"
              onClick={() => handleAnswerSelect(answer.id)}>
              <div
                className={`relative ${
                  currentQuestionData?.answer === answer.id &&
                  'bg-muted/50 before:absolute before:-right-2 before:-top-2 before:w-4 before:h-4 before:rounded-full before:bg-muted-foreground before:border before:border-muted/50 before:flex before:items-center before:justify-center before:content-["✓"] '
                } cursor-pointer hover:border-muted border-muted/50 border w-full rounded-lg p-4 flex gap-2 items-center text-sm font-medium leading-none`}>
                {answer.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </CardContent>
  );
};
