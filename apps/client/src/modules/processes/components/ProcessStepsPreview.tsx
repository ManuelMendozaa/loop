'use client';

import { ProcessStep, STEP_TYPES } from '../types/process';
import { Skeleton } from '@/src/common/Skeleton';
import { Card, CardContent } from '@/src/common/Card';

interface ProcessStepsPreviewProps {
  steps: ProcessStep[];
  isLoading?: boolean;
}

function ProcessStepsPreviewSkeleton() {
  return (
    <div className="flex flex-col items-center">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="flex flex-col items-center w-full">
          {/* Step card skeleton */}
          <Card className="w-full">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Skeleton className="size-8 rounded-full shrink-0" />
                <div className="flex-1">
                  <Skeleton className="h-5 w-40 mb-2" />
                  <Skeleton className="h-4 w-full max-w-70" />
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Connector */}
          {index < 3 && (
            <div className="h-6 border-l-2 border-dashed border-muted-foreground/30" />
          )}
        </div>
      ))}
    </div>
  );
}

function ProcessStepsPreviewEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <p className="text-muted-foreground text-sm">
        Selecciona un proceso para ver sus pasos
      </p>
    </div>
  );
}

export function ProcessStepsPreview({
  steps,
  isLoading,
}: ProcessStepsPreviewProps) {
  if (isLoading) {
    return <ProcessStepsPreviewSkeleton />;
  }

  if (steps.length === 0) {
    return <ProcessStepsPreviewEmpty />;
  }

  return (
    <div className="flex flex-col items-center">
      {steps.map((step, index) => {
        const stepType = STEP_TYPES.find((t) => t.value === step.type);
        const Icon = stepType?.icon;
        const isLast = index === steps.length - 1;

        return (
          <div key={step.id} className="flex flex-col items-center w-full">
            {/* Step card */}
            <Card className="w-full">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {Icon && (
                        <Icon className="size-4 text-muted-foreground shrink-0" />
                      )}
                      <p className="font-medium text-sm truncate">
                        {step.name}
                      </p>
                    </div>
                    <p className="text-muted-foreground text-xs mt-1 line-clamp-2">
                      {step.description}
                    </p>
                    {step.ingredients && step.ingredients.length > 0 && (
                      <p className="text-xs text-primary mt-2">
                        {step.ingredients.length} ingrediente
                        {step.ingredients.length > 1 ? 's' : ''}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Centered connector */}
            {!isLast && (
              <div className="h-6 border-l-2 border-dashed border-muted-foreground/30" />
            )}
          </div>
        );
      })}
    </div>
  );
}

export { ProcessStepsPreviewSkeleton };
