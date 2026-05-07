import { cn } from '../../utils/cn';
import { useTranslation } from 'react-i18next';

interface ParagraphProps {
  text: string;
}

function Paragraph({ text }: ParagraphProps) {
  const { t } = useTranslation();

  return <p className={styles.body}>{t(text)}</p>;
}

const styles = {
  body: cn('text-secondary mb-2 text-[0.9rem] leading-[1.7]'),
};

export default Paragraph;
