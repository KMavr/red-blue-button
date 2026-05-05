import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
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
    <motion.button
      className={`vote-btn vote-btn--${color}`}
      onClick={handleClick}
      disabled={disabled || pressed}
      aria-label={label}
      whileHover={!disabled && !pressed ? { scale: 1.06 } : {}}
      whileTap={!disabled && !pressed ? { scale: 0.94 } : {}}
      animate={pressed ? { scale: [0.94, 1.08, 1] } : {}}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <span className="vote-btn__label">{label}</span>
    </motion.button>
  );
}

export default VoteButton;
