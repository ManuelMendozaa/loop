'use client';

import { ModalStep } from '../../../types/process';

interface StepIndicatorProps {
  steps: ModalStep[];
  currentStep: ModalStep;
  onStepClick?: (step: ModalStep) => void;
}

export function StepIndicator({
  steps,
  currentStep,
  onStepClick,
}: StepIndicatorProps) {
  const currentIndex = steps.indexOf(currentStep);

  const handleClick = (step: ModalStep, index: number) => {
    if (index < currentIndex && onStepClick) {
      onStepClick(step);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {steps.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isClickable = isCompleted && !!onStepClick;

        return (
          <div key={step} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleClick(step, index)}
              disabled={!isClickable}
              className={`flex size-8 items-center justify-center rounded-full text-sm font-medium transition-all ${
                isCompleted || isCurrent
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              } ${
                isClickable
                  ? 'cursor-pointer hover:ring-2 hover:ring-primary/50 hover:ring-offset-2'
                  : 'cursor-default'
              }`}
            >
              {index + 1}
            </button>
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 w-8 ${
                  isCompleted ? 'bg-primary' : 'bg-muted'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
