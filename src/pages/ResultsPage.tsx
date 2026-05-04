import ResultBar from "../components/ResultBar";
import CountryBreakdown from "../components/CountryBreakdown";
import { useResults } from "../hooks/useResults";
import { useShare } from "../hooks/useShare";

function ResultsPage() {
  const { results, loading, live, majority, survived } = useResults();
  const { copied, share } = useShare(survived, results?.bluePct ?? 50);

  if (loading) {
    return (
      <div className="results results--loading">
        <p>Counting votes…</p>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="results results--error">
        <p>Failed to load results.</p>
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
                  YOU SURVIVED
                </h1>
              </>
            ) : (
              <>
                <span className="results__outcome-icon">✕</span>
                <h1 className="results__verdict results__verdict--died">
                  YOU DIED
                </h1>
              </>
            )}
            <p className="results__outcome-sub">
              {majority === "blue"
                ? "Blue holds the majority — humanity lives."
                : "Red holds the majority — only the red survive."}
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
          {copied ? "Copied!" : "Share this dilemma"}
        </button>

        <CountryBreakdown countries={results.countries} />
      </div>
    </div>
  );
}

export default ResultsPage;
