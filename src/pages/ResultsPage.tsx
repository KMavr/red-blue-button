import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import ResultBar from '../components/ResultBar';
import CountryBreakdown from '../components/CountryBreakdown';
import type { Choice, Results } from '../types';

interface LocationState {
  choice?: Choice;
  survived?: boolean;
  results?: Results;
}

const SITE_URL = 'https://red-or-blue.vercel.app';

export default function ResultsPage() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: LocationState | null };
  const [results, setResults] = useState<Results | null>(state?.results ?? null);
  const [loading, setLoading] = useState(!state?.results);
  const [copied, setCopied] = useState(false);

  const choice: Choice | undefined =
    state?.choice ?? (Cookies.get('last_choice') as Choice | undefined);

  useEffect(() => {
    if (!Cookies.get('voted')) {
      navigate('/', { replace: true });
      return;
    }

    if (state?.results) return;

    fetch('/api/results')
      .then((r) => r.json())
      .then((data) => {
        setResults(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [navigate, state]);

  if (loading) {
    return (
      <div className="results results--loading">
        <p>Counting votes…</p>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="results results--error">
        <p>Failed to load results.</p>
      </div>
    );
  }

  const majority = results.blue >= results.red ? 'blue' : 'red';
  const survived =
    state?.survived !== undefined
      ? state.survived
      : choice !== undefined
      ? choice === majority
      : null;

  function handleShare() {
    const outcome = survived ? 'survived' : 'died';
    const text = `I just pressed a button and ${outcome}. ${results!.bluePct}% of people chose blue (everyone lives). What would you press?\n\n${SITE_URL}`;

    if (navigator.share) {
      navigator.share({ title: 'Red or Blue?', text, url: SITE_URL }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }

  const outcomeClass =
    survived === true ? 'results--survived' : survived === false ? 'results--died' : '';

  return (
    <div className={`results ${outcomeClass}`}>
      <div className="results__content">
        {survived !== null && (
          <div className="results__outcome">
            {survived ? (
              <>
                <span className="results__outcome-icon">◉</span>
                <h1 className="results__verdict results__verdict--survived">
                  YOU SURVIVED
                </h1>
              </>
            ) : (
              <>
                <span className="results__outcome-icon">✕</span>
                <h1 className="results__verdict results__verdict--died">
                  YOU DIED
                </h1>
              </>
            )}
            <p className="results__outcome-sub">
              {majority === 'blue'
                ? 'Blue holds the majority — humanity lives.'
                : 'Red holds the majority — only the red survive.'}
            </p>
          </div>
        )}

        <ResultBar
          redPct={results.redPct}
          bluePct={results.bluePct}
          total={results.total}
        />

        <button className="share-btn" onClick={handleShare}>
          {copied ? 'Copied!' : 'Share this dilemma'}
        </button>

        <CountryBreakdown countries={results.countries} />
      </div>
    </div>
  );
}
