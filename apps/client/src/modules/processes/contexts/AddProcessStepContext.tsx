'use client';

import React from 'react';
import { ProcessStep } from '../types/process';

interface IAddProcessStepContext {
  step: Partial<ProcessStep> | null;
  setStep: React.Dispatch<React.SetStateAction<Partial<ProcessStep> | null>>;
}

export const AddProcessStepContext =
  React.createContext<IAddProcessStepContext>({
    step: null,
    setStep: () => {},
  });

interface AddProcessStepProviderProps {
  children?: React.ReactNode;
}

export function AddProcessStepContextProvider({
  children,
}: AddProcessStepProviderProps) {
  const [step, setStep] = React.useState<Partial<ProcessStep> | null>(null);

  const context = React.useMemo(() => ({ step, setStep }), [step, setStep]);

  return (
    <AddProcessStepContext.Provider value={context}>
      {children}
    </AddProcessStepContext.Provider>
  );
}
