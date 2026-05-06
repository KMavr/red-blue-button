import { cn } from "../utils/cn";

function PrivacyPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <h1 className={styles.h1}>Privacy Policy</h1>
        <p className={styles.subtitle}>Last updated: May 5, 2026</p>

        <p className={styles.body}>
          This privacy policy describes how redor.blue ("we", "us") handles
          information when you use our website.
        </p>

        <h2 className={styles.h2}>Information We Collect</h2>
        <p className={styles.body}>When you cast a vote, we record:</p>
        <ul className={styles.list}>
          <li className={styles.body}>Your vote choice (red or blue)</li>
          <li className={styles.body}>
            Your country, derived from your IP address
          </li>
          <li className={styles.body}>
            A one-way SHA-256 hash of your IP address, used solely to prevent
            duplicate votes. Your raw IP address is never stored.
          </li>
        </ul>

        <h2 className={styles.h2}>Cookies</h2>
        <p className={styles.body}>We store two cookies in your browser:</p>
        <ul className={styles.list}>
          <li className={styles.body}>
            <strong>voted</strong> — records that you have already voted, so we
            can redirect you to the results page
          </li>
          <li className={styles.body}>
            <strong>last_choice</strong> — remembers your choice (red or blue)
            to show your personal outcome
          </li>
        </ul>
        <p className={styles.body}>
          These cookies contain no personal information and are not used for
          tracking or advertising.
        </p>

        <h2 className={styles.h2}>Google AdSense</h2>
        <p className={styles.body}>
          We use Google AdSense to display advertisements. Google may use
          cookies and collect data about your browsing activity to serve
          personalised ads. This is governed by{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Google's Privacy Policy
          </a>
          . You can opt out of personalised advertising via{" "}
          <a
            href="https://adssettings.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Google's Ad Settings
          </a>
          .
        </p>

        <h2 className={styles.h2}>Data Sharing</h2>
        <p className={styles.body}>
          We do not sell, trade, or share your data with any third party, except
          as described above (Google AdSense).
        </p>

        <h2 className={styles.h2}>Data Retention</h2>
        <p className={styles.body}>
          Vote data (choice, country, and hashed IP) is retained indefinitely
          for the purpose of displaying aggregate results. No personally
          identifiable information is stored.
        </p>

        <h2 className={styles.h2}>Contact</h2>
        <p className={styles.body}>
          If you have any questions about this policy, you can reach us at{" "}
          <a href="mailto:privacy@redor.blue" className={styles.link}>
            privacy@redor.blue
          </a>
          .
        </p>
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
  link: cn("text-blue no-underline hover:underline"),
};

export default PrivacyPage;
