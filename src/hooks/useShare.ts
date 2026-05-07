import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const SITE_URL = 'https://redor.blue';

export function useShare(survived: boolean | null) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  function share() {
    const key = survived ? 'results-page.share.text.survived' : 'results-page.share.text.died';
    const text = t(key, { url: SITE_URL });

    if (navigator.share) {
      navigator.share({ title: t('landing-page.header'), text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }

  return { copied, share };
}
