import { useTranslation, Trans } from "react-i18next";
import { cn } from "../utils/cn";

function PrivacyPage() {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <h1 className={styles.h1}>{t("privacy-page.h1")}</h1>
        <p className={styles.subtitle}>{t("privacy-page.subtitle")}</p>

        <p className={styles.body}>{t("privacy-page.intro")}</p>

        <h2 className={styles.h2}>{t("privacy-page.collect.h2")}</h2>
        <p className={styles.body}>{t("privacy-page.collect.intro")}</p>
        <ul className={styles.list}>
          <li className={styles.body}>{t("privacy-page.collect.item1")}</li>
          <li className={styles.body}>{t("privacy-page.collect.item2")}</li>
          <li className={styles.body}>{t("privacy-page.collect.item3")}</li>
        </ul>

        <h2 className={styles.h2}>{t("privacy-page.cookies.h2")}</h2>
        <p className={styles.body}>{t("privacy-page.cookies.intro")}</p>
        <ul className={styles.list}>
          <li className={styles.body}>
            <strong>{t("privacy-page.cookies.voted-label")}</strong>{" "}
            — {t("privacy-page.cookies.voted-text")}
          </li>
          <li className={styles.body}>
            <strong>{t("privacy-page.cookies.choice-label")}</strong>{" "}
            — {t("privacy-page.cookies.choice-text")}
          </li>
        </ul>
        <p className={styles.body}>{t("privacy-page.cookies.outro")}</p>

        <h2 className={styles.h2}>{t("privacy-page.adsense.h2")}</h2>
        <p className={styles.body}>
          <Trans
            i18nKey="privacy-page.adsense.body"
            components={{
              googlePrivacy: (
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                />
              ),
              adSettings: (
                <a
                  href="https://adssettings.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                />
              ),
            }}
          />
        </p>

        <h2 className={styles.h2}>{t("privacy-page.sharing.h2")}</h2>
        <p className={styles.body}>{t("privacy-page.sharing.body")}</p>

        <h2 className={styles.h2}>{t("privacy-page.retention.h2")}</h2>
        <p className={styles.body}>{t("privacy-page.retention.body")}</p>

        <h2 className={styles.h2}>{t("privacy-page.contact.h2")}</h2>
        <p className={styles.body}>
          <Trans
            i18nKey="privacy-page.contact.body"
            components={{
              email: <a href="mailto:privacy@redor.blue" className={styles.link} />,
            }}
          />
        </p>
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
  link: cn("text-blue no-underline hover:underline"),
};

export default PrivacyPage;
