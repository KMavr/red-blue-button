import { useTranslation } from "react-i18next";
import ResultBar from "../components/ResultBar";
import CountryBreakdown from "../components/CountryBreakdown";
import { useResults } from "../hooks/useResults";
import { useShare } from "../hooks/useShare";

function ResultsPage() {
  const { t } = useTranslation();
  const { results, loading, live, majority, survived } = useResults();
  const { copied, share } = useShare(survived);

  if (loading) {
    return (
      <div className="results results--loading">
        <p>{t("results-page.loading")}</p>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="results results--error">
        <p>{t("results-page.error")}</p>
      </div>
    );
  }

  const outcomeClass =
    survived === true
      ? "results--survived"
      : survived === false
        ? "results--died"
        : "";

  return (
    <div className={`results ${outcomeClass}`}>
      <div className="results__content">
        {survived !== null && (
          <div className="results__outcome">
            {survived ? (
              <>
                <span className="results__outcome-icon">◉</span>
                <h1 className="results__verdict results__verdict--survived">
                  {t("results-page.outcome.survived")}
                </h1>
              </>
            ) : (
              <>
                <span className="results__outcome-icon">✕</span>
                <h1 className="results__verdict results__verdict--died">
                  {t("results-page.outcome.died")}
                </h1>
              </>
            )}
            <p className="results__outcome-sub">
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

        <button className="share-btn" onClick={share}>
          {copied
            ? t("results-page.share-button.copied")
            : t("results-page.share-button.text")}
        </button>

        <CountryBreakdown countries={results.countries} />
      </div>
    </div>
  );
}

export default ResultsPage;
