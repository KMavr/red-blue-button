import { useTranslation } from "react-i18next";

interface ResultBarProps {
  redPct: number;
  bluePct: number;
  total: number;
  live?: boolean;
}

function ResultBar({ redPct, bluePct, total, live }: ResultBarProps) {
  const { t } = useTranslation();

  return (
    <div className="mb-8">
      <div className="h-4.5 rounded-[9px] overflow-hidden flex bg-surface border border-line mb-[0.6rem]">
        <div
          className="h-full transition-[width] duration-[0.8s] ease-in-out bg-[linear-gradient(90deg,#7f0000,#dc2626)] shadow-[2px_0_12px_rgba(220,38,38,0.45)]"
          style={{ width: `${redPct}%` }}
        />
        <div
          className="h-full transition-[width] duration-[0.8s] ease-in-out bg-[linear-gradient(90deg,#3b82f6,#1d3470)]"
          style={{ width: `${bluePct}%` }}
        />
      </div>
      <div className="flex justify-between items-center text-[0.8rem] font-bold tracking-[0.06em] rtl:flex-row-reverse">
        <span className="text-red">
          {redPct}% {t("landing-page.rules.red.label")}
        </span>
        <span className="text-secondary font-normal text-[0.75rem] flex items-center gap-[0.4rem]">
          {live && <span className="live-dot" aria-hidden="true" />}
          {t("results-page.result-bar.votes", {
            count: total.toLocaleString(),
          })}
        </span>
        <span className="text-blue">
          {bluePct}% {t("landing-page.rules.blue.label")}
        </span>
      </div>
    </div>
  );
}

export default ResultBar;
