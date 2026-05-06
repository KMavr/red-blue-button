import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { animate } from "framer-motion";
import VoteButton from "../components/VoteButton";
import { useVote } from "../hooks/useVote";
import { useLandingStats } from "../hooks/useLandingStats";
import { cn } from "../utils/cn";

function LandingPage() {
  const { t } = useTranslation();
  const { voting, error, submit } = useVote();
  const { total } = useLandingStats();
  const countRef = useRef<HTMLSpanElement>(null);
  const displayedTotal = useRef(0);

  useEffect(() => {
    if (total === null || !countRef.current) return;
    const node = countRef.current;
    const from = displayedTotal.current;
    const to = total;
    animate(from, to, {
      duration: 1,
      ease: "easeOut",
      onUpdate(v) {
        node.textContent = Math.round(v).toLocaleString();
      },
    });
    displayedTotal.current = to;
  }, [total]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <p className={styles.header}>{t("landing-page.header")}</p>

        <h1 className={styles.headline}>{t("landing-page.headline")}</h1>

        <div className={styles.rules}>
          <p className={styles.rule}>
            <span className={styles.redLabel}>{t("landing-page.rules.red.label")}</span>
            {" "}{t("landing-page.rules.red.text")}
          </p>
          <p className={styles.rule}>
            <span className={styles.blueLabel}>{t("landing-page.rules.blue.label")}</span>
            {" "}{t("landing-page.rules.blue.text")}
          </p>
        </div>

        <p className={styles.cta}>{t("landing-page.cta")}</p>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.buttons}>
          <VoteButton color="red" disabled={voting} onVote={submit} />
          <VoteButton color="blue" disabled={voting} onVote={submit} />
        </div>

        {total !== null && (
          <p className={styles.liveCount}>
            <span className="live-dot" aria-hidden="true" />
            <span ref={countRef}>{total.toLocaleString()}</span>{" "}
            {t("landing-page.live-count")}
          </p>
        )}
      </div>
    </div>
  );
}

const styles = {
  wrapper: cn("min-h-screen flex items-center justify-center px-5 pb-20 pt-6"),
  inner: cn("max-w-160 w-full text-center"),
  header: cn(
    "text-[0.7rem] tracking-[0.25em] text-secondary uppercase mb-5",
    "rtl:tracking-normal rtl:normal-case rtl:text-[0.9rem]",
  ),
  headline: cn(
    "text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.15] tracking-[-0.02em] mb-7",
  ),
  rules: cn("flex flex-col gap-2 mb-6 text-left rtl:text-right"),
  rule: cn("text-[0.9rem] leading-normal text-secondary"),
  redLabel: cn("font-semibold text-red"),
  blueLabel: cn("font-semibold text-blue"),
  cta: cn("text-[1.1rem] font-semibold tracking-[0.02em] mb-8"),
  liveCount: cn("flex items-center justify-center gap-2 text-[0.85rem] text-secondary mt-6"),
  error: cn("text-red text-[0.875rem] mb-4"),
  buttons: cn("flex gap-5 justify-center flex-wrap"),
};

export default LandingPage;
