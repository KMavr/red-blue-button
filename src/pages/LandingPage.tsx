import VoteButton from "../components/VoteButton";
import { useVote } from "../hooks/useVote";

function LandingPage() {
  const { voting, error, submit } = useVote();

  return (
    <div className="landing">
      <div className="landing__content">
        <p className="landing__eyebrow">A GLOBAL DILEMMA</p>

        <h1 className="landing__headline">
          Every person on Earth
          <br />
          has a button.
        </h1>

        <div className="landing__rules">
          <div className="landing__rule landing__rule--red">
            <span className="landing__rule-label">RED</span>
            <span className="landing__rule-text">
              If more than half press red — only those who pressed red survive.
            </span>
          </div>
          <div className="landing__rule landing__rule--blue">
            <span className="landing__rule-label">BLUE</span>
            <span className="landing__rule-text">
              If more than half press blue — everyone survives.
            </span>
          </div>
        </div>

        <p className="landing__tension">
          You cannot communicate with others.
          <br />
          You cannot change your mind.
          <br />
          One press. Forever.
        </p>

        <p className="landing__cta">What do you choose?</p>

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
