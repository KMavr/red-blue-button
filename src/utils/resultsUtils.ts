import type { Choice } from '../types';

export const deriveSurvived = (
  majority: 'blue' | 'red' | null,
  choice: Choice | undefined,
): boolean | null => {
  if (majority === null || choice === undefined) return null;
  if (majority === 'blue') return true;
  return choice === 'red';
};
