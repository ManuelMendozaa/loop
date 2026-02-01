'use client';

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

import { Button } from '@/src/common/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/src/common/Dialog';
import {
  ProcessStep,
  MODAL_STEPS,
  ModalStep,
  OutputVariable,
} from '../../types/process';
import { StepIndicator } from './components/StepIndicator';
import { TypeStep } from './components/TypeStep';
import { DetailsStep } from './DetailsStep';
import { TimingStep } from './TimingStep';
import { VariablesStep } from './VariablesStep';
import { ReviewStep } from './ReviewStep';
import { DUMMY_PRODUCTS } from '@/src/modules/products/utils/dummy';
import { Provider } from '@/src/modules/providers/types';
import { useStep } from '../../hooks/useStep';

interface AddStepModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (step: Omit<ProcessStep, 'id' | 'order'>) => void;
  step?: ProcessStep;
  providers: Provider[];
}

const getStepTitles = (): Record<ModalStep, string> => ({
  type: 'Select Step Type',
  details: 'Step Details',
  timing: 'Timing & Assignment',
  variables: 'Output Variables',
  review: 'Review Changes',
});

const getStepDescriptions = (): Record<ModalStep, string> => ({
  type: 'Choose the type of process step you want to add',
  details: 'Provide details about this step',
  timing: 'Set estimated duration and assign responsibility',
  variables: 'Define the output values to be recorded when this step completes',
  review: 'Review the changes before saving',
});

export function AddStepModal({
  open,
  onOpenChange,
  onSubmit,
  step,
  providers,
}: AddStepModalProps) {
  const isEditing = !!step;
  const { step: contextStep, setStep: setContextStep } = useStep();

  const [currentStep, setCurrentStep] = useState<ModalStep>('type');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate form when editing
  useEffect(() => {
    if (step && open) {
      setContextStep(step);
    }
  }, [step, open]);

  const stepTitles = getStepTitles();
  const stepDescriptions = getStepDescriptions();

  const currentStepIndex = MODAL_STEPS.indexOf(currentStep);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === MODAL_STEPS.length - 1;

  const canProceed = () => {
    switch (currentStep) {
      case 'type':
        return contextStep?.type !== null && contextStep?.type !== undefined;
      case 'details':
        return (
          contextStep?.name?.trim() !== '' &&
          contextStep?.description?.trim() !== ''
        );
      case 'timing':
        return true; // Optional fields
      case 'variables':
        return true; // Optional - variables can be empty
      case 'review':
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!canProceed()) return;

    if (isLastStep) {
      handleSubmit();
    } else {
      setCurrentStep(MODAL_STEPS[currentStepIndex + 1]);
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStep(MODAL_STEPS[currentStepIndex - 1]);
    }
  };

  const filterValidVariables = (variables: OutputVariable[]) => {
    return variables.filter((v) => {
      if (v.type === 'name') return v.name?.trim();
      if (v.type === 'product') return v.productId;
      if (v.type === 'ingredient') return v.ingredientId;
      return false;
    });
  };

  const handleSubmit = async () => {
    if (!contextStep) return;

    setIsSubmitting(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const validVariables = filterValidVariables(
      contextStep?.outputVariables ?? []
    );
    const totalIngredients = contextStep.ingredients?.length ?? 0;
    const totalProviders = contextStep.providerIds?.length ?? 0;

    onSubmit({
      type: contextStep.type!,
      name: contextStep.name!,
      description: contextStep.description!,
      notes: contextStep.notes || undefined,
      estimatedDuration: contextStep.estimatedDuration,
      durationUnit: contextStep.durationUnit
        ? contextStep.durationUnit
        : undefined,
      assignee: contextStep.assignee || undefined,
      ingredients: totalIngredients > 0 ? contextStep.ingredients : undefined,
      outputVariables: validVariables.length > 0 ? validVariables : undefined,
      providerIds: totalProviders > 0 ? contextStep.providerIds : undefined,
      executionType: contextStep.executionType!,
    });

    // Reset form
    resetForm();
    setIsSubmitting(false);
    onOpenChange(false);
  };

  const resetForm = () => {
    setCurrentStep('type');
    setContextStep({
      type: undefined,
      name: '',
      description: '',
      notes: '',
      assignee: '',
      ingredients: [],
      outputVariables: [],
      providerIds: [],
      executionType: undefined,
      estimatedDuration: undefined,
      durationUnit: undefined,
    });
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      resetForm();
    }
    onOpenChange(newOpen);
  };

  const getSubmitButtonText = () => {
    if (isSubmitting) {
      return isEditing ? 'Saving...' : 'Adding...';
    }
    return isEditing ? 'Save Changes' : 'Add Step';
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-5xl gap-0">
        <DialogHeader className="-mx-6 border-b px-6 pb-4">
          <div className="mb-4">
            <StepIndicator
              steps={MODAL_STEPS}
              currentStep={currentStep}
              onStepClick={setCurrentStep}
            />
          </div>
          <DialogTitle>{stepTitles[currentStep]}</DialogTitle>
          <DialogDescription>{stepDescriptions[currentStep]}</DialogDescription>
        </DialogHeader>

        <div className="h-[500px] overflow-y-auto py-4">
          {currentStep === 'type' ? <TypeStep /> : null}
          {currentStep === 'details' ? (
            <DetailsStep providers={providers} />
          ) : null}
          {currentStep === 'timing' ? <TimingStep /> : null}
          {currentStep === 'variables' ? (
            <VariablesStep products={DUMMY_PRODUCTS} />
          ) : null}
          {currentStep === 'review' ? <ReviewStep /> : null}
        </div>

        <DialogFooter className="-mx-6 border-t px-6 pt-4">
          {!isFirstStep && (
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={isSubmitting}
            >
              Back
            </Button>
          )}
          <Button onClick={handleNext} disabled={!canProceed() || isSubmitting}>
            {isSubmitting && <Loader2 className="animate-spin" />}
            {isLastStep ? getSubmitButtonText() : 'Next'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
