import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { cn } from "../utils/cn";

function AboutPage() {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <h1 className={styles.h1}>{t("about-page.h1")}</h1>
        <p className={styles.subtitle}>{t("about-page.subtitle")}</p>

        <p className={styles.body}>{t("about-page.intro")}</p>

        <h2 className={styles.h2}>{t("about-page.setup.h2")}</h2>
        <p className={styles.body}>{t("about-page.setup.body")}</p>
        <ul className={styles.list}>
          <li className={styles.body}>
            <span className={styles.red}>{t("about-page.setup.red-rule")}</span>
          </li>
          <li className={styles.body}>
            <span className={styles.blue}>{t("about-page.setup.blue-rule")}</span>
          </li>
        </ul>
        <p className={styles.body}>{t("about-page.setup.conclusion")}</p>

        <h2 className={styles.h2}>{t("about-page.two-answers.h2")}</h2>
        <p className={styles.body}>{t("about-page.two-answers.body1")}</p>
        <p className={styles.body}>{t("about-page.two-answers.body2")}</p>
        <p className={styles.body}>{t("about-page.two-answers.body3")}</p>

        <h2 className={styles.h2}>{t("about-page.viral.h2")}</h2>
        <p className={styles.body}>{t("about-page.viral.body1")}</p>
        <p className={styles.body}>{t("about-page.viral.body2")}</p>

        <h2 className={styles.h2}>{t("about-page.data.h2")}</h2>
        <p className={styles.body}>{t("about-page.data.body1")}</p>
        <p className={styles.body}>{t("about-page.data.body2")}</p>

        <div className={styles.whyLinks}>
          <Link to="/why-blue" className={styles.blueLink}>{t("about-page.why-blue-link")} →</Link>
          <Link to="/why-red" className={styles.redLink}>{t("about-page.why-red-link")} →</Link>
        </div>

        <h2 className={styles.h2}>{t("about-page.reading.h2")}</h2>
        <ul className={styles.list}>
          <li className={styles.body}>
            <a
              href="https://www.goodthoughts.blog/p/buttons-blenders-and-coordination"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {t("about-page.reading.link1-label")}
            </a>
          </li>
          <li className={styles.body}>
            <a
              href="https://theconversation.com/red-button-or-blue-button-what-a-viral-question-tells-us-about-game-theory-and-the-state-of-the-world-281993"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {t("about-page.reading.link2-label")}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

const styles = {
  wrapper: cn("min-h-screen flex justify-center px-5 py-16"),
  inner: cn("max-w-160 w-full"),
  h1: cn("text-[2rem] font-bold mb-1"),
  subtitle: cn("text-secondary text-[0.8rem] mb-8"),
  h2: cn("text-base font-bold mt-8 mb-2 tracking-[0.02em]"),
  body: cn("text-[0.9rem] leading-[1.7] text-secondary mb-2"),
  list: cn("pl-5 mb-2 list-disc"),
  red: cn("text-red font-semibold"),
  blue: cn("text-blue font-semibold"),
  link: cn("text-blue no-underline hover:underline"),
  whyLinks: cn("flex gap-6 mt-8 mb-2"),
  blueLink: cn("text-blue font-semibold text-[0.9rem] no-underline hover:underline"),
  redLink: cn("text-red font-semibold text-[0.9rem] no-underline hover:underline"),
};

export default AboutPage;
