import React from "react";
import LegalPageHeader from "@/components/legal/LegalPageHeader";
import LegalLinksBar from "@/components/legal/LegalLinksBar";

const LAST_UPDATED = "February 1, 2025";

export default function TermsPage() {
  return (
    <div className="container max-w-3xl mx-auto px-4 py-12 space-y-10">
      <LegalPageHeader title="Terms & Conditions" lastUpdated={LAST_UPDATED} />

      <div className="space-y-8 text-muted-foreground leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Buildr platform (&ldquo;Service&rdquo;), you agree to be bound by these
            Terms &amp; Conditions. If you do not agree, do not use the Service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">2. Description of Service</h2>
          <p>
            Buildr is a builder rewards and ecosystem discovery platform built on the Stacks Bitcoin L2
            network. The platform tracks onchain activity, GitHub contributions, and distributes $STX
            rewards to qualifying builders each month.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">3. Eligibility</h2>
          <p>
            To earn rewards, you must connect a valid Stacks wallet address and a GitHub account. You must
            be at least 18 years of age. Users from jurisdictions where cryptocurrency rewards are
            prohibited are not eligible to participate in reward programs.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">4. Rewards Program</h2>
          <p>
            Monthly $STX rewards are calculated based on qualifying onchain activity and GitHub
            contributions during the reward period. Buildr reserves the right to modify reward criteria,
            amounts, and program structure at any time. Rewards are not guaranteed and are subject to
            available program funding.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">5. Prohibited Conduct</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Use bots, scripts, or automated tools to artificially inflate contribution metrics</li>
            <li>Create fake GitHub activity or spam smart contract deployments</li>
            <li>Misrepresent your identity or wallet ownership</li>
            <li>Attempt to exploit, hack, or disrupt the Buildr platform</li>
            <li>Use the platform in violation of any applicable law or regulation</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">6. Intellectual Property</h2>
          <p>
            All content, design, and code on the Buildr platform is the property of Buildr or its
            licensors. You may not copy, reproduce, or distribute any part of the Service without
            written permission.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">7. Disclaimers</h2>
          <p>
            The Service is provided &ldquo;as is&rdquo; without warranties of any kind. Buildr does not guarantee
            uninterrupted service, accuracy of leaderboard data, or the continued availability of the
            rewards program. Cryptocurrency values are volatile; Buildr is not responsible for changes
            in the value of $STX.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">8. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Buildr shall not be liable for any indirect,
            incidental, special, or consequential damages arising from your use of the platform or
            participation in the rewards program.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">9. Governing Law</h2>
          <p>
            These Terms are governed by and construed in accordance with applicable law. Any disputes
            shall be resolved through binding arbitration.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">10. Changes to Terms</h2>
          <p>
            We may update these Terms at any time. Continued use of the Service after changes constitutes
            acceptance of the updated Terms. We will notify users of material changes via the platform.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">11. Contact</h2>
          <p>
            Questions about these Terms? Contact us at{" "}
            <span className="text-primary">legal@buildr.app</span>.
          </p>
        </section>
      </div>

      <LegalLinksBar current="/terms" />
    </div>
  );
}
