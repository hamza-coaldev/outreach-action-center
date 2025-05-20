
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import ContactCard from "@/components/ContactCard";
import ContactDetail from "@/components/ContactDetail";
import SearchBar from "@/components/SearchBar";
import { contacts, campaigns } from "@/data/mockData";
import { Contact, Campaign, StatusType } from "@/lib/types";

const Index = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusType | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);

  // Filter contacts based on search query, campaign and status
  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCampaign = selectedCampaign 
      ? contact.campaignId === selectedCampaign 
      : true;
    
    const matchesStatus = statusFilter 
      ? contact.status === statusFilter
      : true;

    return matchesSearch && matchesCampaign && matchesStatus;
  });

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
            <h1 className="text-2xl font-bold">Lead Engagement Dashboard</h1>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <Plus className="mr-2 h-4 w-4" /> Add Lead
            </Button>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <div className="w-1/2">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                {filteredContacts.length} leads found
              </span>
              <Button variant="outline" className="ml-2">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </div>
          </div>

          {selectedContact ? (
            <ContactDetail 
              contact={selectedContact} 
              onClose={handleCloseDetail}
              updateStatus={updateContactStatus}
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
