import React from 'react';
import { roleValidator, getUser } from '@/lib/api/session';
import { createCheckoutSessionAction } from '@/lib/api/payments/actions';
import { redirect } from 'next/navigation';
import { Coins, Sparkles, CreditCard } from 'lucide-react';

const packages = [
  { credits: 100, price: 10, badge: 'Starter', desc: 'Perfect for small contributions.' },
  { credits: 300, price: 25, badge: 'Popular', desc: 'Back multiple creator ideas.', popular: true },
  { credits: 800, price: 60, badge: 'Value', desc: 'Significant impact package.' },
  { credits: 1500, price: 110, badge: 'Best Value', desc: 'Maximum community support.' },
];

export const metadata = {
  title: 'Purchase Credits — KindCircle',
  description: 'Buy credit packages to fund campaigns.',
};

export default async function SupporterPurchasePage() {
  await roleValidator('supporter');

  const user = await getUser();
  if (!user?.email) {
    redirect('/signin');
  }

  async function handlePurchase(formData: FormData) {
    'use server';
    const packageCredits = Number(formData.get('packageCredits'));
    const result = await createCheckoutSessionAction(packageCredits);

    if (result?.url) {
      redirect(result.url);
    }

    throw new Error(result?.message || 'Unable to start checkout');
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-4">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl p-6 md:p-8"
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(circle at 80% 50%, rgba(14,165,233,0.15) 0%, transparent 60%)' }}
        />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-3 text-secondary"
              style={{ background: 'rgba(14,165,233,0.12)', border: '1px solid rgba(14,165,233,0.2)' }}>
              <Coins size={12} />
              Wallet Balance
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Purchase Credits
            </h1>
            <p className="text-sm text-white/50 mt-1">
              Top up your balance using Stripe payment to support local campaigns.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white/5 border border-white/8 px-5 py-3 rounded-2xl md:self-center">
            <Coins className="text-secondary" size={24} />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">Current Credits</p>
              <p className="text-2xl font-black text-white tabular-nums">{user.credits ?? 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Packages */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {packages.map(pkg => (
          <div
            key={pkg.credits}
            className="group relative flex flex-col justify-between rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: pkg.popular ? '1px solid rgba(14,165,233,0.3)' : '1px solid rgba(255,255,255,0.08)',
              boxShadow: pkg.popular ? '0 8px 32px rgba(14,165,233,0.1)' : '0 4px 24px rgba(0,0,0,0.2)',
            }}
          >
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-[#0EA5E9] bg-[#0EA5E9]/10 border border-[#0EA5E9]/30 flex items-center gap-1">
                <Sparkles size={10} /> Popular
              </div>
            )}

            <div>
              <div className="mb-4 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">
                  {pkg.badge}
                </span>
                <span className="text-xs font-bold text-white/60 flex items-center gap-1">
                  <Coins size={12} className="text-secondary" />
                  {pkg.credits} credits
                </span>
              </div>
              <div className="mb-4">
                <p className="text-4xl font-black text-white">${pkg.price}</p>
                <p className="mt-1.5 text-xs text-white/40">{pkg.desc}</p>
              </div>
            </div>

            <form action={handlePurchase} className="mt-6">
              <input type="hidden" name="packageCredits" value={pkg.credits} />
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-black uppercase tracking-wider text-white transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                style={{
                  background: pkg.popular
                    ? 'linear-gradient(135deg, #0EA5E9, #6366F1)'
                    : 'rgba(255,255,255,0.06)',
                  border: pkg.popular
                    ? 'none'
                    : '1px solid rgba(255,255,255,0.1)',
                  boxShadow: pkg.popular
                    ? '0 6px 20px rgba(14,165,233,0.3)'
                    : 'none',
                }}
              >
                <CreditCard size={13} />
                Buy Now
              </button>
            </form>
          </div>
        ))}
      </div>

      {/* Stripe payment info */}
      <div className="rounded-2xl border border-white/8 bg-white/3 p-5 flex items-start gap-3.5 max-w-2xl text-xs text-white/50 leading-relaxed">
        <div className="p-2 rounded-lg bg-white/5 text-white/70">
          <CreditCard size={16} />
        </div>
        <div>
          <p className="font-bold text-white/80 mb-1">Stripe Payment Required</p>
          <p>
            Stripe payment is required to purchase credits. Clicking &quot;Buy Now&quot; will securely redirect you to the Stripe hosted payment gateway. After completion, credits are automatically added to your wallet.
          </p>
        </div>
      </div>
    </div>
  );
}
