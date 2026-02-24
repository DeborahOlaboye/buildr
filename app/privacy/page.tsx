import React from "react";
import LegalPageHeader from "@/components/legal/LegalPageHeader";
import LegalLinksBar from "@/components/legal/LegalLinksBar";

const LAST_UPDATED = "February 1, 2025";

export default function PrivacyPage() {
  return (
    <div className="container max-w-3xl mx-auto px-4 py-12 space-y-10">
      <LegalPageHeader title="Privacy Policy" lastUpdated={LAST_UPDATED} />

      <div className="prose prose-sm dark:prose-invert max-w-none space-y-8 text-muted-foreground leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">1. Introduction</h2>
          <p>
            Buildr (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates the Buildr platform, a builder rewards
            and ecosystem discovery service built natively on the Stacks Bitcoin L2 network. This Privacy
            Policy explains how we collect, use, and safeguard your information when you use our platform.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">2. Information We Collect</h2>
          <p>We collect the following categories of information:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong className="text-foreground">Wallet addresses:</strong> Stacks (Bitcoin L2) wallet
              addresses you connect to the platform. These are public by nature of the blockchain.
            </li>
            <li>
              <strong className="text-foreground">GitHub usernames:</strong> Your public GitHub username
              used to track open-source contributions.
            </li>
            <li>
              <strong className="text-foreground">Onchain activity:</strong> Smart contract deployments,
              transaction history, and ecosystem interactions derived from public blockchain data.
            </li>
            <li>
              <strong className="text-foreground">Usage data:</strong> Pages visited, features used, and
              interaction patterns within the Buildr platform.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">3. How We Use Your Information</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>To calculate and distribute monthly $STX builder rewards</li>
            <li>To display your profile on the Buildr leaderboard</li>
            <li>To track contributions and rank builders in the ecosystem</li>
            <li>To improve platform features and user experience</li>
            <li>To send important service notifications (if email is provided)</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">4. Data Sharing</h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. Public blockchain
            data (wallet addresses, transactions) is inherently public and displayed as part of the platform&apos;s
            core functionality. We may share aggregated, non-identifying data for research and analytics purposes.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">5. Data Retention</h2>
          <p>
            We retain your account information for as long as your account is active. Onchain data is
            permanently stored on the Stacks blockchain and cannot be deleted. You may request removal
            of your Buildr profile by contacting us.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">6. Your Rights</h2>
          <p>Depending on your jurisdiction, you may have the right to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your Buildr profile</li>
            <li>Object to processing of your data</li>
            <li>Data portability</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">7. Security</h2>
          <p>
            We implement industry-standard security measures to protect your data. However, no method of
            transmission over the internet is 100% secure. We encourage you to use a secure wallet and
            never share your private keys with anyone, including Buildr.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">8. Contact</h2>
          <p>
            If you have questions about this Privacy Policy or wish to exercise your rights, please contact
            us at{" "}
            <span className="text-primary">privacy@buildr.app</span>.
          </p>
        </section>
      </div>

      <LegalLinksBar current="/privacy" />
    </div>
  );
}
