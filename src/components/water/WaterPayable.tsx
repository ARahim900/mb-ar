
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AlertCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const WaterPayable = () => {
  const { data: payableData, isLoading, error } = useQuery({
    queryKey: ["waterPayableData"],
    queryFn: async () => {
      // Replace with actual table name if different
      const { data, error } = await supabase
        .from('water_system_mb_to_pay')
        .select('*');
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
    }
  });

  // Sample monthly payable data
  const sampleMonthlyData = [
    { month: "Jan", consumption: 4800, cost: 3840 },
    { month: "Feb", consumption: 4700, cost: 3760 },
    { month: "Mar", consumption: 4850, cost: 3880 },
    { month: "Apr", consumption: 4950, cost: 3960 },
    { month: "May", consumption: 5100, cost: 4080 },
    { month: "Jun", consumption: 5300, cost: 4240 },
    { month: "Jul", consumption: 5450, cost: 4360 },
    { month: "Aug", consumption: 5350, cost: 4280 },
    { month: "Sep", consumption: 5200, cost: 4160 },
    { month: "Oct", consumption: 5050, cost: 4040 },
    { month: "Nov", consumption: 4900, cost: 3920 },
    { month: "Dec", consumption: 4950, cost: 3960 },
  ];

  // Sample breakdown by type
  const sampleTypeBreakdown = [
    { type: "Residential", consumption: 2850, cost: 2280 },
    { type: "Commercial", consumption: 1050, cost: 840 },
    { type: "Irrigation", consumption: 750, cost: 600 },
    { type: "Public Facilities", consumption: 300, cost: 240 },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payable Water Consumption</CardTitle>
          <CardDescription>Monthly water consumption and associated costs</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <span>Loading payable consumption data...</span>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full text-status-danger">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span>Error loading payable consumption data</span>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={payableData || sampleMonthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" orientation="left" stroke="#0EA5E9" />
                <YAxis yAxisId="right" orientation="right" stroke="#10B981" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="consumption"
                  stroke="#0EA5E9"
                  name="Consumption (m³)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="cost"
                  stroke="#10B981"
                  name="Cost (OMR)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payable Consumption by Type</CardTitle>
          <CardDescription>Breakdown of payable water consumption by category</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sampleTypeBreakdown} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="type" />
              <YAxis yAxisId="left" orientation="left" stroke="#0EA5E9" />
              <YAxis yAxisId="right" orientation="right" stroke="#10B981" />
              <Tooltip />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="consumption"
                name="Consumption (m³)"
                fill="#0EA5E9"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                yAxisId="right"
                dataKey="cost"
                name="Cost (OMR)"
                fill="#10B981"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cost Summary</CardTitle>
          <CardDescription>Water billing summary for the current year</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground">Total Annual Cost</div>
              <div className="text-2xl font-bold">47,520 OMR</div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground">Average Monthly Cost</div>
              <div className="text-2xl font-bold">3,960 OMR</div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground">Water Rate</div>
              <div className="text-2xl font-bold">0.8 OMR/m³</div>
            </div>
          </div>
          
          <p className="text-muted-foreground">
            The cost calculation is based on the current water rate of 0.8 OMR per cubic meter. 
            Rates may be subject to change based on seasonal factors and supplier agreements.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default WaterPayable;
