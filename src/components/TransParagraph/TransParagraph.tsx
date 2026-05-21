import { Trans } from 'react-i18next';
import { cn } from '../../utils/cn';

interface TransLink {
  name: string;
  href: string;
  email?: boolean;
}

interface TransParagraphProps {
  i18nKey: string;
  links: TransLink[];
}

function TransParagraph({ i18nKey, links }: TransParagraphProps) {
  const components = Object.fromEntries(
    links.map(({ name, href, email }) => [
      name,
      email ? (
        <a href={href} className={styles.link} />
      ) : (
        <a href={href} target="_blank" rel="noopener noreferrer" className={styles.link} />
      ),
    ]),
  );

  return (
    <p className={styles.body}>
      <Trans i18nKey={i18nKey} components={components} />
    </p>
  );
}

const styles = {
  body: cn('text-secondary mb-2 text-sm leading-[1.7]'),
  link: cn(
    'text-blue rounded-xs no-underline hover:underline',
    'focus-visible:outline-focus focus-visible:outline-2 focus-visible:outline-offset-2',
  ),
};

export default TransParagraph;
