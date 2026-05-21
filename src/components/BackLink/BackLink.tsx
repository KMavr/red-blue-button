import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '../../utils/cn';

function BackLink() {
  const { t } = useTranslation();
  return (
    <Link to="/" className={styles.link}>
      {t('common.back')}
    </Link>
  );
}

const styles = {
  link: cn(
    'text-secondary hover:text-primary mb-6 inline-block rounded-xs text-sm no-underline',
    'focus-visible:outline-focus focus-visible:outline-2 focus-visible:outline-offset-2',
  ),
};

export default BackLink;
