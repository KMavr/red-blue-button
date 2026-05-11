import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import type { Choice, Results } from '../types';
import { deriveSurvived } from '../utils/resultsUtils';

interface LocationState {
  choice?: Choice;
  survived?: boolean;
  results?: Results;
}

const POLL_INTERVAL = 5000;

export function useResults() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: LocationState | null };
  const [results, setResults] = useState<Results | null>(state?.results ?? null);
  const [loading, setLoading] = useState(!state?.results);
  const [live, setLive] = useState(false);
  const [error, setError] = useState(false);

  const choice: Choice | undefined =
    state?.choice ?? (Cookies.get('last_choice') as Choice | undefined);

  useEffect(() => {
    if (!Cookies.get('voted')) {
      navigate('/', { replace: true });
      return;
    }

    const controller = new AbortController();
    const fetchResults = async () => {
      try {
        const res = await fetch('/api/results', { signal: controller.signal });
        if (!res.ok) {
          throw new Error();
        }
        const data = await res.json();
        setResults(data);
        setError(false);
        setLoading(false);
        setLive(true);
      } catch {
        if (!results) setError(true);
        setLoading(false);
      }
    };

    if (!state?.results) {
      fetchResults();
    }

    const id = setInterval(fetchResults, POLL_INTERVAL);
    return () => {
      clearInterval(id);
      controller.abort();
    };
  }, [navigate, state]);

  let majority: 'blue' | 'red' | null = null;
  if (results) majority = results.blue >= results.red ? 'blue' : 'red';

  const survived = deriveSurvived(state?.survived, majority, choice);

  return { results, loading, live, error, choice, majority, survived };
}
