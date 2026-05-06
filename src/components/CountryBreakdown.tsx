import { useTranslation } from "react-i18next";
import type { CountryResult } from "../types";
import { countryFlag, countryName } from "../utils/countryUtils";
import { cn } from "../utils/cn";

interface CountryBreakdownProps {
  countries: CountryResult[];
}

function CountryBreakdown({ countries }: CountryBreakdownProps) {
  const { i18n } = useTranslation();
  if (countries.length === 0) return null;

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>
        By Country
      </h3>
      <ul className={styles.list}>
        {countries.map((c) => {
          const redPct = Math.round((c.red / c.total) * 100);
          const bluePct = 100 - redPct;
          return (
            <li key={c.country} className={styles.item}>
              <span className={styles.flag}>
                {countryFlag(c.country)}
              </span>
              <span className={styles.countryName}>
                {countryName(c.country, i18n.language)}
              </span>
              <div className={styles.percentages}>
                <span className={styles.redPct}>
                  {redPct}%
                </span>
                <div className={styles.miniBar}>
                  <div className={styles.redFill} style={{ width: `${redPct}%` }} />
                  <div className={styles.blueFill} style={{ width: `${bluePct}%` }} />
                </div>
                <span className={styles.bluePct}>
                  {bluePct}%
                </span>
              </div>
              <span className={styles.total}>
                {c.total.toLocaleString()}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const styles = {
  container: cn("border-t border-line pt-8"),
  heading: cn(
    "text-[0.7rem] tracking-[0.2em] uppercase text-secondary mb-5",
    "rtl:tracking-normal rtl:not-uppercase rtl:text-sm",
  ),
  list: cn("list-none flex flex-col gap-[0.6rem]"),
  item: cn(
    "grid grid-cols-[1.5rem_1fr_auto_2.5rem] items-center gap-3 text-[0.85rem]",
    "max-[480px]:grid-cols-[1.5rem_1fr_auto_2rem] max-[480px]:gap-[0.4rem]",
  ),
  flag: cn("text-center text-base"),
  countryName: cn("text-secondary whitespace-nowrap overflow-hidden text-ellipsis"),
  percentages: cn("flex items-center gap-[0.4rem]"),
  redPct: cn(
    "text-[0.7rem] font-bold min-w-[2.2rem] text-right text-red",
    "max-[480px]:text-[0.65rem] max-[480px]:min-w-[1.8rem]",
  ),
  miniBar: cn("w-15 h-1.5 rounded-[3px] overflow-hidden flex bg-surface shrink-0 max-[480px]:w-10"),
  redFill: cn("h-full bg-red"),
  blueFill: cn("h-full bg-blue"),
  bluePct: cn(
    "text-[0.7rem] font-bold min-w-[2.2rem] text-left text-blue",
    "max-[480px]:text-[0.65rem] max-[480px]:min-w-[1.8rem]",
  ),
  total: cn("text-secondary text-[0.75rem] text-right"),
};

export default CountryBreakdown;
