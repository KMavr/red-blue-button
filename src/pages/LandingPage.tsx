import { useTranslation } from 'react-i18next';
import VoteButton from '../components/VoteButton';
import { useVote } from '../hooks/useVote';

function LandingPage() {
  const { t } = useTranslation();
  const { voting, error, submit } = useVote();

  return (
    <div className="landing">
      <div className="landing__content">
        <p className="landing__eyebrow">{t('landing-page.header')}</p>

        <h1 className="landing__headline">
          {t('landing-page.headline.line-1')}
          <br />
          {t('landing-page.headline.line-2')}
        </h1>

        <div className="landing__rules">
          <div className="landing__rule landing__rule--red">
            <span className="landing__rule-label">{t('landing-page.rules.red.label')}</span>
            <span className="landing__rule-text">{t('landing-page.rules.red.text')}</span>
          </div>
          <div className="landing__rule landing__rule--blue">
            <span className="landing__rule-label">{t('landing-page.rules.blue.label')}</span>
            <span className="landing__rule-text">{t('landing-page.rules.blue.text')}</span>
          </div>
        </div>

        <p className="landing__tension">
          {t('landing-page.tension.line-1')}
          <br />
          {t('landing-page.tension.line-2')}
          <br />
          {t('landing-page.tension.line-3')}
        </p>

        <p className="landing__cta">{t('landing-page.cta')}</p>

        {error && <p className="landing__error">{error}</p>}

        <div className="landing__buttons">
          <VoteButton color="red" disabled={voting} onVote={submit} />
          <VoteButton color="blue" disabled={voting} onVote={submit} />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
