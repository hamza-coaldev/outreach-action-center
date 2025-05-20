
export type StatusType = "no-action" | "connection-sent" | "connected" | "replied" | "talking";

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
  jobChanged?: boolean;
  connectionDate?: string;
}

export interface Campaign {
  id: string;
  name: string;
  count: number;
}

export interface StatusCount {
  status: StatusType;
  count: number;
}

export interface FilterOptions {
  status?: StatusType | null;
  jobChanged?: boolean;
  hasUpdate?: boolean;
  campaign?: string | null;
  searchQuery?: string;
}
