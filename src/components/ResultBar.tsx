interface Props {
  redPct: number;
  bluePct: number;
  total: number;
}

export default function ResultBar({ redPct, bluePct, total }: Props) {
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
        <span className="result-bar__pct result-bar__pct--red">{redPct}% RED</span>
        <span className="result-bar__total">{total.toLocaleString()} votes</span>
        <span className="result-bar__pct result-bar__pct--blue">{bluePct}% BLUE</span>
      </div>
    </div>
  );
}
