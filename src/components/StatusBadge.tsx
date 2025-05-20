
import React from "react";
import { StatusType } from "@/lib/types";
import { Clock, Send, UserPlus, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case "no-action":
        return {
          label: "No Action",
          bgColor: "bg-gray-100",
          textColor: "text-gray-600",
          icon: <Clock className="h-3 w-3 mr-1" />,
        };
      case "connection-sent":
        return {
          label: "Connection Sent",
          bgColor: "bg-blue-100",
          textColor: "text-blue-600",
          icon: <Send className="h-3 w-3 mr-1" />,
        };
      case "connected":
        return {
          label: "Connected",
          bgColor: "bg-green-100",
          textColor: "text-green-600",
          icon: <UserPlus className="h-3 w-3 mr-1" />,
        };
      case "replied":
        return {
          label: "Replied",
          bgColor: "bg-purple-100",
          textColor: "text-purple-600",
          icon: <CheckCircle className="h-3 w-3 mr-1" />,
        };
      default:
        return {
          label: "Unknown",
          bgColor: "bg-gray-100",
          textColor: "text-gray-600",
          icon: null,
        };
    }
  };

  const config = getStatusConfig();

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
        config.bgColor,
        config.textColor,
        className
      )}
    >
      {config.icon}
      {config.label}
    </span>
  );
};

export default StatusBadge;
