'use client';

import React from 'react';
import { StepType, STEP_TYPES } from '../../../types/process';

interface TypeStepProps {
  value: StepType | null;
  onChange: (type: StepType) => void;
}

export function TypeStep({ value, onChange }: TypeStepProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {STEP_TYPES.map((type) => (
        <button
          key={type.value}
          type="button"
          onClick={() => onChange(type.value)}
          className={`rounded-lg border p-4 text-left transition-colors ${
            value === type.value
              ? 'border-primary bg-primary/5'
              : 'hover:border-primary/50 hover:bg-muted/50'
          }`}
        >
          <p className="font-medium">{type.label}</p>
          <p className="text-muted-foreground mt-1 text-xs">
            {type.description}
          </p>
        </button>
      ))}
    </div>
  );
}
