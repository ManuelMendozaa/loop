export const DURATION_UNITS_VALUES = ['minutes', 'hours', 'days'];

export type DurationUnitEnum = (typeof DURATION_UNITS_VALUES)[number];

export const durationUnits: { label: string; value: DurationUnitEnum }[] = [
  { label: 'Minutes', value: 'minutes' },
  { label: 'Hours', value: 'hours' },
  { label: 'Days', value: 'days' },
];
