import { useTranslation } from 'react-i18next';
import { cn } from '../../utils/cn';

interface ColoredListProps {
  items: { key: string; color: 'red' | 'blue' }[];
}

function ColoredList({ items }: ColoredListProps) {
  const { t } = useTranslation();

  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item.key} className={styles.body}>
          <span className={styles[item.color]}>{t(item.key)}</span>
        </li>
      ))}
    </ul>
  );
}

const styles = {
  body: cn('text-secondary mb-2 text-[0.9rem] leading-[1.7]'),
  list: cn('mb-2 list-disc pl-5'),
  red: cn('text-red font-semibold'),
  blue: cn('text-blue font-semibold'),
};

export default ColoredList;
