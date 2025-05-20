
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface WaterDistributionChartProps {
  data: any[];
}

const WaterDistributionChart: React.FC<WaterDistributionChartProps> = ({ data }) => {
  // Process the data for the chart if needed
  const processedData = data.length > 0 ? data : [
    { type: "Zone Bulk", total: 34500 },
    { type: "Main BULK", total: 32200 },
    { type: "Individual", total: 28900 },
    { type: "Direct Connection", total: 12300 },
    { type: "Irrigation", total: 9800 }
  ];

  // Custom colors for distribution types
  const getBarColor = (type: string) => {
    switch (type) {
      case "Zone Bulk": return "#0EA5E9";
      case "Main BULK": return "#6366F1";
      case "Individual": return "#10B981";
      case "Direct Connection": return "#F59E0B";
      case "Irrigation": return "#8B5CF6";
      default: return "#94A3B8";
    }
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={processedData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="type" />
        <YAxis />
        <Tooltip formatter={(value) => [`${value.toLocaleString()} m³`, "Consumption"]} />
        <Legend />
        <Bar 
          dataKey="total" 
          name="Consumption (m³)" 
          fill="#0EA5E9"
          radius={[4, 4, 0, 0]}
          fillOpacity={0.9}
          stroke="#0EA5E9"
          strokeWidth={1}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default WaterDistributionChart;
