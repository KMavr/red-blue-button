import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "../utils/cn";

const RTL_LANGUAGES = new Set(["ar"]);

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "el", label: "Ελληνικά" },
  { code: "es", label: "Español" },
  { code: "pt", label: "Português" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "it", label: "Italiano" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" },
  { code: "zh", label: "中文" },
  { code: "ru", label: "Русский" },
  { code: "ar", label: "العربية" },
];

function LanguageSelector() {
  const { i18n } = useTranslation();

  const currentCode = i18n.language.split("-")[0];

  useEffect(() => {
    const dir = RTL_LANGUAGES.has(currentCode) ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    document.documentElement.lang = currentCode;
  }, [currentCode]);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    i18n.changeLanguage(e.target.value);
  }

  return (
    <div className={styles.container}>
      <select
        className={styles.select}
        value={currentCode}
        onChange={handleChange}
        aria-label="Select language"
      >
        {LANGUAGES.map(({ code, label }) => (
          <option key={code} value={code}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

const styles = {
  container: cn(
    "fixed top-4 right-4 z-100 rtl:right-auto rtl:left-4 max-[480px]:top-3 max-[480px]:right-3 rtl:max-[480px]:right-auto rtl:max-[480px]:left-3",
  ),
  select: cn(
    "select-arrow appearance-none bg-surface border border-line rounded-lg text-secondary font-display text-[0.75rem]",
    "pl-3 pr-8 py-[0.4rem] cursor-pointer transition-[border-color,color] duration-150 ",
    " hover:border-white/20 hover:text-primary focus:border-white/20 focus:text-primary focus:outline-none ",
    "max-[480px]:text-[0.7rem] max-[480px]:pl-2.5 max-[480px]:pr-7 max-[480px]:py-[0.35rem]",
  ),
};

export default LanguageSelector;
