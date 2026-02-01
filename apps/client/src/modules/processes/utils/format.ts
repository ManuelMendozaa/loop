import { DurationUnitEnum } from '@/src/utils/time';

export function formatDuration(
  duration: { value: number; unit: DurationUnitEnum } | null
): string {
  if (!duration) return '—';

  const unitLabels: Record<DurationUnitEnum, string> = {
    minutes: 'min',
    hours: 'hrs',
    days: 'days',
  };

  return `${duration.value} ${unitLabels[duration.unit]}`;
}
