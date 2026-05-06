import { Link } from "react-router-dom";
import { cn } from "../utils/cn";

function WhyRedPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <h1 className={styles.h1}>Why Red</h1>
        <p className={styles.subtitle}>The case for self-preservation</p>

        <p className={styles.body}>
          Red is the uncomfortable choice to defend — it sounds selfish. But the
          logic behind it is precise, and dismissing it as irrational misses the
          point of the dilemma.
        </p>

        <h2 className={styles.h2}>Red Is the Nash Equilibrium</h2>
        <p className={styles.body}>
          In game theory, a Nash equilibrium is a choice where you can't do
          better by switching, given what everyone else does. Red is that choice
          here: if more than half press blue, red pressers survive. If more than
          half press red, red pressers survive. Red dominates as an individual
          strategy regardless of what the majority does.
        </p>

        <h2 className={styles.h2}>You Can't Know What Others Will Do</h2>
        <p className={styles.body}>
          Blue only works if the majority cooperates. But you have no
          information about what the other billions of people are pressing. The
          rational response to genuine uncertainty is to choose the option that
          protects you across more scenarios — and that's red.
        </p>
        <p className={styles.body}>
          Pressing blue because you assume others will press blue is optimism
          posing as logic. It might be right. It might not be. Red doesn't
          require that assumption.
        </p>

        <h2 className={styles.h2}>The Framing Is Doing a Lot of Work</h2>
        <p className={styles.body}>
          Reframe the same question: a blender activates and kills you unless a
          majority of strangers also step into blenders. Would you step in?
          Almost no one would — yet the payoff structure is identical. The blue
          button <em>sounds</em> cooperative because it's framed that way. Strip
          the framing and you're being asked to stake your life on the goodwill
          of people you've never met and can't communicate with.
        </p>

        <h2 className={styles.h2}>Choosing Red Doesn't Make You the Villain</h2>
        <p className={styles.body}>
          If red wins, it's because the majority pressed red — not because one
          person did. An individual red press in a blue-majority world costs
          nothing and saves no one. An individual red press in a red-majority
          world saves exactly one person: you.
        </p>
        <p className={styles.body}>
          Red-choosers aren't causing harm. They're responding rationally to a
          system that doesn't reward trust with certainty.
        </p>

        <h2 className={styles.h2}>Distrust Isn't Cynicism, It's History</h2>
        <p className={styles.body}>
          The real-world parallels to this dilemma — arms races, climate
          commitments, collective action problems — have a mixed track record at
          best. People who've watched cooperative frameworks collapse, been
          betrayed by institutions, or simply grown up in environments where
          trust was a liability aren't being irrational when they press red.
          They're applying a prior built from experience.
        </p>

        <div className={styles.nav}>
          <Link to="/why-blue" className={styles.blueLink}>← Why blue?</Link>
          <Link to="/about" className={styles.mutedLink}>The Dilemma →</Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: cn("min-h-screen flex justify-center px-5 py-16"),
  inner: cn("max-w-160 w-full"),
  h1: cn("text-[2rem] font-bold mb-1 text-red"),
  subtitle: cn("text-secondary text-[0.8rem] mb-8"),
  h2: cn("text-base font-bold mt-8 mb-2 tracking-[0.02em]"),
  body: cn("text-[0.9rem] leading-[1.7] text-secondary mb-2"),
  nav: cn("flex justify-between mt-10"),
  blueLink: cn("text-blue font-semibold text-[0.85rem] no-underline hover:underline"),
  mutedLink: cn("text-secondary text-[0.85rem] no-underline hover:text-primary"),
};

export default WhyRedPage;
