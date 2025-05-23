
import { Contact, Campaign } from "@/lib/types";

export const campaigns: Campaign[] = [
  {
    id: "c1",
    name: "Q2 Tech Outreach",
    count: 42,
  },
  {
    id: "c2",
    name: "Enterprise Prospects",
    count: 28,
  },
  {
    id: "c3",
    name: "Startup Founders",
    count: 15,
  },
  {
    id: "c4",
    name: "Event Follow-ups",
    count: 31,
  },
];

export const contacts: Contact[] = [
  {
    id: "1",
    name: "John Smith",
    title: "VP of Engineering",
    company: "TechCorp",
    avatarUrl: "/lovable-uploads/d128577a-4e8a-498a-b7b3-a834be0108e0.png",
    email: "john.smith@example.com",
    linkedinUrl: "https://linkedin.com/in/johnsmith",
    phone: "(555) 123-4567",
    status: "connected",
    hasUpdate: true,
    lastActivity: "2 days ago",
    recentActivities: [
      {
        title: "New LinkedIn Post",
        description: "Shared an article about AI innovation in the software development lifecycle",
        date: "2 days ago",
      },
      {
        title: "Job Change",
        description: "Promoted from Senior Engineering Manager to VP of Engineering",
        date: "2 weeks ago",
      },
    ],
    campaignId: "c1",
    campaignName: "Q2 Tech Outreach",
    addedDate: "Apr 15, 2025",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    title: "CTO",
    company: "Innovate Solutions",
    email: "sarah.johnson@example.com",
    linkedinUrl: "https://linkedin.com/in/sarahjohnson",
    status: "no-action",
    hasUpdate: false,
    recentActivities: [
      {
        title: "Company Announcement",
        description: "Announced a new AI-driven product launch coming next quarter",
        date: "1 week ago",
      },
    ],
    campaignId: "c2",
    campaignName: "Enterprise Prospects",
    addedDate: "Apr 10, 2025",
  },
  {
    id: "3",
    name: "Michael Chen",
    title: "Product Manager",
    company: "GrowthMetrics",
    email: "michael.chen@example.com",
    linkedinUrl: "https://linkedin.com/in/michaelchen",
    status: "connection-sent",
    hasUpdate: true,
    lastActivity: "1 day ago",
    recentActivities: [
      {
        title: "LinkedIn Comment",
        description: "Commented on an industry report about product-led growth strategies",
        date: "1 day ago",
      },
    ],
    campaignId: "c3",
    campaignName: "Startup Founders",
    addedDate: "Apr 18, 2025",
  },
  {
    id: "4",
    name: "Emily Rodriguez",
    title: "Director of Marketing",
    company: "BrandBuilder",
    email: "emily.rodriguez@example.com",
    linkedinUrl: "https://linkedin.com/in/emilyrodriguez",
    phone: "(555) 987-6543",
    status: "replied",
    hasUpdate: false,
    lastActivity: "3 days ago",
    campaignId: "c4",
    campaignName: "Event Follow-ups",
    addedDate: "Apr 12, 2025",
  },
  {
    id: "5",
    name: "David Lee",
    title: "CEO",
    company: "FlexTech",
    email: "david.lee@example.com",
    linkedinUrl: "https://linkedin.com/in/davidlee",
    status: "connected",
    hasUpdate: false,
    campaignId: "c2",
    campaignName: "Enterprise Prospects",
    addedDate: "Apr 5, 2025",
  },
  {
    id: "6",
    name: "Lisa Wang",
    title: "Head of Growth",
    company: "ScaleFast",
    email: "lisa.wang@example.com",
    linkedinUrl: "https://linkedin.com/in/lisawang",
    status: "no-action",
    hasUpdate: true,
    lastActivity: "Just now",
    recentActivities: [
      {
        title: "New Job",
        description: "Started new position as Head of Growth at ScaleFast",
        date: "Today",
      },
    ],
    campaignId: "c1",
    campaignName: "Q2 Tech Outreach",
    addedDate: "Apr 20, 2025",
  },
];
