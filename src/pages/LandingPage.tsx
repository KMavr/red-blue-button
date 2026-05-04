import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import VoteButton from '../components/VoteButton';
import type { Choice } from '../types';

export default function LandingPage() {
  const navigate = useNavigate();
  const [voting, setVoting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (Cookies.get('voted')) {
      navigate('/results', { replace: true });
    }
  }, [navigate]);

  async function handleVote(choice: Choice) {
    setVoting(true);
    setError(null);

    try {
      const res = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ choice }),
      });

      if (res.status === 429) {
        Cookies.set('voted', '1', { expires: 1 });
        Cookies.set('last_choice', choice, { expires: 365 });
        navigate('/results', { state: { choice } });
        return;
      }

      if (!res.ok) {
        setError('Something went wrong. Try again.');
        setVoting(false);
        return;
      }

      const data = await res.json();
      Cookies.set('voted', '1', { expires: 1 });
      Cookies.set('last_choice', choice, { expires: 365 });
      navigate('/results', { state: { choice, survived: data.survived, results: data.results } });
    } catch {
      setError('Network error. Try again.');
      setVoting(false);
    }
  }

  return (
    <div className="landing">
      <div className="landing__content">
        <p className="landing__eyebrow">A GLOBAL DILEMMA</p>

        <h1 className="landing__headline">
          Every person on Earth<br />has a button.
        </h1>

        <div className="landing__rules">
          <div className="landing__rule landing__rule--red">
            <span className="landing__rule-label">RED</span>
            <span className="landing__rule-text">
              If more than half press red — only those who pressed red survive.
            </span>
          </div>
          <div className="landing__rule landing__rule--blue">
            <span className="landing__rule-label">BLUE</span>
            <span className="landing__rule-text">
              If more than half press blue — everyone survives.
            </span>
          </div>
        </div>

        <p className="landing__tension">
          You cannot communicate with others.<br />
          You cannot change your mind.<br />
          One press. Forever.
        </p>

        <p className="landing__cta">What do you choose?</p>

        {error && <p className="landing__error">{error}</p>}

        <div className="landing__buttons">
          <VoteButton color="red" disabled={voting} onVote={handleVote} />
          <VoteButton color="blue" disabled={voting} onVote={handleVote} />
        </div>
      </div>
    </div>
  );
}
