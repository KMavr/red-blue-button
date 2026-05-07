import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const RTL_LANGUAGES = new Set(['ar']);

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'el', label: 'Ελληνικά' },
  { code: 'es', label: 'Español' },
  { code: 'pt', label: 'Português' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'it', label: 'Italiano' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'zh', label: '中文' },
  { code: 'ru', label: 'Русский' },
  { code: 'ar', label: 'العربية' },
];

function LanguageSelector() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentCode = i18n.language.split('-')[0];
  const currentLabel = LANGUAGES.find((l) => l.code === currentCode)?.label ?? currentCode;

  useEffect(() => {
    const dir = RTL_LANGUAGES.has(currentCode) ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = currentCode;
  }, [currentCode]);

  useEffect(() => {
    if (!open) return;
    function handleOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  function select(code: string) {
    i18n.changeLanguage(code);
    setOpen(false);
  }

  return (
    <div ref={containerRef} className={styles.container}>
      <button
        className={styles.trigger}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language">
        <span>{currentLabel}</span>
        <svg
          className={cn(
            'h-2.5 w-2.5 shrink-0 transition-transform duration-150',
            open && 'rotate-180',
          )}
          viewBox="0 0 10 6"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true">
          <path fill="currentColor" d="M0 0l5 6 5-6z" />
        </svg>
      </button>

      {open && (
        <ul className={styles.menu} role="listbox">
          {LANGUAGES.map(({ code, label }) => (
            <li
              key={code}
              role="option"
              aria-selected={code === currentCode}
              className={styles.option({ active: code === currentCode })}
              onClick={() => select(code)}>
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  container: cn(
    'fixed top-4 right-4 z-100 rtl:right-auto rtl:left-4',
    'max-[480px]:top-3 max-[480px]:right-3 rtl:max-[480px]:right-auto rtl:max-[480px]:left-3',
  ),
  trigger: cn(
    'bg-surface border-line flex items-center gap-2 rounded-lg border',
    'text-secondary font-display py-[0.4rem] pr-2.5 pl-3 text-[0.75rem]',
    'cursor-pointer transition-[border-color,color] duration-150',
    'hover:text-primary hover:border-white/20',
    'max-[480px]:py-[0.35rem] max-[480px]:pr-2 max-[480px]:pl-2.5 max-[480px]:text-[0.7rem]',
  ),
  menu: cn(
    'absolute top-full right-0 mt-1 rtl:right-auto rtl:left-0',
    'bg-surface border-line overflow-hidden rounded-lg border',
    'z-100 min-w-[9rem] py-1',
    'shadow-[0_8px_24px_rgba(0,0,0,0.4)]',
  ),
  option: cva(
    cn(
      'font-display cursor-pointer px-3 py-[0.45rem] text-[0.75rem] whitespace-nowrap transition-colors duration-100',
    ),
    {
      variants: {
        active: {
          true: 'text-primary bg-white/5',
          false: 'text-secondary hover:text-primary hover:bg-white/4',
        },
      },
    },
  ),
};

export default LanguageSelector;
