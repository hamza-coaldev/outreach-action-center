
export type StatusType = "no-action" | "connection-sent" | "connected" | "replied";

export interface Activity {
  title: string;
  description: string;
  date: string;
}

export interface Contact {
  id: string;
  name: string;
  title: string;
  company: string;
  avatarUrl?: string;
  email: string;
  linkedinUrl: string;
  phone?: string;
  status: StatusType;
  hasUpdate: boolean;
  lastActivity?: string;
  recentActivities?: Activity[];
  campaignId: string;
  campaignName: string;
  addedDate: string;
}

export interface Campaign {
  id: string;
  name: string;
  count: number;
}
