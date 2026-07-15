import React from 'react';
import { roleValidator, getUser } from '@/lib/api/session';
import { createCheckoutSessionAction } from '@/lib/api/payments/actions';
import { redirect } from 'next/navigation';
import toast from 'react-hot-toast';

const packages = [
  { credits: 100, price: 10, badge: 'Starter' },
  { credits: 300, price: 25, badge: 'Popular' },
  { credits: 800, price: 60, badge: 'Value' },
  { credits: 1500, price: 110, badge: 'Best' },
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
    <div className="space-y-8">
      <div className="flex flex-col gap-1.5 pb-5 border-b border-neutral-800/80">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Purchase Credits
        </h1>
        <p className="text-sm text-neutral-400">
          Buy credit packages to back campaigns faster.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {packages.map(pkg => (
          <div
            key={pkg.credits}
            className="rounded-2xl border border-neutral-800/70 bg-neutral-900/60 p-6 shadow-sm"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                {pkg.badge}
              </span>
              <span className="text-sm text-neutral-400">
                {pkg.credits} credits
              </span>
            </div>
            <div className="mb-4">
              <p className="text-3xl font-semibold text-white">${pkg.price}</p>
              <p className="mt-1 text-sm text-neutral-400">One-time purchase</p>
            </div>
            <form action={handlePurchase}>
              <input type="hidden" name="packageCredits" value={pkg.credits} />
              <button
                type="submit"
                className="w-full rounded-lg bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4F46E5]"
              >
                Buy Now
              </button>
            </form>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-neutral-800/70 bg-neutral-900/40 p-5 text-sm text-neutral-400">
        <p>
          Checkout uses a hosted payment flow. After confirmation, credits are
          added to your balance automatically.
        </p>
      </div>
    </div>
  );
}
