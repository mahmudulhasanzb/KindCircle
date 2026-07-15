import { roleValidator, getUser } from '@/lib/api/session';
import { redirect } from 'next/navigation';
import { confirmPaymentAction } from '@/lib/api/payments/actions';

export const metadata = {
  title: 'Purchase Successful — KindCircle',
  description: 'Your credit purchase was successful.',
};

interface PageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function PurchaseSuccessPage({ searchParams }: PageProps) {
  await roleValidator('supporter');

  const user = await getUser();
  if (!user?.email) {
    redirect('/signin');
  }

  const { session_id } = await searchParams;
  if (session_id) {
    await confirmPaymentAction(session_id);
  }


  return (
    <div className="space-y-8 py-8">
      <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-10 text-center">
        <div className="mx-auto mb-5 h-16 w-16 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center text-2xl font-bold">
          ✓
        </div>
        <h1 className="text-3xl font-bold text-white">Purchase Complete</h1>
        <p className="mt-3 text-sm text-neutral-400">
          Your credits have been added to your KindCircle wallet. Thank you for
          supporting campaigns.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-neutral-800/70 bg-neutral-900/60 p-6">
          <h2 className="text-lg font-semibold text-white">
            What happens next
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-neutral-400">
            <li>Credits were added to your account.</li>
            <li>You can now fund campaigns immediately.</li>
            <li>Review your purchases in Payment History.</li>
          </ul>
        </div>

        <div className="rounded-3xl border border-neutral-800/70 bg-neutral-900/60 p-6">
          <h2 className="text-lg font-semibold text-white">Quick actions</h2>
          <div className="mt-4 space-y-3 text-sm text-neutral-400">
            <p>
              Go to <strong>Payment History</strong> to confirm purchase
              details.
            </p>
            <p>
              Visit <strong>Explore Campaigns</strong> to back a project now.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
