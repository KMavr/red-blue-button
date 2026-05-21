import { useEffect, useRef, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { animate, AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Cookies from 'js-cookie';
import VoteButton from '../components/VoteButton/VoteButton';
import { useVote } from '../hooks/useVote';
import { useLandingStats } from '../hooks/useLandingStats';
import { cn } from '../utils/cn';
import type { Choice } from '../types';

function LandingPage() {
  const { t } = useTranslation();
  const { voting, error, submit } = useVote();
  const { total } = useLandingStats();
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const reduceMotion = useReducedMotion();

  function handleVote(choice: Choice) {
    setSelectedChoice(choice);
    submit(choice);
  }
  const countRef = useRef<HTMLSpanElement>(null);
  const displayedTotal = useRef(0);

  useEffect(() => {
    if (total === null || !countRef.current) return;
    const node = countRef.current;

    if (reduceMotion) {
      node.textContent = total.toLocaleString();
      displayedTotal.current = total;
      return;
    }

    const controls = animate(displayedTotal.current, total, {
      duration: 1,
      ease: 'easeOut',
      onUpdate(v) {
        node.textContent = Math.round(v).toLocaleString();
      },
    });
    displayedTotal.current = total;
    return () => controls.stop();
  }, [total, reduceMotion]);

  if (Cookies.get('voted')) {
    return <Navigate to="/results" replace />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <p className={styles.header}>{t('landing-page.header')}</p>

        <h1 className={styles.headline}>{t('landing-page.headline')}</h1>

        <div className={styles.rules}>
          <p className={styles.rule}>
            <span className={styles.redLabel}>{t('landing-page.rules.red.text')}</span>
          </p>
          <p className={styles.rule}>
            <span className={styles.blueLabel}>{t('landing-page.rules.blue.text')}</span>
          </p>
        </div>

        <p className={styles.cta}>{t('landing-page.cta')}</p>

        {error && <p className={styles.error}>{error}</p>}

        <motion.div layout className={styles.buttons}>
          <AnimatePresence>
            {(!selectedChoice || selectedChoice === 'red') && (
              <VoteButton
                key="red"
                color="red"
                disabled={voting}
                onVote={handleVote}
                isSelected={selectedChoice === 'red'}
              />
            )}
            {(!selectedChoice || selectedChoice === 'blue') && (
              <VoteButton
                key="blue"
                color="blue"
                disabled={voting}
                onVote={handleVote}
                isSelected={selectedChoice === 'blue'}
              />
            )}
          </AnimatePresence>
        </motion.div>

        {total !== null && (
          <p className={styles.liveCount}>
            <span className="live-dot" aria-hidden="true" />
            <span ref={countRef} className={styles.count}>
              {total.toLocaleString()}
            </span>{' '}
            {t('landing-page.live-count')}
          </p>
        )}

        <div className={styles.context}>
          <p className={styles.contextBody}>{t('landing-page.context.body')}</p>
          <div className={styles.contextLinks}>
            <Link to="/about" className={styles.contextLink}>
              {t('landing-page.context.link-about')}
            </Link>
            <Link to="/why-blue" className={cn(styles.contextLink, 'text-blue')}>
              {t('landing-page.context.link-why-blue')}
            </Link>
            <Link to="/why-red" className={cn(styles.contextLink, 'text-red')}>
              {t('landing-page.context.link-why-red')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const focusRing = cn(
  'focus-visible:outline-focus rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2',
);

const styles = {
  wrapper: cn('flex grow items-center justify-center px-5 py-10'),
  inner: cn('w-full max-w-2xl text-center'),
  header: cn('text-secondary mb-4 text-sm'),
  headline: cn('text-headline mb-7 font-bold tracking-[-0.02em]'),
  rules: cn('mb-6 flex flex-col gap-2'),
  rule: cn('text-secondary text-center text-sm'),
  redLabel: cn('text-red font-semibold'),
  blueLabel: cn('text-blue font-semibold'),
  cta: cn('mb-8 text-lg font-semibold tracking-[0.02em]'),
  count: cn('font-mono'),
  liveCount: cn('text-secondary mt-6 flex items-center justify-center gap-2 text-sm'),
  error: cn('text-red mb-4 text-sm'),
  buttons: cn('flex flex-wrap justify-center gap-5'),
  context: cn('border-line mt-10 border-t pt-8 text-left rtl:text-right'),
  contextBody: cn('text-secondary mb-4 text-sm'),
  contextLinks: cn('flex flex-wrap gap-5'),
  contextLink: cn(
    'text-secondary hover:text-primary text-sm font-semibold no-underline hover:underline',
    focusRing,
  ),
};

export default LandingPage;
