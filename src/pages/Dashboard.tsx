
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import CampaignStats from "@/components/CampaignStats";
import StatusChart from "@/components/StatusChart";
import { campaigns } from "@/data/mockData";
import { Campaign, StatusCount, StatusType } from "@/lib/types";
import { useState } from "react";

const Dashboard = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusType | null>(null);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar toggleSidebar={toggleSidebar} />
      
      <div className="flex">
        {showSidebar && (
          <Sidebar 
            campaigns={campaigns}
            selectedCampaign={selectedCampaign}
            setSelectedCampaign={setSelectedCampaign}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
        )}
        
        <div className={`flex-1 p-6 ${showSidebar ? 'ml-64' : ''} transition-all duration-300`}>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Link to="/">
                <Button variant="ghost" className="mr-2">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Contacts
                </Button>
              </Link>
              <h1 className="text-2xl font-bold">Campaign Analytics Dashboard</h1>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="col-span-1 lg:col-span-3">
              <CampaignStats 
                campaigns={campaigns} 
                selectedCampaign={selectedCampaign} 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Overall Status Distribution</h2>
              <StatusChart 
                statusCounts={[
                  { status: "no-action", count: 42 },
                  { status: "connection-sent", count: 28 },
                  { status: "connected", count: 15 },
                  { status: "replied", count: 8 },
                  { status: "talking", count: 5 }
                ]} 
              />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Response Rate Trends</h2>
              <LeadConversionChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
