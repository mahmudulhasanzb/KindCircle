import { serverFetch } from '@/lib/api/server';
import { Notification } from '@/lib/types/notification';

export async function getUserNotifications(email: string): Promise<Notification[]> {
  try {
    return await serverFetch(`/api/notifications/${email}`);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
}
