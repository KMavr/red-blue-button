import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { animate } from "framer-motion";
import VoteButton from "../components/VoteButton";
import { useVote } from "../hooks/useVote";
import { useLandingStats } from "../hooks/useLandingStats";

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
    <div className="min-h-screen flex items-center justify-center px-5 pb-16 pt-8">
      <div className="max-w-160 w-full text-center">
        <p className="text-[0.7rem] tracking-[0.25em] text-secondary uppercase mb-8 rtl:tracking-normal rtl:normal-case rtl:text-[0.9rem]">
          {t("landing-page.header")}
        </p>

        <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.15] tracking-[-0.02em] mb-10">
          {t("landing-page.headline.line-1")}
          <br />
          {t("landing-page.headline.line-2")}
        </h1>

        <div className="flex flex-col gap-3 mb-8 text-left rtl:text-right">
          <div className="flex gap-4 items-start bg-surface border border-line [border-left:3px_solid_var(--color-red)] rounded-[10px] px-5 py-4 rtl:[border-left:1px_solid_var(--color-line)] rtl:[border-right:3px_solid_var(--color-red)]">
            <span className="text-[0.65rem] font-black tracking-[0.15em] px-2 py-0.5 rounded bg-[rgba(220,38,38,0.12)] text-red shrink-0 mt-0.5 rtl:tracking-normal rtl:text-[0.85rem]">
              {t("landing-page.rules.red.label")}
            </span>
            <span className="text-[0.95rem] leading-normal text-secondary">
              {t("landing-page.rules.red.text")}
            </span>
          </div>
          <div className="flex gap-4 items-start bg-surface border border-line [border-left:3px_solid_var(--color-blue)] rounded-[10px] px-5 py-4 rtl:[border-left:1px_solid_var(--color-line)] rtl:[border-right:3px_solid_var(--color-blue)]">
            <span className="text-[0.65rem] font-black tracking-[0.15em] px-2 py-0.5 rounded bg-[rgba(59,130,246,0.12)] text-blue shrink-0 mt-0.5 rtl:tracking-normal rtl:text-[0.85rem]">
              {t("landing-page.rules.blue.label")}
            </span>
            <span className="text-[0.95rem] leading-normal text-secondary">
              {t("landing-page.rules.blue.text")}
            </span>
          </div>
        </div>

        <p className="text-[0.95rem] leading-[1.8] text-secondary mb-6">
          {t("landing-page.tension.line-1")}
          <br />
          {t("landing-page.tension.line-2")}
          <br />
          {t("landing-page.tension.line-3")}
        </p>

        <p className="text-[1.1rem] font-semibold tracking-[0.02em] mb-10">
          {t("landing-page.cta")}
        </p>

        {total !== null && (
          <p className="flex items-center justify-center gap-2 text-[0.85rem] text-secondary mb-6">
            <span className="live-dot" aria-hidden="true" />
            <span ref={countRef}>{total.toLocaleString()}</span>{" "}
            {t("landing-page.live-count")}
          </p>
        )}

        {error && <p className="text-red text-[0.875rem] mb-4">{error}</p>}

        <div className="flex gap-5 justify-center flex-wrap">
          <VoteButton color="red" disabled={voting} onVote={submit} />
          <VoteButton color="blue" disabled={voting} onVote={submit} />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
