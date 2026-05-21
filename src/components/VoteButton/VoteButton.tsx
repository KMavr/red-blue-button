import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import type { Choice } from '../../types';
import { cn } from '../../utils/cn';

interface VoteButtonProps {
  color: Choice;
  disabled: boolean;
  onVote: (choice: Choice) => void;
  isSelected?: boolean;
}

function VoteButton({ color, disabled, onVote, isSelected }: VoteButtonProps) {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();

  const key =
    color === 'red' ? 'landing-page.vote-button.red.label' : 'landing-page.vote-button.blue.label';
  const label = t(key);

  const interactive = !disabled && !isSelected && !reduceMotion;

  return (
    <motion.button
      layout
      className={styles.button(color)}
      onClick={() => !disabled && !isSelected && onVote(color)}
      disabled={disabled}
      aria-label={label}
      whileHover={interactive ? { scale: 1.06 } : {}}
      whileTap={interactive ? { scale: 0.94 } : {}}
      animate={isSelected && !reduceMotion ? { scale: [1.1, 1.3, 1.1], opacity: [1, 0.85, 1] } : {}}
      transition={
        isSelected && !reduceMotion
          ? { duration: 1.4, repeat: Infinity, ease: 'easeInOut' }
          : { duration: 0.35, ease: 'easeOut' }
      }
      exit={{
        opacity: 0,
        scale: reduceMotion ? 1 : 0.2,
        transition: { duration: reduceMotion ? 0.15 : 0.35, ease: 'easeIn' },
      }}>
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
      'disabled:cursor-not-allowed',
      'focus-visible:outline-focus focus-visible:outline-2 focus-visible:outline-offset-4',
      color === 'red' ? 'vote-btn-red' : 'vote-btn-blue',
    ),
  label: cn('relative z-10 [text-shadow:0_1px_3px_rgba(0,0,0,0.4)]'),
};

export default VoteButton;
