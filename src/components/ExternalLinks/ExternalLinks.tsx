import { useTranslation } from 'react-i18next';
import { cn } from '../../utils/cn';

interface ExternalLinksProps {
  items: { href: string; labelKey: string }[];
}

function ExternalLinks({ items }: ExternalLinksProps) {
  const { t } = useTranslation();

  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item.href} className={styles.body}>
          <a href={item.href} target="_blank" rel="noopener noreferrer" className={styles.link}>
            {t(item.labelKey)}
          </a>
        </li>
      ))}
    </ul>
  );
}

const styles = {
  body: cn('text-secondary mb-2 text-[0.9rem] leading-[1.7]'),
  list: cn('mb-2 list-disc pl-5'),
  link: cn('text-blue no-underline hover:underline'),
};

export default ExternalLinks;
