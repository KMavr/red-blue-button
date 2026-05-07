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
  link: cn('text-secondary hover:text-primary mb-6 inline-block text-[0.85rem] no-underline'),
};

export default BackLink;
