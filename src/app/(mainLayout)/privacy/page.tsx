import React from 'react';

export const metadata = {
  title: 'Privacy Policy — KindCircle',
  description: 'Learn how KindCircle collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="page-enter flex-grow w-full bg-neutral-950 min-h-screen text-white py-16 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">Privacy Policy</h1>
          <p className="text-xs text-white/40">Last updated: July 15, 2026</p>
        </div>

        <div className="space-y-6 text-sm text-white/60 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-base font-bold text-white uppercase tracking-wider text-xs">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us when creating an account or updating your profile, including your name, email address, profile picture URL, and password.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white uppercase tracking-wider text-xs">2. Use of Information</h2>
            <p>
              We use your information to facilitate campaign creation, contributions, and withdrawals. We also use your email to send relevant platform notifications and verify your authentication status.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white uppercase tracking-wider text-xs">3. Security</h2>
            <p>
              Your security is our priority. We store credentials securely and utilize JWT tokens for authentication. Stripe handles all credit card payments; we do not store any raw financial credentials on our servers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white uppercase tracking-wider text-xs">4. Data Retention</h2>
            <p>
              We retain your information for as long as your account is active or as needed to provide you with services. You can contact administrators to request deletion of your user profile and campaigns.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
