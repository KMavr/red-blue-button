import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { cn } from "../utils/cn";

function WhyBluePage() {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <Link to="/" className={styles.back}>← Back</Link>
        <h1 className={styles.h1}>{t("why-blue-page.h1")}</h1>
        <p className={styles.subtitle}>{t("why-blue-page.subtitle")}</p>

        <p className={styles.body}>{t("why-blue-page.intro")}</p>

        <h2 className={styles.h2}>{t("why-blue-page.self-fulfilling.h2")}</h2>
        <p className={styles.body}>{t("why-blue-page.self-fulfilling.body")}</p>

        <h2 className={styles.h2}>{t("why-blue-page.collective.h2")}</h2>
        <p className={styles.body}>{t("why-blue-page.collective.body")}</p>

        <h2 className={styles.h2}>{t("why-blue-page.red-unsafe.h2")}</h2>
        <p className={styles.body}>{t("why-blue-page.red-unsafe.body")}</p>

        <h2 className={styles.h2}>{t("why-blue-page.majority.h2")}</h2>
        <p className={styles.body}>{t("why-blue-page.majority.body1")}</p>
        <p className={styles.body}>{t("why-blue-page.majority.body2")}</p>

        <h2 className={styles.h2}>{t("why-blue-page.schelling.h2")}</h2>
        <p className={styles.body}>{t("why-blue-page.schelling.body")}</p>

        <div className={styles.nav}>
          <Link to="/about" className={styles.mutedLink}>{t("why-blue-page.nav.about")}</Link>
          <Link to="/why-red" className={styles.redLink}>{t("why-blue-page.nav.red")}</Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: cn("min-h-screen flex justify-center px-5 py-16"),
  inner: cn("max-w-160 w-full"),
  h1: cn("text-[2rem] font-bold mb-1 text-blue"),
  subtitle: cn("text-secondary text-[0.8rem] mb-8"),
  h2: cn("text-base font-bold mt-8 mb-2 tracking-[0.02em]"),
  body: cn("text-[0.9rem] leading-[1.7] text-secondary mb-2"),
  back: cn("inline-block text-secondary text-[0.85rem] no-underline hover:text-primary mb-6"),
  nav: cn("flex justify-between mt-10"),
  mutedLink: cn("text-secondary text-[0.85rem] no-underline hover:text-primary"),
  redLink: cn("text-red font-semibold text-[0.85rem] no-underline hover:underline"),
};

export default WhyBluePage;
