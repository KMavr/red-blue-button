import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Choice } from '../types';

interface VoteButtonProps {
  color: Choice;
  disabled: boolean;
  onVote: (choice: Choice) => void;
}

function VoteButton({ color, disabled, onVote }: VoteButtonProps) {
  const { t } = useTranslation();
  const [pressed, setPressed] = useState(false);

  function handleClick() {
    if (disabled || pressed) return;
    setPressed(true);
    onVote(color);
  }

  const key = color === 'red' ? 'landing-page.vote-button.red.label' : 'landing-page.vote-button.blue.label';
  const label = t(key);

  return (
    <button
      className={`vote-btn vote-btn--${color}${pressed ? ' vote-btn--pressed' : ''}`}
      onClick={handleClick}
      disabled={disabled || pressed}
      aria-label={label}
    >
      <span className="vote-btn__label">{label}</span>
    </button>
  );
}

export default VoteButton;
