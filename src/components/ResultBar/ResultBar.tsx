import { useTranslation } from "react-i18next";
import { cn } from "../utils/cn";

interface ResultBarProps {
  redPct: number;
  bluePct: number;
  total: number;
  live?: boolean;
}

function ResultBar({ redPct, bluePct, total, live }: ResultBarProps) {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <div className={styles.barContainer}>
        <div className={styles.redFill} style={{ width: `${redPct}%` }} />
        <div className={styles.blueFill} style={{ width: `${bluePct}%` }} />
      </div>
      <div className={styles.labels}>
        <span className={styles.redLabel}>
          {redPct}% {t("landing-page.rules.red.label")}
        </span>
        <span className={styles.totalLabel}>
          {live && <span className="live-dot" aria-hidden="true" />}
          {t("results-page.result-bar.votes", {
            count: total.toLocaleString(),
          })}
        </span>
        <span className={styles.blueLabel}>
          {bluePct}% {t("landing-page.rules.blue.label")}
        </span>
      </div>
    </div>
  );
}

const styles = {
  wrapper: cn("mb-8"),
  barContainer: cn(
    "h-4.5 rounded-[9px] overflow-hidden flex bg-surface border border-line mb-[0.6rem]",
  ),
  redFill: cn(
    "h-full transition-[width] duration-[0.8s] ease-in-out",
    "bg-[linear-gradient(90deg,#7f0000,#dc2626)] shadow-[2px_0_12px_rgba(220,38,38,0.45)]",
  ),
  blueFill: cn(
    "h-full transition-[width] duration-[0.8s] ease-in-out",
    "bg-[linear-gradient(90deg,#3b82f6,#1d3470)]",
  ),
  labels: cn(
    "flex justify-between items-center text-[0.8rem] font-bold tracking-[0.06em] rtl:flex-row-reverse",
  ),
  redLabel: cn("text-red"),
  totalLabel: cn("text-secondary font-normal text-[0.75rem] flex items-center gap-[0.4rem]"),
  blueLabel: cn("text-blue"),
};

export default ResultBar;
