import { useTranslation } from 'react-i18next';
import { cn } from '../../utils/cn';

interface PlainListProps {
  items: string[];
}

function PlainList({ items }: PlainListProps) {
  const { t } = useTranslation();
  return (
    <ul className={styles.list}>
      {items.map((key) => (
        <li key={key} className={styles.body}>
          {t(key)}
        </li>
      ))}
    </ul>
  );
}

const styles = {
  list: cn('mb-2 list-disc pl-5'),
  body: cn('text-secondary mb-2 text-sm leading-[1.7]'),
};

export default PlainList;
