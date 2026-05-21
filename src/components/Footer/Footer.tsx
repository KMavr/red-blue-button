import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaGithubSquare } from 'react-icons/fa';
import { cn } from '../../utils/cn';

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className={styles.footer}>
      <span className={styles.copy}>© 2026 redor.blue</span>
      <Link to="/about" className={styles.link}>
        {t('footer.dilemma')}
      </Link>
      <Link to="/privacy" className={styles.link}>
        {t('footer.privacy')}
      </Link>
      <a
        href="https://github.com/KMavr/red-blue-button"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.github}
        aria-label="View source on GitHub">
        <FaGithubSquare />
      </a>
    </footer>
  );
}

const focusRing = cn(
  'focus-visible:outline-focus rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2',
);

const styles = {
  footer: cn(
    'border-line bg-canvas flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t px-6 py-6',
  ),
  copy: cn('text-secondary text-xs tracking-wider'),
  link: cn('text-secondary hover:text-primary text-xs tracking-wider no-underline', focusRing),
  github: cn(
    'text-secondary hover:text-primary flex items-center text-base leading-none',
    focusRing,
  ),
};

export default Footer;
