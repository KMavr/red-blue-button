import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
    </footer>
  );
}

const styles = {
  footer: cn(
    'border-line bg-canvas fixed right-0 bottom-0 left-0 z-50 flex justify-center gap-6 border-t px-6 py-6',
  ),
  copy: cn('text-secondary text-xs tracking-wider'),
  link: cn('text-secondary hover:text-primary text-xs tracking-wider no-underline'),
};

export default Footer;
