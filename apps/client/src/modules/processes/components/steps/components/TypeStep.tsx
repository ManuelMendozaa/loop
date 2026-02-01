'use client';

import { STEP_TYPES } from '../../../types/process';
import { useStep } from '../../../hooks/useStep';

export function TypeStep() {
  const { step, setStep } = useStep();

  return (
    <div className="grid grid-cols-2 gap-3">
      {STEP_TYPES.map((type) => {
        const Icon = type.icon;
        return (
          <button
            key={type.value}
            type="button"
            onClick={() => {
              setStep((prev) => ({ ...prev, type: type.value }));
            }}
            className={`rounded-lg border p-4 text-left transition-all duration-150 active:scale-[0.97] ${
              step?.type === type.value
                ? 'border-primary bg-primary/5'
                : 'hover:border-primary/50 hover:bg-muted/50'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
                  step?.type === type.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <Icon className="size-5" />
              </div>
              <div>
                <p className="font-medium">{type.label}</p>
                <p className="text-muted-foreground mt-1 text-xs">
                  {type.description}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
