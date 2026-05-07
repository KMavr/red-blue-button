import { cn } from '../../utils/cn';
import { useTranslation } from 'react-i18next';

interface HeadingProps {
  text: string;
}

function Heading({ text }: HeadingProps) {
  const { t } = useTranslation();

  return <h2 className={styles.h2}>{t(text)}</h2>;
}

const styles = {
  h2: cn('mt-8 mb-2 text-base font-bold tracking-[0.02em]'),
};

export default Heading;
