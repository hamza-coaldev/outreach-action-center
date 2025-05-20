
import React from "react";
import { Campaign, StatusType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Briefcase, CheckCircle, Clock, Send, X, UserPlus } from "lucide-react";

interface SidebarProps {
  campaigns: Campaign[];
  selectedCampaign: string | null;
  setSelectedCampaign: (id: string | null) => void;
  statusFilter: StatusType | null;
  setStatusFilter: (status: StatusType | null) => void;
}

const Sidebar = ({
  campaigns,
  selectedCampaign,
  setSelectedCampaign,
  statusFilter,
  setStatusFilter,
}: SidebarProps) => {
  const statuses: { name: string; value: StatusType; icon: React.ReactNode }[] = [
    { name: "No Action", value: "no-action", icon: <Clock className="h-4 w-4" /> },
    { name: "Connection Sent", value: "connection-sent", icon: <Send className="h-4 w-4" /> },
    { name: "Connected", value: "connected", icon: <UserPlus className="h-4 w-4" /> },
    { name: "Replied", value: "replied", icon: <CheckCircle className="h-4 w-4" /> },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 fixed h-full overflow-y-auto shadow-sm">
      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Briefcase className="h-5 w-5 mr-2 text-indigo-600" />
            Campaigns
          </h2>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setSelectedCampaign(null)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                  selectedCampaign === null
                    ? "bg-indigo-50 text-indigo-700"
                    : "hover:bg-gray-100"
                }`}
              >
                All Campaigns
              </button>
            </li>
            {campaigns.map((campaign) => (
              <li key={campaign.id}>
                <button
                  onClick={() => setSelectedCampaign(campaign.id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm flex justify-between items-center ${
                    selectedCampaign === campaign.id
                      ? "bg-indigo-50 text-indigo-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <span>{campaign.name}</span>
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                    {campaign.count}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Status</h2>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setStatusFilter(null)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                  statusFilter === null
                    ? "bg-indigo-50 text-indigo-700"
                    : "hover:bg-gray-100"
                }`}
              >
                All Statuses
              </button>
            </li>
            {statuses.map((status) => (
              <li key={status.value}>
                <button
                  onClick={() => setStatusFilter(status.value)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center ${
                    statusFilter === status.value
                      ? "bg-indigo-50 text-indigo-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <span className="mr-2">{status.icon}</span>
                  <span>{status.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Recent Updates</h2>
          <div className="bg-green-50 border border-green-100 rounded-lg p-3 text-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-green-800">New Activities</span>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-green-700">3 leads have new LinkedIn posts</p>
            <p className="text-xs text-green-600 mt-1">Updated 5 min ago</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
