
import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Filter, ChevronUp, ChevronDown, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import ContactCard from "@/components/ContactCard";
import ContactDetail from "@/components/ContactDetail";
import SearchBar from "@/components/SearchBar";
import StatusSummary from "@/components/StatusSummary";
import AdvancedFilters from "@/components/AdvancedFilters";
import StatusChart from "@/components/StatusChart";
import { contacts, campaigns } from "@/data/mockData";
import { Contact, Campaign, StatusType, StatusCount, FilterOptions } from "@/lib/types";

const Index = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusType | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showStatusChart, setShowStatusChart] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState<FilterOptions>({
    jobChanged: false,
    hasUpdate: false,
  });

  // Filter contacts based on all filters
  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
      const matchesSearch = 
        searchQuery === "" ||
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCampaign = selectedCampaign 
        ? contact.campaignId === selectedCampaign 
        : true;
      
      const matchesStatus = statusFilter 
        ? contact.status === statusFilter
        : true;

      const matchesJobChanged = advancedFilters.jobChanged
        ? contact.jobChanged === true
        : true;

      const matchesHasUpdate = advancedFilters.hasUpdate
        ? contact.hasUpdate === true
        : true;

      return matchesSearch && matchesCampaign && matchesStatus && matchesJobChanged && matchesHasUpdate;
    });
  }, [contacts, searchQuery, selectedCampaign, statusFilter, advancedFilters]);

  // Calculate status counts for the filtered contacts
  const statusCounts: StatusCount[] = useMemo(() => {
    const counts: Record<StatusType, number> = {
      "no-action": 0,
      "connection-sent": 0, 
      "connected": 0,
      "talking": 0,
      "replied": 0
    };
    
    filteredContacts.forEach(contact => {
      counts[contact.status] = (counts[contact.status] || 0) + 1;
    });
    
    return Object.entries(counts).map(([status, count]) => ({
      status: status as StatusType,
      count
    })).filter(item => item.count > 0);
  }, [filteredContacts]);

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
  };

  const handleCloseDetail = () => {
    setSelectedContact(null);
  };

  const updateContactStatus = (contactId: string, newStatus: StatusType) => {
    const updatedContacts = contacts.map(contact => 
      contact.id === contactId ? {...contact, status: newStatus} : contact
    );
    // In a real app, this would call an API to update the contact
    console.log("Updated contact status:", contactId, newStatus);
  };

  const updateConnectionDate = (contactId: string, date: string) => {
    const updatedContacts = contacts.map(contact => 
      contact.id === contactId ? {...contact, connectionDate: date} : contact
    );
    // In a real app, this would call an API to update the contact
    console.log("Updated connection date:", contactId, date);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleAdvancedFilters = () => {
    setShowAdvancedFilters(!showAdvancedFilters);
  };

  const toggleStatusChart = () => {
    setShowStatusChart(!showStatusChart);
  };

  const handleFilterChange = (filters: FilterOptions) => {
    setAdvancedFilters(filters);
    setShowAdvancedFilters(false);
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
            <h1 className="text-2xl font-bold">Lead Engagement Dashboard</h1>
            <div className="flex space-x-2">
              <Link to="/dashboard">
                <Button variant="outline" className="mr-2">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Campaign Analytics
                </Button>
              </Link>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <Plus className="mr-2 h-4 w-4" /> Add Lead
              </Button>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <div className="w-1/2">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                {filteredContacts.length} leads found
              </span>
              <Button 
                variant="outline" 
                className="ml-2 flex items-center"
                onClick={toggleAdvancedFilters}
              >
                <Filter className="mr-2 h-4 w-4" /> 
                Filter
                {showAdvancedFilters ? 
                  <ChevronUp className="ml-2 h-4 w-4" /> : 
                  <ChevronDown className="ml-2 h-4 w-4" />
                }
              </Button>
              <Button 
                variant="outline" 
                onClick={toggleStatusChart}
              >
                {showStatusChart ? "Hide Chart" : "Show Chart"}
              </Button>
            </div>
          </div>

          {showAdvancedFilters && (
            <AdvancedFilters
              filters={advancedFilters}
              onFilterChange={handleFilterChange}
              onClose={() => setShowAdvancedFilters(false)}
            />
          )}

          {showStatusChart && (
            <StatusChart statusCounts={statusCounts} />
          )}

          <StatusSummary
            statusCounts={statusCounts}
            currentStatus={statusFilter}
            onStatusChange={setStatusFilter}
          />

          {selectedContact ? (
            <ContactDetail 
              contact={selectedContact} 
              onClose={handleCloseDetail}
              updateStatus={updateContactStatus}
              updateConnectionDate={updateConnectionDate}
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredContacts.map((contact) => (
                <ContactCard 
                  key={contact.id}
                  contact={contact}
                  onClick={() => handleContactClick(contact)}
                />
              ))}
              
              {filteredContacts.length === 0 && (
                <div className="col-span-3 p-8 text-center">
                  <p className="text-gray-500">No leads found matching your criteria.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
