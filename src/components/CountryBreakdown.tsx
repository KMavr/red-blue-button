import { useTranslation } from "react-i18next";
import type { CountryResult } from "../types";
import { countryFlag, countryName } from "../utils/countryUtils";

interface CountryBreakdownProps {
  countries: CountryResult[];
}

function CountryBreakdown({ countries }: CountryBreakdownProps) {
  const { i18n } = useTranslation();
  if (countries.length === 0) return null;

  return (
    <div className="border-t border-line pt-8">
      <h3 className="text-[0.7rem] tracking-[0.2em] uppercase text-secondary mb-5 rtl:tracking-normal rtl:not-uppercase rtl:text-sm">
        By Country
      </h3>
      <ul className="list-none flex flex-col gap-[0.6rem]">
        {countries.map((c) => {
          const redPct = Math.round((c.red / c.total) * 100);
          const bluePct = 100 - redPct;
          return (
            <li
              key={c.country}
              className="grid grid-cols-[1.5rem_1fr_auto_2.5rem] items-center gap-3 text-[0.85rem] max-[480px]:grid-cols-[1.5rem_1fr_auto_2rem] max-[480px]:gap-[0.4rem]"
            >
              <span className="text-center text-base">
                {countryFlag(c.country)}
              </span>
              <span className="text-secondary whitespace-nowrap overflow-hidden text-ellipsis">
                {countryName(c.country, i18n.language)}
              </span>
              <div className="flex items-center gap-[0.4rem]">
                <span className="text-[0.7rem] font-bold min-w-[2.2rem] text-right text-red max-[480px]:text-[0.65rem] max-[480px]:min-w-[1.8rem]">
                  {redPct}%
                </span>
                <div className="w-15 h-1.5 rounded-[3px] overflow-hidden flex bg-surface shrink-0 max-[480px]:w-10">
                  <div
                    className="h-full bg-red"
                    style={{ width: `${redPct}%` }}
                  />
                  <div
                    className="h-full bg-blue"
                    style={{ width: `${bluePct}%` }}
                  />
                </div>
                <span className="text-[0.7rem] font-bold min-w-[2.2rem] text-left text-blue max-[480px]:text-[0.65rem] max-[480px]:min-w-[1.8rem]">
                  {bluePct}%
                </span>
              </div>
              <span className="text-secondary text-[0.75rem] text-right">
                {c.total.toLocaleString()}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CountryBreakdown;
