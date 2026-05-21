import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
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
                <svg
                  className={styles.survivedIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="12" r="3.5" fill="currentColor" />
                </svg>
                <h1 className={styles.survivedHeading}>{t('results-page.outcome.survived')}</h1>
              </>
            ) : (
              <>
                <svg className={styles.diedIcon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
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

        <div className={styles.context}>
          <p className={styles.contextBody}>{t('results-page.context.body')}</p>
          <Link to="/about" className={styles.contextLink}>
            {t('results-page.context.link')}
          </Link>
        </div>
      </div>
    </div>
  );
}

const focusRing = cn(
  'focus-visible:outline-focus focus-visible:outline-2 focus-visible:outline-offset-2',
);

const styles = {
  placeholder: cn('text-secondary flex grow items-center justify-center px-5'),
  wrapper: cn('flex grow items-start justify-center px-5 py-16'),
  inner: cn('w-full max-w-160'),
  outcomeContainer: cn('mb-12 text-center'),
  survivedIcon: cn(
    'text-blue mx-auto mb-2 block h-10 w-10 drop-shadow-[0_0_12px_rgba(59,130,246,0.45)]',
  ),
  survivedHeading: cn(
    'text-outcome mb-3 font-black tracking-[-0.02em]',
    'text-blue [text-shadow:0_0_60px_rgba(59,130,246,0.45)]',
  ),
  diedIcon: cn('text-red mx-auto mb-2 block h-10 w-10 drop-shadow-[0_0_12px_rgba(220,38,38,0.45)]'),
  diedHeading: cn(
    'text-outcome mb-3 font-black tracking-[-0.02em]',
    'text-red [text-shadow:0_0_60px_rgba(220,38,38,0.45)]',
  ),
  outcomeSub: cn('text-secondary mt-2 text-base'),
  shareButton: cn(
    'bg-surface border-line block w-full rounded-lg border px-6 py-3.5',
    'text-primary font-display text-sm font-semibold tracking-[0.04em]',
    'mb-10 cursor-pointer transition-[background-color,border-color] duration-150',
    'hover:border-white/15 hover:bg-white/6',
    focusRing,
  ),
  context: cn('bg-surface border-line mt-8 rounded-xl border p-6'),
  contextBody: cn('text-secondary mb-3 text-sm'),
  contextLink: cn(
    'text-secondary hover:text-primary rounded-xs text-sm font-semibold no-underline hover:underline',
    focusRing,
  ),
};

export default ResultsPage;
