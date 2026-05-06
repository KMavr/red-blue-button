import { Link } from "react-router-dom";
import { cn } from "../utils/cn";

function WhyBluePage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <h1 className={styles.h1}>Why Blue</h1>
        <p className={styles.subtitle}>The case for cooperation</p>

        <p className={styles.body}>
          Blue is the harder choice. It requires trusting strangers — billions
          of them — without any guarantee they'll trust you back. Here's why
          that bet might be worth making.
        </p>

        <h2 className={styles.h2}>If You Press Blue, Others Might Too</h2>
        <p className={styles.body}>
          Your choice doesn't happen in a vacuum. Millions of people are facing
          this exact question, reasoning through it the same way you are. If
          your logic leads you to blue, it's likely leading others there too.
          Blue is self-fulfilling in a way red isn't — the more people reason
          toward cooperation, the more cooperation becomes the rational choice.
        </p>

        <h2 className={styles.h2}>The Collective Payoff Is Higher</h2>
        <p className={styles.body}>
          Blue is the Pareto-optimal outcome: the only scenario where total
          survival is maximised. Red can only "win" by making blue lose. There's
          no version of a red majority where the world is better off than it
          would have been under a blue majority.
        </p>

        <h2 className={styles.h2}>Red Is Not Actually Safe</h2>
        <p className={styles.body}>
          Red feels safe because it avoids the worst individual outcome — dying
          in a blue failure. But if red wins, people die. If you press red and
          red wins, you survived by being part of the group that caused everyone
          else's death. The "safety" of red is conditional on others' suffering.
        </p>

        <h2 className={styles.h2}>Most People Choose Blue</h2>
        <p className={styles.body}>
          Across every version of this question that's gone viral, a clear
          majority chooses blue. The reasons range from moral responsibility to
          optimism about human nature to concern for loved ones. Whatever the
          motivation, the revealed preference of humanity in this experiment has
          consistently leaned cooperative.
        </p>
        <p className={styles.body}>
          If most people press blue, pressing red is a defection — taking the
          benefit of others' cooperation while refusing to offer it yourself.
        </p>

        <h2 className={styles.h2}>Trust Is a Schelling Point</h2>
        <p className={styles.body}>
          Game theorists call it a Schelling point: a solution people converge
          on without communication, simply because it's the obvious focal one.
          "Cooperate" is the natural focal point when the cooperative outcome is
          unambiguously better for everyone. Blue doesn't need a coordinated
          campaign — it just needs enough people to reason the same way.
        </p>

        <div className={styles.nav}>
          <Link to="/about" className={styles.mutedLink}>← The Dilemma</Link>
          <Link to="/why-red" className={styles.redLink}>Why red? →</Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: cn("min-h-screen flex justify-center px-5 py-16"),
  inner: cn("max-w-160 w-full"),
  h1: cn("text-[2rem] font-bold mb-1 text-blue"),
  subtitle: cn("text-secondary text-[0.8rem] mb-8"),
  h2: cn("text-base font-bold mt-8 mb-2 tracking-[0.02em]"),
  body: cn("text-[0.9rem] leading-[1.7] text-secondary mb-2"),
  nav: cn("flex justify-between mt-10"),
  mutedLink: cn("text-secondary text-[0.85rem] no-underline hover:text-primary"),
  redLink: cn("text-red font-semibold text-[0.85rem] no-underline hover:underline"),
};

export default WhyBluePage;
