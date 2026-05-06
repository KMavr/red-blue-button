import { Link } from "react-router-dom";
import { cn } from "../utils/cn";

function AboutPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <h1 className={styles.h1}>The Dilemma</h1>
        <p className={styles.subtitle}>Why this question is harder than it looks</p>

        <p className={styles.body}>
          This isn't a poll. It's a thought experiment with real stakes — a live
          version of one of the most studied problems in game theory: the{" "}
          <em>coordination game</em>.
        </p>

        <h2 className={styles.h2}>The Setup</h2>
        <p className={styles.body}>
          Every person who visits this site faces the same binary choice with no
          communication, no second chances, and consequences that depend entirely
          on what everyone else decides. The rules are simple:
        </p>
        <ul className={styles.list}>
          <li className={styles.body}>
            <span className={styles.red}>Red majority</span> — only those who
            pressed red survive.
          </li>
          <li className={styles.body}>
            <span className={styles.blue}>Blue majority</span> — everyone
            survives.
          </li>
        </ul>
        <p className={styles.body}>
          Blue is better for the world. Red is safer for you — if you don't
          trust the world.
        </p>

        <h2 className={styles.h2}>Two Rational Answers</h2>
        <p className={styles.body}>
          Game theorists would point out that red is the{" "}
          <em>Nash equilibrium</em> choice: the individually optimal move
          regardless of what others do. If more than half press blue, red
          pressers survive. If not, red pressers survive anyway. Red dominates
          as a personal strategy.
        </p>
        <p className={styles.body}>
          But blue is the <em>Pareto-optimal</em> outcome — the choice that
          minimises total harm if enough people make it. The catch is that blue
          only works if you trust that others will cooperate. And you have no
          way of knowing if they will.
        </p>
        <p className={styles.body}>
          Neither answer is irrational. Red-choosers are protecting themselves
          under genuine uncertainty. Blue-choosers are betting that trust is
          self-fulfilling — that if enough people reason the same way, the
          cooperative outcome becomes real.
        </p>

        <h2 className={styles.h2}>Why It Goes Viral</h2>
        <p className={styles.body}>
          The question keeps resurfacing because it maps onto almost every major
          collective problem humanity faces: vaccination, climate commitments,
          arms races, nuclear deterrence. In each case, the individually safe
          choice undermines the collectively good one — and vice versa.
        </p>
        <p className={styles.body}>
          The virality also reflects something about our moment. We're
          increasingly aware of global interdependence, increasingly uncertain
          about whether other people will cooperate, and increasingly drawn to
          thought experiments that force the question.
        </p>

        <h2 className={styles.h2}>What the Data Shows</h2>
        <p className={styles.body}>
          Across surveys and viral polls, a consistent majority chooses blue —
          despite the logical case for red. The reasons vary: concern for loved
          ones, moral responsibility, optimism about human nature, or the simple
          belief that if <em>you</em> press blue, maybe enough others will too.
        </p>
        <p className={styles.body}>
          Whether that optimism is rational or naive is exactly the question.
        </p>

        <div className={styles.whyLinks}>
          <Link to="/why-blue" className={styles.blueLink}>Why blue? →</Link>
          <Link to="/why-red" className={styles.redLink}>Why red? →</Link>
        </div>

        <h2 className={styles.h2}>Further Reading</h2>
        <ul className={styles.list}>
          <li className={styles.body}>
            <a
              href="https://www.goodthoughts.blog/p/buttons-blenders-and-coordination"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Buttons, Blenders, and Coordination — Good Thoughts
            </a>
          </li>
          <li className={styles.body}>
            <a
              href="https://theconversation.com/red-button-or-blue-button-what-a-viral-question-tells-us-about-game-theory-and-the-state-of-the-world-281993"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              What a viral question tells us about game theory — The Conversation
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

const styles = {
  wrapper: cn("min-h-screen flex justify-center px-5 py-16"),
  inner: cn("max-w-160 w-full"),
  h1: cn("text-[2rem] font-bold mb-1"),
  subtitle: cn("text-secondary text-[0.8rem] mb-8"),
  h2: cn("text-base font-bold mt-8 mb-2 tracking-[0.02em]"),
  body: cn("text-[0.9rem] leading-[1.7] text-secondary mb-2"),
  list: cn("pl-5 mb-2 list-disc"),
  red: cn("text-red font-semibold"),
  blue: cn("text-blue font-semibold"),
  link: cn("text-blue no-underline hover:underline"),
  whyLinks: cn("flex gap-6 mt-8 mb-2"),
  blueLink: cn("text-blue font-semibold text-[0.9rem] no-underline hover:underline"),
  redLink: cn("text-red font-semibold text-[0.9rem] no-underline hover:underline"),
};

export default AboutPage;
