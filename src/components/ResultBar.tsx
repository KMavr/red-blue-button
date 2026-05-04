interface ResultBarProps {
  redPct: number;
  bluePct: number;
  total: number;
  live?: boolean;
}

function ResultBar({ redPct, bluePct, total, live }: ResultBarProps) {
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
        <span className="result-bar__pct result-bar__pct--red">
          {redPct}% RED
        </span>
        <span className="result-bar__total">
          {live && <span className="live-dot" aria-hidden="true" />}
          {total.toLocaleString()} votes
        </span>
        <span className="result-bar__pct result-bar__pct--blue">
          {bluePct}% BLUE
        </span>
      </div>
    </div>
  );
}

export default ResultBar;
