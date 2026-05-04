export type Choice = 'red' | 'blue';

export interface CountryResult {
  country: string;
  red: number;
  blue: number;
  total: number;
}

export interface Results {
  red: number;
  blue: number;
  total: number;
  redPct: number;
  bluePct: number;
  countries: CountryResult[];
}

export interface VoteResponse {
  survived: boolean;
  results: Results;
}
