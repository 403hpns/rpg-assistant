import { Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { CardFooter } from '../ui/card';

interface WizardFooterProps {
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  goNext: () => void;
  goPrev: () => void;
  canGoNext: boolean;
  isPending: boolean;
}

export const WizardFooter = ({
  isFirstQuestion,
  isLastQuestion,
  goNext,
  goPrev,
  canGoNext,
  isPending,
}: WizardFooterProps) => {
  return (
    <CardFooter className="bg-muted/50 flex items-center py-4">
      {!isFirstQuestion && <Button onClick={goPrev}>Wróć</Button>}
      <Button
        className="ml-auto"
        disabled={!canGoNext || isPending}
        onClick={goNext}>
        {isLastQuestion ? (
          <span className="flex items-center gap-2">
            {isPending && <Loader2 className="animate-spin" />}
            Zakończ
          </span>
        ) : (
          'Dalej'
        )}
      </Button>
    </CardFooter>
  );
};
