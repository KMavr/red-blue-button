import { useTranslation } from 'react-i18next';
import { cn } from '../../utils/cn';

interface LabeledListProps {
  items: { labelKey: string; textKey: string }[];
}

function LabeledList({ items }: LabeledListProps) {
  const { t } = useTranslation();
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item.labelKey} className={styles.body}>
          <strong>{t(item.labelKey)}</strong> — {t(item.textKey)}
        </li>
      ))}
    </ul>
  );
}

const styles = {
  list: cn('mb-2 list-disc pl-5'),
  body: cn('text-secondary mb-2 text-[0.9rem] leading-[1.7]'),
};

export default LabeledList;
