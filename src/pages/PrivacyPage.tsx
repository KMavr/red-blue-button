function PrivacyPage() {
  return (
    <div className="privacy">
      <div className="privacy__content">
        <h1>Privacy Policy</h1>
        <p className="privacy__updated">Last updated: May 5, 2026</p>

        <p>This privacy policy describes how redor.blue ("we", "us") handles information when you use our website.</p>

        <h2>Information We Collect</h2>
        <p>When you cast a vote, we record:</p>
        <ul>
          <li>Your vote choice (red or blue)</li>
          <li>Your country, derived from your IP address</li>
          <li>A one-way SHA-256 hash of your IP address, used solely to prevent duplicate votes. Your raw IP address is never stored.</li>
        </ul>

        <h2>Cookies</h2>
        <p>We store two cookies in your browser:</p>
        <ul>
          <li><strong>voted</strong> — records that you have already voted, so we can redirect you to the results page</li>
          <li><strong>last_choice</strong> — remembers your choice (red or blue) to show your personal outcome</li>
        </ul>
        <p>These cookies contain no personal information and are not used for tracking or advertising.</p>

        <h2>Google AdSense</h2>
        <p>We use Google AdSense to display advertisements. Google may use cookies and collect data about your browsing activity to serve personalised ads. This is governed by <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google's Privacy Policy</a>. You can opt out of personalised advertising via <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google's Ad Settings</a>.</p>

        <h2>Data Sharing</h2>
        <p>We do not sell, trade, or share your data with any third party, except as described above (Google AdSense).</p>

        <h2>Data Retention</h2>
        <p>Vote data (choice, country, and hashed IP) is retained indefinitely for the purpose of displaying aggregate results. No personally identifiable information is stored.</p>

        <h2>Contact</h2>
        <p>If you have any questions about this policy, you can reach us at <a href="mailto:privacy@redor.blue">privacy@redor.blue</a>.</p>
      </div>
    </div>
  );
}

export default PrivacyPage;
