'use client';

import { useState } from 'react';
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
  StepType,
  DurationUnit,
  MODAL_STEPS,
  ModalStep,
  OutputVariable,
} from '../../types/process';
import { SelectedIngredient } from '@/src/modules/ingredients/types';
import { StepIndicator } from './components/StepIndicator';
import { TypeStep } from './components/TypeStep';
import { DetailsStep } from './DetailsStep';
import { TimingStep } from './TimingStep';
import { VariablesStep } from './VariablesStep';
import { ReviewStep } from './ReviewStep';
import { DUMMY_PRODUCTS } from '@/src/modules/products/utils/dummy';

interface AddStepModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (step: Omit<ProcessStep, 'id' | 'order'>) => void;
}

const STEP_TITLES: Record<ModalStep, string> = {
  type: 'Select Step Type',
  details: 'Step Details',
  timing: 'Timing & Assignment',
  variables: 'Output Variables',
  review: 'Review & Confirm',
};

const STEP_DESCRIPTIONS: Record<ModalStep, string> = {
  type: 'Choose the type of process step you want to add',
  details: 'Provide details about this step',
  timing: 'Set estimated duration and assign responsibility',
  variables: 'Define the output values to be recorded when this step completes',
  review: 'Review the step configuration before adding',
};

function AddStepModal({ open, onOpenChange, onAdd }: AddStepModalProps) {
  const [currentStep, setCurrentStep] = useState<ModalStep>('type');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [type, setType] = useState<StepType | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');
  const [duration, setDuration] = useState('');
  const [durationUnit, setDurationUnit] = useState<DurationUnit>('hours');
  const [assignee, setAssignee] = useState('');
  const [ingredients, setIngredients] = useState<SelectedIngredient[]>([]);
  const [outputVariables, setOutputVariables] = useState<OutputVariable[]>([]);

  const currentStepIndex = MODAL_STEPS.indexOf(currentStep);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === MODAL_STEPS.length - 1;

  const canProceed = () => {
    switch (currentStep) {
      case 'type':
        return type !== null;
      case 'details':
        return name.trim() !== '' && description.trim() !== '';
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

  const handleSubmit = async () => {
    if (!type) return;

    setIsSubmitting(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    onAdd({
      type,
      name,
      description,
      notes: notes || undefined,
      estimatedDuration: duration ? parseInt(duration, 10) : undefined,
      durationUnit: duration ? durationUnit : undefined,
      assignee: assignee || undefined,
      ingredients: ingredients.length > 0 ? ingredients : undefined,
      outputVariables:
        outputVariables.filter((v) => v.name.trim()).length > 0
          ? outputVariables.filter((v) => v.name.trim())
          : undefined,
    });

    // Reset form
    resetForm();
    setIsSubmitting(false);
    onOpenChange(false);
  };

  const resetForm = () => {
    setCurrentStep('type');
    setType(null);
    setName('');
    setDescription('');
    setNotes('');
    setDuration('');
    setDurationUnit('hours');
    setAssignee('');
    setIngredients([]);
    setOutputVariables([]);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      resetForm();
    }
    onOpenChange(newOpen);
  };

  const isWideModal = currentStep === 'details' && type === 'preparation';

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className={isWideModal ? 'sm:max-w-4xl' : 'sm:max-w-xl'}>
        <DialogHeader>
          <div className="mb-4">
            <StepIndicator steps={MODAL_STEPS} currentStep={currentStep} />
          </div>
          <DialogTitle>{STEP_TITLES[currentStep]}</DialogTitle>
          <DialogDescription>
            {STEP_DESCRIPTIONS[currentStep]}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {currentStep === 'type' && (
            <TypeStep value={type} onChange={setType} />
          )}
          {currentStep === 'details' && (
            <DetailsStep
              stepType={type}
              name={name}
              description={description}
              notes={notes}
              ingredients={ingredients}
              onNameChange={setName}
              onDescriptionChange={setDescription}
              onNotesChange={setNotes}
              onIngredientsChange={setIngredients}
            />
          )}
          {currentStep === 'timing' && (
            <TimingStep
              duration={duration}
              durationUnit={durationUnit}
              assignee={assignee}
              onDurationChange={setDuration}
              onDurationUnitChange={setDurationUnit}
              onAssigneeChange={setAssignee}
            />
          )}
          {currentStep === 'variables' && (
            <VariablesStep
              products={DUMMY_PRODUCTS}
              variables={outputVariables}
              onVariablesChange={setOutputVariables}
            />
          )}
          {currentStep === 'review' && type && (
            <ReviewStep
              type={type}
              name={name}
              description={description}
              duration={duration}
              durationUnit={durationUnit}
              assignee={assignee}
              notes={notes}
              ingredients={ingredients}
              outputVariables={outputVariables}
            />
          )}
        </div>

        <DialogFooter>
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
            {isLastStep ? (isSubmitting ? 'Adding...' : 'Add Step') : 'Next'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { AddStepModal };
export type { AddStepModalProps };
