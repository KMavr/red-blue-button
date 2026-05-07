import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '../../utils/cn';

interface NavLinksProps {
  links: { to: string; labelKey: string; color: 'red' | 'blue' | 'muted'; suffix?: string }[];
}

function NavLinks({ links }: NavLinksProps) {
  const { t } = useTranslation();

  return (
    <div className={styles.navLinks}>
      {links.map((link) => (
        <Link key={link.to} to={link.to} className={styles.navLink[link.color]}>
          {t(link.labelKey)}
          {link.suffix}
        </Link>
      ))}
    </div>
  );
}

const styles = {
  navLinks: cn('mt-8 mb-2 flex gap-6'),
  navLink: {
    blue: cn('text-blue text-[0.9rem] font-semibold no-underline hover:underline'),
    red: cn('text-red text-[0.9rem] font-semibold no-underline hover:underline'),
    muted: cn('text-secondary hover:text-primary text-[0.9rem] no-underline'),
  },
};

export default NavLinks;
