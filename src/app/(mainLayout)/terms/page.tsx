import React from 'react';

export const metadata = {
  title: 'Terms of Service — KindCircle',
  description: 'Read the terms and conditions for using the KindCircle crowdfunding platform.',
};

export default function TermsPage() {
  return (
    <div className="page-enter flex-grow w-full bg-neutral-950 min-h-screen text-white py-16 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">Terms of Service</h1>
          <p className="text-xs text-white/40">Last updated: July 15, 2026</p>
        </div>

        <div className="space-y-6 text-sm text-white/60 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-base font-bold text-white uppercase tracking-wider text-xs">1. Acceptance of Terms</h2>
            <p>
              By accessing and using KindCircle, you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not use the platform.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white uppercase tracking-wider text-xs">2. Account Registration</h2>
            <p>
              To create campaigns or contribute credits, you must register an account. You are responsible for safeguarding your login credentials and for any activities under your account. Supporter and Creator roles receive default credit balances upon registration.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white uppercase tracking-wider text-xs">3. Crowdfunding & Pledging Rules</h2>
            <p>
              Supporters contribute credits to campaigns. Credits are purchased via Stripe. Pledges remain pending until approved or rejected by the Creator. If a campaign is deleted or rejected, all approved contributions are automatically refunded back to the supporters’ wallets.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white uppercase tracking-wider text-xs">4. Payouts and Fees</h2>
            <p>
              Creators can request USD withdrawals for raised credits once their balance reaches a minimum of 200 credits ($10 equivalent at a rate of 20 credits = 1 USD). Admin approval is required for all withdrawal payouts.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white uppercase tracking-wider text-xs">5. Prohibited Conduct</h2>
            <p>
              Users may not submit fraudulent campaigns or engage in abusive behavior. Fraudulent campaigns reported by the community will be reviewed and suspended/deleted by platform administrators.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
