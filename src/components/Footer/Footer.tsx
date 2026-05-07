import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { cn } from "../../utils/cn";

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className={styles.footer}>
      <span className={styles.copy}>© 2026 redor.blue</span>
      <Link to="/about" className={styles.link}>{t("footer.dilemma")}</Link>
      <Link to="/privacy" className={styles.link}>{t("footer.privacy")}</Link>
    </footer>
  );
}

const styles = {
  footer: cn("fixed bottom-0 left-0 right-0 flex justify-center gap-6 border-t border-line bg-canvas px-6 py-6 z-50"),
  copy: cn("text-secondary text-xs tracking-wider"),
  link: cn("text-secondary text-xs no-underline tracking-wider hover:text-primary"),
};

export default Footer;
