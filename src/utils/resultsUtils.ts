import type { Choice } from '../types';

export const deriveSurvived = (
  stateValue: boolean | undefined,
  majority: 'blue' | 'red' | null,
  choice: Choice | undefined,
): boolean | null => {
  if (stateValue !== undefined) return stateValue;
  if (majority === null || choice === undefined) return null;
  if (majority === 'blue') return true;
  return choice === 'red';
};
