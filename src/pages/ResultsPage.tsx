import { useTranslation } from "react-i18next";
import ResultBar from "../components/ResultBar";
import CountryBreakdown from "../components/CountryBreakdown";
import { useResults } from "../hooks/useResults";
import { useShare } from "../hooks/useShare";
import { cn } from "../utils/cn";

function ResultsPage() {
  const { t } = useTranslation();
  const { results, loading, live, majority, survived } = useResults();
  const { copied, share } = useShare(survived);

  if (loading) {
    return (
      <div className={styles.placeholder}>
        <p>{t("results-page.loading")}</p>
      </div>
    );
  }

  if (!results) {
    return (
      <div className={styles.placeholder}>
        <p>{t("results-page.error")}</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        {survived !== null && (
          <div className={styles.outcomeContainer}>
            {survived ? (
              <>
                <span className={styles.survivedIcon}>◉</span>
                <h1 className={styles.survivedHeading}>
                  {t("results-page.outcome.survived")}
                </h1>
              </>
            ) : (
              <>
                <span className={styles.diedIcon}>✕</span>
                <h1 className={styles.diedHeading}>
                  {t("results-page.outcome.died")}
                </h1>
              </>
            )}
            <p className={styles.outcomeSub}>
              {majority === "blue"
                ? t("results-page.outcome.sub.blue-majority")
                : t("results-page.outcome.sub.red-majority")}
            </p>
          </div>
        )}

        <ResultBar
          redPct={results.redPct}
          bluePct={results.bluePct}
          total={results.total}
          live={live}
        />

        <button className={styles.shareButton} onClick={share}>
          {copied
            ? t("results-page.share-button.copied")
            : t("results-page.share-button.text")}
        </button>

        <CountryBreakdown countries={results.countries} />
      </div>
    </div>
  );
}

const styles = {
  placeholder: cn("min-h-screen flex items-center justify-center text-secondary"),
  wrapper: cn("min-h-screen flex items-start justify-center px-5 py-16"),
  inner: cn("max-w-160 w-full"),
  outcomeContainer: cn("text-center mb-12"),
  survivedIcon: cn(
    "block text-[2.5rem] mb-2 text-blue drop-shadow-[0_0_12px_rgba(59,130,246,0.45)]",
  ),
  survivedHeading: cn(
    "text-[clamp(2.5rem,8vw,5rem)] font-black tracking-[-0.02em] leading-none mb-3",
    "text-blue [text-shadow:0_0_60px_rgba(59,130,246,0.45)]",
  ),
  diedIcon: cn(
    "block text-[2.5rem] mb-2 text-red drop-shadow-[0_0_12px_rgba(220,38,38,0.45)]",
  ),
  diedHeading: cn(
    "text-[clamp(2.5rem,8vw,5rem)] font-black tracking-[-0.02em] leading-none mb-3",
    "text-red [text-shadow:0_0_60px_rgba(220,38,38,0.45)]",
  ),
  outcomeSub: cn("text-[0.95rem] text-secondary mt-2"),
  shareButton: cn(
    "block w-full px-6 py-[0.9rem] bg-surface border border-line rounded-[10px]",
    "text-primary font-display text-[0.9rem] font-semibold tracking-[0.04em]",
    "cursor-pointer mb-10 transition-[background-color,border-color] duration-150",
    "hover:bg-white/6 hover:border-white/15",
  ),
};

export default ResultsPage;
