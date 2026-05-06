function PrivacyPage() {
  return (
    <div className="min-h-screen flex justify-center px-5 py-16">
      <div className="max-w-160 w-full">
        <h1 className="text-[2rem] font-bold mb-1">Privacy Policy</h1>
        <p className="text-secondary text-[0.8rem] mb-8">
          Last updated: May 5, 2026
        </p>

        <p className="text-[0.9rem] leading-[1.7] text-secondary mb-2">
          This privacy policy describes how redor.blue ("we", "us") handles
          information when you use our website.
        </p>

        <h2 className="text-base font-bold mt-8 mb-2 tracking-[0.02em]">
          Information We Collect
        </h2>
        <p className="text-[0.9rem] leading-[1.7] text-secondary mb-2">
          When you cast a vote, we record:
        </p>
        <ul className="pl-5 mb-2 list-disc">
          <li className="text-[0.9rem] leading-[1.7] text-secondary mb-2">
            Your vote choice (red or blue)
          </li>
          <li className="text-[0.9rem] leading-[1.7] text-secondary mb-2">
            Your country, derived from your IP address
          </li>
          <li className="text-[0.9rem] leading-[1.7] text-secondary mb-2">
            A one-way SHA-256 hash of your IP address, used solely to prevent
            duplicate votes. Your raw IP address is never stored.
          </li>
        </ul>

        <h2 className="text-base font-bold mt-8 mb-2 tracking-[0.02em]">
          Cookies
        </h2>
        <p className="text-[0.9rem] leading-[1.7] text-secondary mb-2">
          We store two cookies in your browser:
        </p>
        <ul className="pl-5 mb-2 list-disc">
          <li className="text-[0.9rem] leading-[1.7] text-secondary mb-2">
            <strong>voted</strong> — records that you have already voted, so we
            can redirect you to the results page
          </li>
          <li className="text-[0.9rem] leading-[1.7] text-secondary mb-2">
            <strong>last_choice</strong> — remembers your choice (red or blue)
            to show your personal outcome
          </li>
        </ul>
        <p className="text-[0.9rem] leading-[1.7] text-secondary mb-2">
          These cookies contain no personal information and are not used for
          tracking or advertising.
        </p>

        <h2 className="text-base font-bold mt-8 mb-2 tracking-[0.02em]">
          Google AdSense
        </h2>
        <p className="text-[0.9rem] leading-[1.7] text-secondary mb-2">
          We use Google AdSense to display advertisements. Google may use
          cookies and collect data about your browsing activity to serve
          personalised ads. This is governed by{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue no-underline hover:underline"
          >
            Google's Privacy Policy
          </a>
          . You can opt out of personalised advertising via{" "}
          <a
            href="https://adssettings.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue no-underline hover:underline"
          >
            Google's Ad Settings
          </a>
          .
        </p>

        <h2 className="text-base font-bold mt-8 mb-2 tracking-[0.02em]">
          Data Sharing
        </h2>
        <p className="text-[0.9rem] leading-[1.7] text-secondary mb-2">
          We do not sell, trade, or share your data with any third party, except
          as described above (Google AdSense).
        </p>

        <h2 className="text-base font-bold mt-8 mb-2 tracking-[0.02em]">
          Data Retention
        </h2>
        <p className="text-[0.9rem] leading-[1.7] text-secondary mb-2">
          Vote data (choice, country, and hashed IP) is retained indefinitely
          for the purpose of displaying aggregate results. No personally
          identifiable information is stored.
        </p>

        <h2 className="text-base font-bold mt-8 mb-2 tracking-[0.02em]">
          Contact
        </h2>
        <p className="text-[0.9rem] leading-[1.7] text-secondary mb-2">
          If you have any questions about this policy, you can reach us at{" "}
          <a
            href="mailto:privacy@redor.blue"
            className="text-blue no-underline hover:underline"
          >
            privacy@redor.blue
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default PrivacyPage;
