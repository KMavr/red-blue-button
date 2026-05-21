import { useTranslation } from 'react-i18next';
import BackLink from '../components/BackLink/BackLink';
import { PRIVACY_BLOCKS } from '../config/infoTexts';
import { cn } from '../utils/cn';

function PrivacyPage() {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <article className={styles.inner}>
        <BackLink />
        <header className={styles.header}>
          <h1 className={styles.h1}>{t('privacy-page.h1')}</h1>
          <p className={styles.subtitle}>{t('privacy-page.subtitle')}</p>
        </header>
        {PRIVACY_BLOCKS.map(({ component: Component, props }, i) => (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          <Component key={i} {...(props as any)} />
        ))}
      </article>
    </div>
  );
}

const styles = {
  wrapper: cn('flex grow justify-center px-5 py-16'),
  inner: cn('w-full max-w-160'),
  header: cn('border-line mb-8 border-b pb-6'),
  h1: cn('mb-2 text-2xl font-bold'),
  subtitle: cn('text-secondary text-sm'),
};

export default PrivacyPage;
