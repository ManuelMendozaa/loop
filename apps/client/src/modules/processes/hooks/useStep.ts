import React from 'react';
import { AddProcessStepContext } from '../contexts/AddProcessStepContext';

export function useStep() {
  const { step, setStep } = React.useContext(AddProcessStepContext);
  return { step, setStep };
}
