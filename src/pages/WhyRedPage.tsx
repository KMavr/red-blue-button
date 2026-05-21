import { useTranslation } from 'react-i18next';
import BackLink from '../components/BackLink/BackLink';
import { WHY_RED_BLOCKS } from '../config/infoTexts';
import { cn } from '../utils/cn';

function WhyRedPage() {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <article className={styles.inner}>
        <BackLink />
        <header className={styles.header}>
          <h1 className={styles.h1}>{t('why-red-page.h1')}</h1>
          <p className={styles.subtitle}>{t('why-red-page.subtitle')}</p>
        </header>
        {WHY_RED_BLOCKS.map(({ component: Component, props }, i) => (
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
  h1: cn('text-red mb-2 text-2xl font-bold'),
  subtitle: cn('text-secondary text-sm'),
};

export default WhyRedPage;
