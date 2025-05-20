
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AlertCircle } from "lucide-react";

const WaterZoneAnalysis = () => {
  const { data: zoneData, isLoading, error } = useQuery({
    queryKey: ["waterZoneData"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('water_consumption_by_zone')
        .select('*');
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
    }
  });

  // Sample data in case the fetch fails
  const sampleZoneData = [
    { zone: "Zone 01", total: 12450 },
    { zone: "Zone 02", total: 9870 },
    { zone: "Zone 03", total: 8560 },
    { zone: "Zone 04", total: 7890 },
    { zone: "Zone 05", total: 6750 },
    { zone: "Zone FM", total: 5230 },
    { zone: "Zone VS", total: 4320 }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Zone Water Consumption</CardTitle>
          <CardDescription>Water consumption breakdown by zone</CardDescription>
        </CardHeader>
        <CardContent className="h-96">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <span>Loading zone data...</span>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full text-status-danger">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span>Error loading zone data</span>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={zoneData || sampleZoneData}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" />
                <YAxis dataKey="zone" type="category" width={80} />
                <Tooltip formatter={(value) => [`${value.toLocaleString()} m³`, "Consumption"]} />
                <Legend />
                <Bar 
                  dataKey="total" 
                  name="Consumption (m³)" 
                  fill="#0EA5E9" 
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Zone Analysis Details</CardTitle>
          <CardDescription>Detailed performance metrics for each zone</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This section will display detailed analysis of water consumption by zone, including loss percentages,
            efficiency metrics, and individual meter readings.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default WaterZoneAnalysis;
