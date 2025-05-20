
import React from "react";
import { Campaign } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  CheckCircle, 
  Send, 
  Clock, 
  UserPlus, 
  MessageSquare,
  Briefcase
} from "lucide-react";

interface CampaignStatsProps {
  campaigns: Campaign[];
  selectedCampaign: string | null;
}

interface CampaignMetrics {
  id: string;
  name: string;
  totalLeads: number;
  noAction: number;
  connectionSent: number;
  connected: number;
  replied: number;
  talking: number;
  engagementRate: number;
}

const CampaignStats = ({ campaigns, selectedCampaign }: CampaignStatsProps) => {
  // In a real app, this would be fetched from an API or calculated from contacts data
  // Here we're generating mock metrics for each campaign
  const campaignMetrics: CampaignMetrics[] = campaigns.map(campaign => {
    const totalLeads = campaign.count;
    const noAction = Math.floor(totalLeads * (Math.random() * 0.3 + 0.2)); // 20-50%
    const connectionSent = Math.floor(totalLeads * (Math.random() * 0.2 + 0.2)); // 20-40%
    const connected = Math.floor(totalLeads * (Math.random() * 0.2 + 0.1)); // 10-30%
    const replied = Math.floor(totalLeads * (Math.random() * 0.15 + 0.05)); // 5-20%
    const talking = Math.floor(totalLeads * (Math.random() * 0.1 + 0.02)); // 2-12%
    
    // Calculate engagement rate as (replied + talking) / totalLeads
    const engagementRate = ((replied + talking) / totalLeads) * 100;
    
    return {
      id: campaign.id,
      name: campaign.name,
      totalLeads,
      noAction,
      connectionSent,
      connected,
      replied,
      talking,
      engagementRate
    };
  });

  // Filter campaigns if one is selected
  const displayedMetrics = selectedCampaign 
    ? campaignMetrics.filter(c => c.id === selectedCampaign) 
    : campaignMetrics;

  return (
    <Card className="p-6">
      <div className="flex items-center mb-6">
        <Briefcase className="h-5 w-5 mr-2 text-indigo-600" />
        <h2 className="text-xl font-semibold">Campaign Statistics</h2>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Campaign</TableHead>
            <TableHead className="text-center">Total Leads</TableHead>
            <TableHead className="text-center">
              <div className="flex justify-center items-center">
                <Clock className="h-4 w-4 mr-1" />
                No Action
              </div>
            </TableHead>
            <TableHead className="text-center">
              <div className="flex justify-center items-center">
                <Send className="h-4 w-4 mr-1" />
                Connection Sent
              </div>
            </TableHead>
            <TableHead className="text-center">
              <div className="flex justify-center items-center">
                <UserPlus className="h-4 w-4 mr-1" />
                Connected
              </div>
            </TableHead>
            <TableHead className="text-center">
              <div className="flex justify-center items-center">
                <CheckCircle className="h-4 w-4 mr-1" />
                Replied
              </div>
            </TableHead>
            <TableHead className="text-center">
              <div className="flex justify-center items-center">
                <MessageSquare className="h-4 w-4 mr-1" />
                Talking
              </div>
            </TableHead>
            <TableHead className="text-center">Engagement Rate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedMetrics.map((metric) => (
            <TableRow key={metric.id}>
              <TableCell className="font-medium">{metric.name}</TableCell>
              <TableCell className="text-center">{metric.totalLeads}</TableCell>
              <TableCell className="text-center">{metric.noAction}</TableCell>
              <TableCell className="text-center">{metric.connectionSent}</TableCell>
              <TableCell className="text-center">{metric.connected}</TableCell>
              <TableCell className="text-center">{metric.replied}</TableCell>
              <TableCell className="text-center">{metric.talking}</TableCell>
              <TableCell className="text-center">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  {metric.engagementRate.toFixed(1)}%
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default CampaignStats;
