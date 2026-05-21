import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '../../utils/cn';

interface NavLinksProps {
  links: { to: string; labelKey: string; color: 'red' | 'blue' | 'muted'; suffix?: string }[];
  className?: string;
}

function NavLinks({ links, className }: NavLinksProps) {
  const { t } = useTranslation();

  return (
    <div className={cn(styles.navLinks, className)}>
      {links.map((link) => (
        <Link key={link.to} to={link.to} className={styles.navLink[link.color]}>
          {t(link.labelKey)}
          {link.suffix}
        </Link>
      ))}
    </div>
  );
}

const focusRing = cn(
  'focus-visible:outline-focus rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2',
);

const styles = {
  navLinks: cn('mt-8 mb-2 flex flex-wrap gap-x-6 gap-y-2'),
  navLink: {
    blue: cn('text-blue text-sm font-semibold no-underline hover:underline', focusRing),
    red: cn('text-red text-sm font-semibold no-underline hover:underline', focusRing),
    muted: cn('text-secondary hover:text-primary text-sm no-underline', focusRing),
  },
};

export default NavLinks;
