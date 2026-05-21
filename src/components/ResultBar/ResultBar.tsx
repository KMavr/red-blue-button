import { useTranslation } from 'react-i18next';
import { cn } from '../../utils/cn';

interface ResultBarProps {
  redPct: number;
  bluePct: number;
  total: number;
  live?: boolean;
}

function ResultBar({ redPct, bluePct, total, live }: ResultBarProps) {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <div className={styles.barContainer}>
        <div className={styles.redFill} style={{ width: `${redPct}%` }} />
        <div className={styles.blueFill} style={{ width: `${bluePct}%` }} />
      </div>
      <div className={styles.labels}>
        <span className={styles.redLabel}>
          {redPct}% {t('landing-page.rules.red.label')}
        </span>
        <span className={styles.totalLabel}>
          {live && <span className="live-dot" aria-hidden="true" />}
          {t('results-page.result-bar.votes', {
            count: total.toLocaleString(),
          })}
        </span>
        <span className={styles.blueLabel}>
          {bluePct}% {t('landing-page.rules.blue.label')}
        </span>
      </div>
    </div>
  );
}

const styles = {
  wrapper: cn('mb-8'),
  barContainer: cn('bg-surface border-line mb-2.5 flex h-4.5 overflow-hidden rounded-lg border'),
  redFill: cn(
    'h-full transition-[width] duration-[0.8s] ease-in-out',
    'bg-[linear-gradient(90deg,var(--color-red-deep),var(--color-red))]',
  ),
  blueFill: cn(
    'h-full transition-[width] duration-[0.8s] ease-in-out',
    'bg-[linear-gradient(90deg,var(--color-blue),var(--color-blue-deep))]',
  ),
  labels: cn(
    'flex items-center justify-between text-xs font-bold tracking-[0.06em] rtl:flex-row-reverse',
  ),
  redLabel: cn('text-red'),
  totalLabel: cn('text-secondary flex items-center gap-1.5 text-xs font-normal'),
  blueLabel: cn('text-blue'),
};

export default ResultBar;
