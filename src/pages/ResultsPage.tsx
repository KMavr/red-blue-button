import { useTranslation } from 'react-i18next';
import ResultBar from '../components/ResultBar/ResultBar';
import CountryBreakdown from '../components/CountryBreakdown/CountryBreakdown';
import { useResults } from '../hooks/useResults';
import { useShare } from '../hooks/useShare';
import { cn } from '../utils/cn';

function ResultsPage() {
  const { t } = useTranslation();
  const { results, loading, live, error, majority, survived } = useResults();
  const { copied, share } = useShare(survived);

  if (loading) {
    return (
      <div className={styles.placeholder}>
        <p>{t('results-page.loading')}</p>
      </div>
    );
  }

  if (error || !results) {
    return (
      <div className={styles.placeholder}>
        <p>{t('results-page.error')}</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        {survived !== null && (
          <div className={styles.outcomeContainer}>
            {survived ? (
              <>
                <span className={styles.survivedIcon}>◉</span>
                <h1 className={styles.survivedHeading}>{t('results-page.outcome.survived')}</h1>
              </>
            ) : (
              <>
                <span className={styles.diedIcon}>✕</span>
                <h1 className={styles.diedHeading}>{t('results-page.outcome.died')}</h1>
              </>
            )}
            <p className={styles.outcomeSub}>
              {majority === 'blue'
                ? t('results-page.outcome.sub.blue-majority')
                : t('results-page.outcome.sub.red-majority')}
            </p>
          </div>
        )}

        <ResultBar
          redPct={results.redPct}
          bluePct={results.bluePct}
          total={results.total}
          live={live}
        />

        <button className={styles.shareButton} onClick={share}>
          {copied ? t('results-page.share-button.copied') : t('results-page.share-button.text')}
        </button>

        <CountryBreakdown countries={results.countries} />
      </div>
    </div>
  );
}

const styles = {
  placeholder: cn('text-secondary flex min-h-screen items-center justify-center'),
  wrapper: cn('flex min-h-screen items-start justify-center px-5 py-16'),
  inner: cn('w-full max-w-160'),
  outcomeContainer: cn('mb-12 text-center'),
  survivedIcon: cn(
    'text-blue mb-2 block text-[2.5rem] drop-shadow-[0_0_12px_rgba(59,130,246,0.45)]',
  ),
  survivedHeading: cn(
    'mb-3 text-[clamp(2.5rem,8vw,5rem)] leading-none font-black tracking-[-0.02em]',
    'text-blue [text-shadow:0_0_60px_rgba(59,130,246,0.45)]',
  ),
  diedIcon: cn('text-red mb-2 block text-[2.5rem] drop-shadow-[0_0_12px_rgba(220,38,38,0.45)]'),
  diedHeading: cn(
    'mb-3 text-[clamp(2.5rem,8vw,5rem)] leading-none font-black tracking-[-0.02em]',
    'text-red [text-shadow:0_0_60px_rgba(220,38,38,0.45)]',
  ),
  outcomeSub: cn('text-secondary mt-2 text-[0.95rem]'),
  shareButton: cn(
    'bg-surface border-line block w-full rounded-[10px] border px-6 py-[0.9rem]',
    'text-primary font-display text-[0.9rem] font-semibold tracking-[0.04em]',
    'mb-10 cursor-pointer transition-[background-color,border-color] duration-150',
    'hover:border-white/15 hover:bg-white/6',
  ),
};

export default ResultsPage;
