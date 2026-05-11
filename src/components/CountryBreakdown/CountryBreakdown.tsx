import { useTranslation } from 'react-i18next';
import type { CountryResult } from '../../types';
import { countryFlag, countryName } from '../../utils/countryUtils';
import { cn } from '../../utils/cn';

interface CountryBreakdownProps {
  countries: CountryResult[];
}

function CountryBreakdown({ countries }: CountryBreakdownProps) {
  const { i18n } = useTranslation();
  if (!countries || countries.length === 0) return null;

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>By Country</h3>
      <ul className={styles.list}>
        {countries.map((c) => {
          const redPct = Math.round((c.red / c.total) * 100);
          const bluePct = 100 - redPct;
          return (
            <li key={c.country} className={styles.item}>
              <span className={styles.flag}>{countryFlag(c.country)}</span>
              <span className={styles.countryName}>{countryName(c.country, i18n.language)}</span>
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
  heading: cn(
    'text-secondary mb-5 text-[0.7rem] tracking-[0.2em] uppercase',
    'rtl:not-uppercase rtl:text-sm rtl:tracking-normal',
  ),
  list: cn('flex list-none flex-col gap-[0.6rem]'),
  item: cn(
    'grid grid-cols-[1.5rem_1fr_auto_2.5rem] items-center gap-3 text-[0.85rem]',
    'max-[480px]:grid-cols-[1.5rem_1fr_auto_2rem] max-[480px]:gap-[0.4rem]',
  ),
  flag: cn('text-center text-base'),
  countryName: cn('text-secondary overflow-hidden text-ellipsis whitespace-nowrap'),
  percentages: cn('flex items-center gap-[0.4rem]'),
  redPct: cn(
    'text-red min-w-[2.2rem] text-right text-[0.7rem] font-bold',
    'max-[480px]:min-w-[1.8rem] max-[480px]:text-[0.65rem]',
  ),
  miniBar: cn('bg-surface flex h-1.5 w-15 shrink-0 overflow-hidden rounded-[3px] max-[480px]:w-10'),
  redFill: cn('bg-red h-full'),
  blueFill: cn('bg-blue h-full'),
  bluePct: cn(
    'text-blue min-w-[2.2rem] text-left text-[0.7rem] font-bold',
    'max-[480px]:min-w-[1.8rem] max-[480px]:text-[0.65rem]',
  ),
  total: cn('text-secondary text-right text-[0.75rem]'),
};

export default CountryBreakdown;
