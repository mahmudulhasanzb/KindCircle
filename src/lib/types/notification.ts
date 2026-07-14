export interface Notification {
  _id: string;
  toEmail: string;
  message: string;
  actionRoute: string;
  time: string; // ISO date string
}
