
import React from "react";
import { StatusType, StatusCount } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Clock, Send, UserPlus, MessageSquare, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusSummaryProps {
  statusCounts: StatusCount[];
  currentStatus: StatusType | null;
  onStatusChange: (status: StatusType | null) => void;
}

const StatusSummary = ({ statusCounts, currentStatus, onStatusChange }: StatusSummaryProps) => {
  const getStatusConfig = (status: StatusType) => {
    switch (status) {
      case "no-action":
        return {
          label: "No Action",
          bgColor: "bg-gray-100",
          textColor: "text-gray-600",
          hoverBg: "hover:bg-gray-200",
          icon: <Clock className="h-4 w-4 mr-1" />,
        };
      case "connection-sent":
        return {
          label: "Connection Sent",
          bgColor: "bg-blue-100",
          textColor: "text-blue-600",
          hoverBg: "hover:bg-blue-200",
          icon: <Send className="h-4 w-4 mr-1" />,
        };
      case "connected":
        return {
          label: "Connected",
          bgColor: "bg-green-100",
          textColor: "text-green-600",
          hoverBg: "hover:bg-green-200",
          icon: <UserPlus className="h-4 w-4 mr-1" />,
        };
      case "talking":
        return {
          label: "Talking",
          bgColor: "bg-yellow-100",
          textColor: "text-yellow-600",
          hoverBg: "hover:bg-yellow-200",
          icon: <MessageSquare className="h-4 w-4 mr-1" />,
        };
      case "replied":
        return {
          label: "Replied",
          bgColor: "bg-purple-100",
          textColor: "text-purple-600",
          hoverBg: "hover:bg-purple-200",
          icon: <CheckCircle className="h-4 w-4 mr-1" />,
        };
      default:
        return {
          label: "Unknown",
          bgColor: "bg-gray-100",
          textColor: "text-gray-600",
          hoverBg: "hover:bg-gray-200",
          icon: null,
        };
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <Badge 
        variant="outline" 
        className={cn(
          "cursor-pointer py-1 px-3",
          currentStatus === null ? "bg-indigo-100 text-indigo-600" : "hover:bg-gray-100"
        )}
        onClick={() => onStatusChange(null)}
      >
        All ({statusCounts.reduce((acc, item) => acc + item.count, 0)})
      </Badge>
      
      {statusCounts.map((item) => {
        const config = getStatusConfig(item.status);
        return (
          <Badge 
            key={item.status} 
            variant="outline" 
            className={cn(
              "cursor-pointer flex items-center py-1 px-3",
              currentStatus === item.status ? config.bgColor : "hover:bg-gray-100",
              currentStatus === item.status ? config.textColor : "text-gray-600"
            )}
            onClick={() => onStatusChange(item.status)}
          >
            {config.icon}
            {config.label} ({item.count})
          </Badge>
        );
      })}
    </div>
  );
};

export default StatusSummary;
