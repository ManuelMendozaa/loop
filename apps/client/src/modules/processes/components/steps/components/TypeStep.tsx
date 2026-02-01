'use client';

import {
  ChefHat,
  Factory,
  ClipboardCheck,
  Package,
  Truck,
  Settings,
  LucideIcon,
} from 'lucide-react';
import { StepType, STEP_TYPES } from '../../../types/process';

interface TypeStepProps {
  value: StepType | null;
  onChange: (type: StepType) => void;
}

const STEP_TYPE_ICONS: Record<StepType, LucideIcon> = {
  preparation: ChefHat,
  production: Factory,
  quality_check: ClipboardCheck,
  packaging: Package,
  shipping: Truck,
  custom: Settings,
};

export function TypeStep({ value, onChange }: TypeStepProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {STEP_TYPES.map((type) => {
        const Icon = STEP_TYPE_ICONS[type.value];
        return (
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
            <div className="flex items-start gap-3">
              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
                  value === type.value
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
