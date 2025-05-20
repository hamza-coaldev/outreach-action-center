
import React from "react";
import { Contact } from "@/lib/types";
import StatusBadge from "./StatusBadge";
import { Briefcase, MapPin } from "lucide-react";

interface ContactCardProps {
  contact: Contact;
  onClick: () => void;
}

const ContactCard = ({ contact, onClick }: ContactCardProps) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {contact.avatarUrl ? (
              <img
                src={contact.avatarUrl}
                alt={contact.name}
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-lg font-semibold text-indigo-600">
                  {contact.name.charAt(0)}
                </span>
              </div>
            )}
          </div>
          
          <div className="ml-4 flex-1">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-gray-900">{contact.name}</h3>
              
              {contact.hasUpdate && (
                <span className="bg-green-500 h-2 w-2 rounded-full" title="Has updates"></span>
              )}
            </div>
            
            <div className="mt-1 flex items-center text-sm text-gray-500">
              <Briefcase className="h-3 w-3 mr-1" />
              <span>{contact.title}</span>
            </div>
            
            <div className="mt-1 flex items-center text-sm text-gray-500">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{contact.company}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <StatusBadge status={contact.status} />
          
          <div className="text-xs text-gray-500">
            {contact.lastActivity && `Last activity: ${contact.lastActivity}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
