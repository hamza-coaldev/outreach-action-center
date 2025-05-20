
import React from "react";
import { Contact, StatusType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import StatusBadge from "./StatusBadge";
import { 
  X, Mail, Linkedin, Phone, Calendar, 
  Clock, Send, UserPlus, CheckCircle,
  Briefcase, MapPin, ExternalLink
} from "lucide-react";

interface ContactDetailProps {
  contact: Contact;
  onClose: () => void;
  updateStatus: (contactId: string, status: StatusType) => void;
}

const ContactDetail = ({ contact, onClose, updateStatus }: ContactDetailProps) => {
  const handleStatusChange = (newStatus: StatusType) => {
    updateStatus(contact.id, newStatus);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center">
            {contact.avatarUrl ? (
              <img
                src={contact.avatarUrl}
                alt={contact.name}
                className="h-16 w-16 rounded-full object-cover"
              />
            ) : (
              <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-2xl font-semibold text-indigo-600">
                  {contact.name.charAt(0)}
                </span>
              </div>
            )}
            
            <div className="ml-4">
              <div className="flex items-center">
                <h2 className="text-xl font-bold text-gray-900">{contact.name}</h2>
                {contact.hasUpdate && (
                  <span className="ml-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">New</span>
                )}
              </div>
              
              <div className="mt-1 flex items-center text-gray-600">
                <Briefcase className="h-4 w-4 mr-1" />
                <span>{contact.title}</span>
                <span className="mx-2">•</span>
                <MapPin className="h-4 w-4 mr-1" />
                <span>{contact.company}</span>
              </div>
              
              <StatusBadge status={contact.status} className="mt-2" />
            </div>
          </div>
          
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-4 mb-6">
              <h3 className="font-semibold mb-3">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-gray-500 mr-2" />
                  <a href={`mailto:${contact.email}`} className="text-indigo-600 hover:underline">
                    {contact.email}
                  </a>
                </div>
                
                <div className="flex items-center">
                  <Linkedin className="h-4 w-4 text-gray-500 mr-2" />
                  <a 
                    href={contact.linkedinUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline flex items-center"
                  >
                    LinkedIn Profile
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
                
                {contact.phone && (
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-500 mr-2" />
                    <span>{contact.phone}</span>
                  </div>
                )}
              </div>
            </Card>
            
            {contact.recentActivities && contact.recentActivities.length > 0 && (
              <Card className="p-4 mb-6">
                <h3 className="font-semibold mb-3">Recent Activities</h3>
                <div className="space-y-4">
                  {contact.recentActivities.map((activity, index) => (
                    <div key={index} className="border-l-2 border-indigo-200 pl-4 py-1">
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}
            
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Suggested Messages</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium flex items-center">
                    <Mail className="h-4 w-4 mr-1 text-gray-500" /> Email Template
                  </h4>
                  <div className="mt-2 p-3 bg-gray-50 rounded-md text-sm">
                    <p>Hi {contact.name},</p>
                    <br />
                    <p>I noticed your recent {contact.recentActivities?.[0]?.title.toLowerCase() || "update"} and wanted to connect about how we could help with {contact.company}'s growth initiatives.</p>
                    <br />
                    <p>Would you be open to a quick conversation this week?</p>
                    <br />
                    <p>Best regards,</p>
                    <p>Your Name</p>
                  </div>
                  <div className="mt-2 flex justify-end">
                    <Button variant="outline" size="sm" className="text-xs">
                      Copy to Clipboard
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium flex items-center">
                    <Linkedin className="h-4 w-4 mr-1 text-gray-500" /> LinkedIn Connection Request
                  </h4>
                  <div className="mt-2 p-3 bg-gray-50 rounded-md text-sm">
                    <p>Hi {contact.name}, I'm impressed with your work at {contact.company} and would love to connect to discuss industry trends and potential collaboration opportunities.</p>
                  </div>
                  <div className="mt-2 flex justify-end">
                    <Button variant="outline" size="sm" className="text-xs">
                      Copy to Clipboard
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          <div>
            <Card className="p-4 mb-6">
              <h3 className="font-semibold mb-3">Engagement Status</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => handleStatusChange("no-action")}
                  className={`w-full flex items-center p-2 rounded-md ${
                    contact.status === "no-action" ? "bg-gray-100" : "hover:bg-gray-50"
                  }`}
                >
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <span>No Action</span>
                </button>
                
                <button 
                  onClick={() => handleStatusChange("connection-sent")}
                  className={`w-full flex items-center p-2 rounded-md ${
                    contact.status === "connection-sent" ? "bg-gray-100" : "hover:bg-gray-50"
                  }`}
                >
                  <Send className="h-4 w-4 mr-2 text-gray-500" />
                  <span>Connection Sent</span>
                </button>
                
                <button 
                  onClick={() => handleStatusChange("connected")}
                  className={`w-full flex items-center p-2 rounded-md ${
                    contact.status === "connected" ? "bg-gray-100" : "hover:bg-gray-50"
                  }`}
                >
                  <UserPlus className="h-4 w-4 mr-2 text-gray-500" />
                  <span>Connected</span>
                </button>
                
                <button 
                  onClick={() => handleStatusChange("replied")}
                  className={`w-full flex items-center p-2 rounded-md ${
                    contact.status === "replied" ? "bg-gray-100" : "hover:bg-gray-50"
                  }`}
                >
                  <CheckCircle className="h-4 w-4 mr-2 text-gray-500" />
                  <span>Replied</span>
                </button>
              </div>
            </Card>
            
            <Card className="p-4 mb-6">
              <h3 className="font-semibold mb-3">Schedule Follow-up</h3>
              <div className="text-center p-4">
                <Calendar className="h-8 w-8 mx-auto text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Set a reminder to follow up with this contact
                </p>
                <Button className="w-full mt-3" variant="outline">
                  Schedule Reminder
                </Button>
              </div>
            </Card>
            
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Campaign</h3>
              <p className="text-sm text-gray-600">{contact.campaignName}</p>
              <div className="mt-3 text-xs text-gray-500">
                Added on {contact.addedDate}
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 flex justify-end rounded-b-lg border-t border-gray-200">
        <Button variant="outline" className="mr-2" onClick={onClose}>
          Cancel
        </Button>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          Assign Task
        </Button>
      </div>
    </div>
  );
};

export default ContactDetail;
