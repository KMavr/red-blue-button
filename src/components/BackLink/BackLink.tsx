import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { cn } from "../../utils/cn";

function BackLink() {
  const { t } = useTranslation();
  return (
    <Link to="/" className={styles.link}>
      {t("common.back")}
    </Link>
  );
}

const styles = {
  link: cn("inline-block text-secondary text-[0.85rem] no-underline hover:text-primary mb-6"),
};

export default BackLink;
