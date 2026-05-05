import { useTranslation } from 'react-i18next';

interface ResultBarProps {
  redPct: number;
  bluePct: number;
  total: number;
  live?: boolean;
}

function ResultBar({ redPct, bluePct, total, live }: ResultBarProps) {
  const { t } = useTranslation();

  return (
    <div className="result-bar-section">
      <div className="result-bar">
        <div
          className="result-bar__fill result-bar__fill--red"
          style={{ width: `${redPct}%` }}
        />
        <div
          className="result-bar__fill result-bar__fill--blue"
          style={{ width: `${bluePct}%` }}
        />
      </div>
      <div className="result-bar__labels">
        <span className="result-bar__pct result-bar__pct--red">{redPct}% {t('landing-page.rules.red.label')}</span>
        <span className="result-bar__total">
          {live && <span className="live-dot" aria-hidden="true" />}
          {t('results-page.result-bar.votes', { count: total.toLocaleString() })}
        </span>
        <span className="result-bar__pct result-bar__pct--blue">{bluePct}% {t('landing-page.rules.blue.label')}</span>
      </div>
    </div>
  );
}

export default ResultBar;
