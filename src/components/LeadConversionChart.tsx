
import React from "react";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const LeadConversionChart = () => {
  // Mock data for the chart
  // In a real app, this data would come from an API
  const data = [
    { name: "Week 1", "Response Rate": 5, "Conversation Rate": 2 },
    { name: "Week 2", "Response Rate": 7, "Conversation Rate": 3 },
    { name: "Week 3", "Response Rate": 8, "Conversation Rate": 4 },
    { name: "Week 4", "Response Rate": 12, "Conversation Rate": 6 },
    { name: "Week 5", "Response Rate": 16, "Conversation Rate": 9 },
    { name: "Week 6", "Response Rate": 18, "Conversation Rate": 11 },
  ];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Response Rate"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="Conversation Rate" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LeadConversionChart;
