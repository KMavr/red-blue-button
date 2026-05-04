import { useState } from 'react';
import type { Choice } from '../types';

interface Props {
  color: Choice;
  disabled: boolean;
  onVote: (choice: Choice) => void;
}

export default function VoteButton({ color, disabled, onVote }: Props) {
  const [pressed, setPressed] = useState(false);

  function handleClick() {
    if (disabled || pressed) return;
    setPressed(true);
    onVote(color);
  }

  const label = color === 'red' ? 'RED' : 'BLUE';

  return (
    <button
      className={`vote-btn vote-btn--${color}${pressed ? ' vote-btn--pressed' : ''}`}
      onClick={handleClick}
      disabled={disabled || pressed}
      aria-label={`Press ${label} button`}
    >
      <span className="vote-btn__label">{label}</span>
    </button>
  );
}
