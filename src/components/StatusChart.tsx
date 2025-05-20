
import React from "react";
import { StatusCount, StatusType } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface StatusChartProps {
  statusCounts: StatusCount[];
}

const StatusChart = ({ statusCounts }: StatusChartProps) => {
  const getStatusColor = (status: StatusType) => {
    switch (status) {
      case "no-action":
        return "#9CA3AF"; // gray
      case "connection-sent":
        return "#93C5FD"; // blue
      case "connected":
        return "#86EFAC"; // green
      case "talking":
        return "#FDE68A"; // yellow
      case "replied":
        return "#C4B5FD"; // purple
      default:
        return "#E5E7EB"; // light gray
    }
  };

  const getStatusName = (status: StatusType) => {
    switch (status) {
      case "no-action":
        return "No Action";
      case "connection-sent":
        return "Connection Sent";
      case "connected":
        return "Connected";
      case "talking":
        return "Talking";
      case "replied":
        return "Replied";
      default:
        return "Unknown";
    }
  };

  const data = statusCounts.map((item) => ({
    name: getStatusName(item.status),
    value: item.count,
    color: getStatusColor(item.status),
  }));

  return (
    <Card className="p-4 mb-6">
      <h3 className="font-semibold mb-3">Status Distribution</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number, name: string) => [
                `${value} contacts`,
                name
              ]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default StatusChart;
