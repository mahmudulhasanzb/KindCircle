import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

export const getTokenServer = async (): Promise<string | null> => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  return token || null;
};
