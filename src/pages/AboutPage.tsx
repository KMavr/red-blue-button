import { useTranslation } from 'react-i18next';
import BackLink from '../components/BackLink/BackLink';
import { ABOUT_BLOCKS } from '../model/infoTexts';
import { cn } from '../utils/cn';

function AboutPage() {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <BackLink />
        <h1 className={styles.h1}>{t('about-page.h1')}</h1>
        <p className={styles.subtitle}>{t('about-page.subtitle')}</p>
        {ABOUT_BLOCKS.map(({ component: Component, props }, i) => (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          <Component key={i} {...(props as any)} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  wrapper: cn('flex min-h-screen justify-center px-5 py-16'),
  inner: cn('w-full max-w-160'),
  h1: cn('mb-1 text-[2rem] font-bold'),
  subtitle: cn('text-secondary mb-8 text-[0.8rem]'),
};

export default AboutPage;
