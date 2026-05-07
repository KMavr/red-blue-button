import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import type { Choice } from '../../types';
import { cn } from '../../utils/cn';

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

  const key =
    color === 'red' ? 'landing-page.vote-button.red.label' : 'landing-page.vote-button.blue.label';
  const label = t(key);

  return (
    <motion.button
      className={styles.button(color)}
      onClick={handleClick}
      disabled={disabled || pressed}
      aria-label={label}
      whileHover={!disabled && !pressed ? { scale: 1.06 } : {}}
      whileTap={!disabled && !pressed ? { scale: 0.94 } : {}}
      animate={pressed ? { scale: [0.94, 1.08, 1] } : {}}
      transition={{ duration: 0.35, ease: 'easeOut' }}>
      <span className={styles.label}>{label}</span>
    </motion.button>
  );
}

const styles = {
  button: (color: Choice) =>
    cn(
      'h-40 w-40 rounded-full border-2 border-transparent max-[480px]:h-32.5 max-[480px]:w-32.5',
      'font-display cursor-pointer text-base font-black tracking-[0.18em] max-[480px]:text-[0.85rem]',
      'relative flex items-center justify-center text-white uppercase transition-shadow duration-200',
      'disabled:cursor-not-allowed disabled:opacity-50',
      color === 'red' ? 'vote-btn-red' : 'vote-btn-blue',
    ),
  label: cn('relative z-10 [text-shadow:0_1px_3px_rgba(0,0,0,0.4)]'),
};

export default VoteButton;
