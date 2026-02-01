import { DurationUnitEnum } from '@/src/utils/time';
import { ProcessStep } from '../types/process';

export function computeTotalTime(
  steps: ProcessStep[]
): { value: number; unit: DurationUnitEnum } | null {
  let totalMinutes = 0;

  for (const step of steps) {
    if (step.estimatedDuration && step.durationUnit) {
      switch (step.durationUnit) {
        case 'minutes':
          totalMinutes += step.estimatedDuration;
          break;
        case 'hours':
          totalMinutes += step.estimatedDuration * 60;
          break;
        case 'days':
          totalMinutes += step.estimatedDuration * 60 * 24;
          break;
      }
    }
  }

  if (totalMinutes === 0) return null;

  // Convert to most appropriate unit
  if (totalMinutes >= 60 * 24) {
    const days = totalMinutes / (60 * 24);
    return { value: Math.round(days * 10) / 10, unit: 'days' };
  } else if (totalMinutes >= 60) {
    const hours = totalMinutes / 60;
    return { value: Math.round(hours * 10) / 10, unit: 'hours' };
  }

  return { value: totalMinutes, unit: 'minutes' };
}
