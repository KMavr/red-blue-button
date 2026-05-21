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
  h2: cn('mt-10 mb-3 text-xl font-bold tracking-[-0.01em]'),
};

export default Heading;
