import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BackLink from "../components/BackLink/BackLink";
import { cn } from "../utils/cn";

function WhyRedPage() {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <BackLink />
        <h1 className={styles.h1}>{t("why-red-page.h1")}</h1>
        <p className={styles.subtitle}>{t("why-red-page.subtitle")}</p>

        <p className={styles.body}>{t("why-red-page.intro")}</p>

        <h2 className={styles.h2}>{t("why-red-page.nash.h2")}</h2>
        <p className={styles.body}>{t("why-red-page.nash.body")}</p>

        <h2 className={styles.h2}>{t("why-red-page.uncertainty.h2")}</h2>
        <p className={styles.body}>{t("why-red-page.uncertainty.body1")}</p>
        <p className={styles.body}>{t("why-red-page.uncertainty.body2")}</p>

        <h2 className={styles.h2}>{t("why-red-page.framing.h2")}</h2>
        <p className={styles.body}>{t("why-red-page.framing.body")}</p>

        <h2 className={styles.h2}>{t("why-red-page.villain.h2")}</h2>
        <p className={styles.body}>{t("why-red-page.villain.body1")}</p>
        <p className={styles.body}>{t("why-red-page.villain.body2")}</p>

        <h2 className={styles.h2}>{t("why-red-page.distrust.h2")}</h2>
        <p className={styles.body}>{t("why-red-page.distrust.body")}</p>

        <div className={styles.nav}>
          <Link to="/why-blue" className={styles.blueLink}>{t("why-red-page.nav.blue")}</Link>
          <Link to="/about" className={styles.mutedLink}>{t("why-red-page.nav.about")}</Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: cn("min-h-screen flex justify-center px-5 py-16"),
  inner: cn("max-w-160 w-full"),
  h1: cn("text-[2rem] font-bold mb-1 text-red"),
  subtitle: cn("text-secondary text-[0.8rem] mb-8"),
  h2: cn("text-base font-bold mt-8 mb-2 tracking-[0.02em]"),
  body: cn("text-[0.9rem] leading-[1.7] text-secondary mb-2"),

  nav: cn("flex justify-between mt-10"),
  blueLink: cn("text-blue font-semibold text-[0.85rem] no-underline hover:underline"),
  mutedLink: cn("text-secondary text-[0.85rem] no-underline hover:text-primary"),
};

export default WhyRedPage;
