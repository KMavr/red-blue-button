import type { CountryResult } from "../types";
import { countryFlag, countryName } from "../utils/countryUtils";

interface CountryBreakdownProps {
  countries: CountryResult[];
}

function CountryBreakdown({ countries }: CountryBreakdownProps) {
  if (countries.length === 0) return null;

  return (
    <div className="country-breakdown">
      <h3 className="country-breakdown__title">By Country</h3>
      <ul className="country-breakdown__list">
        {countries.map((c) => {
          const redPct = Math.round((c.red / c.total) * 100);
          const bluePct = 100 - redPct;
          return (
            <li key={c.country} className="country-row">
              <span className="country-row__flag">
                {countryFlag(c.country)}
              </span>
              <span className="country-row__name">
                {countryName(c.country)}
              </span>
              <div className="country-row__bar">
                <div
                  className="country-row__fill country-row__fill--red"
                  style={{ width: `${redPct}%` }}
                />
                <div
                  className="country-row__fill country-row__fill--blue"
                  style={{ width: `${bluePct}%` }}
                />
              </div>
              <span className="country-row__votes">
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
