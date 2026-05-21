import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { CountryResult } from '../../types';
import { countryFlag, countryName } from '../../utils/countryUtils';
import { cn } from '../../utils/cn';

type SortMode = 'votes' | 'alpha';

interface CountryBreakdownProps {
  countries: CountryResult[];
}

function CountryBreakdown({ countries }: CountryBreakdownProps) {
  const { t, i18n } = useTranslation();
  const [sort, setSort] = useState<SortMode>('votes');

  if (!countries || countries.length === 0) return null;

  const sortedCountries = [...countries].sort((a, b) =>
    sort === 'votes'
      ? b.total - a.total
      : countryName(a.country, i18n.language, t('common.unknown')).localeCompare(
          countryName(b.country, i18n.language, t('common.unknown')),
        ),
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.heading}>{t('results-page.country-breakdown.title')}</h3>
        <div className={styles.sortToggle}>
          <button
            className={cn(styles.sortBtn, sort === 'alpha' && styles.sortBtnActive)}
            onClick={() => setSort('alpha')}>
            {t('results-page.country-breakdown.sort.alpha')}
          </button>
          <span className={styles.sortDivider}>|</span>
          <button
            className={cn(styles.sortBtn, sort === 'votes' && styles.sortBtnActive)}
            onClick={() => setSort('votes')}>
            {t('results-page.country-breakdown.sort.votes')}
          </button>
        </div>
      </div>
      <ul className={styles.list}>
        {sortedCountries.map((c) => {
          const redPct = Math.round((c.red / c.total) * 100);
          const bluePct = 100 - redPct;
          return (
            <li key={c.country} className={styles.item}>
              <span className={styles.flag}>{countryFlag(c.country)}</span>
              <span className={styles.countryName}>
                {countryName(c.country, i18n.language, t('common.unknown'))}
              </span>
              <div className={styles.percentages}>
                <span className={styles.redPct}>{redPct}%</span>
                <div className={styles.miniBar}>
                  <div className={styles.redFill} style={{ width: `${redPct}%` }} />
                  <div className={styles.blueFill} style={{ width: `${bluePct}%` }} />
                </div>
                <span className={styles.bluePct}>{bluePct}%</span>
              </div>
              <span className={styles.total}>{c.total.toLocaleString()}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const styles = {
  container: cn('border-line border-t pt-8'),
  header: cn('mb-5 flex items-center justify-between'),
  heading: cn('text-primary text-base font-semibold'),
  sortToggle: cn('flex items-center gap-1.5'),
  sortBtn: cn(
    'text-secondary text-2xs cursor-pointer tracking-[0.1em] uppercase transition-colors duration-150',
    'hover:text-primary',
    'focus-visible:outline-focus rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2',
  ),
  sortBtnActive: cn('text-primary'),
  sortDivider: cn('text-secondary/40 text-2xs'),
  list: cn('flex list-none flex-col gap-2.5'),
  item: cn(
    'grid grid-cols-[1.5rem_1fr_auto_2.5rem] items-center gap-3 text-sm',
    'max-[480px]:grid-cols-[1.5rem_1fr_auto_2rem] max-[480px]:gap-1.5',
  ),
  flag: cn('text-center text-base'),
  countryName: cn('text-secondary overflow-hidden text-ellipsis whitespace-nowrap'),
  percentages: cn('flex items-center gap-1.5'),
  redPct: cn(
    'text-red text-2xs min-w-[2.2rem] text-right font-mono font-bold',
    'max-[480px]:min-w-[1.8rem]',
  ),
  miniBar: cn('bg-surface flex h-1.5 w-15 shrink-0 overflow-hidden rounded-sm max-[480px]:w-10'),
  redFill: cn('bg-red h-full'),
  blueFill: cn('bg-blue h-full'),
  bluePct: cn(
    'text-blue text-2xs min-w-[2.2rem] text-left font-mono font-bold',
    'max-[480px]:min-w-[1.8rem]',
  ),
  total: cn('text-secondary text-right font-mono text-xs'),
};

export default CountryBreakdown;
