
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AlertCircle } from "lucide-react";

const WaterLossAnalysis = () => {
  const [periodTab, setPeriodTab] = useState("2024");
  
  const { data: lossData, isLoading, error } = useQuery({
    queryKey: ["waterLossData"],
    queryFn: async () => {
      try {
        // Replace with actual table name if different
        const { data, error } = await supabase
          .from('water_system_zones_loss')
          .select('*');
        
        if (error) {
          throw new Error(error.message);
        }
        
        return data;
      } catch (error) {
        console.error("Error fetching loss data:", error);
        return null;
      }
    }
  });

  // Sample monthly loss data based on the master summary
  const sampleMonthlyLossData2024 = [
    { month: "Jan", loss: 7123, loss_percentage: 21.7 },
    { month: "Feb", loss: 6095, loss_percentage: 21.8 },
    { month: "Mar", loss: 4234, loss_percentage: 17.7 },
    { month: "Apr", loss: 8285, loss_percentage: 26.0 },
    { month: "May", loss: 7045, loss_percentage: 22.9 },
    { month: "Jun", loss: 14088, loss_percentage: 33.6 },
    { month: "Jul", loss: 9205, loss_percentage: 26.2 },
    { month: "Aug", loss: 10175, loss_percentage: 28.7 },
    { month: "Sep", loss: 17597, loss_percentage: 42.6 },
    { month: "Oct", loss: 638, loss_percentage: 2.0 },
    { month: "Nov", loss: 10498, loss_percentage: 29.7 },
    { month: "Dec", loss: 12188, loss_percentage: 33.2 }
  ];
  
  const sampleMonthlyLossData2025 = [
    { month: "Jan", loss: 3454, loss_percentage: 10.6 },
    { month: "Feb", loss: 14486, loss_percentage: 32.9 },
    { month: "Mar", loss: 1447, loss_percentage: 4.1 },
    { month: "Apr", loss: 7134, loss_percentage: 15.5 }
  ];

  // Loss causes data
  const lossCausesData = [
    { name: "Pipe Leakage", value: 45 },
    { name: "Meter Inaccuracy", value: 25 },
    { name: "Evaporation", value: 15 },
    { name: "Unauthorized Usage", value: 10 },
    { name: "Other", value: 5 }
  ];
  
  // Zone loss data from our master summary
  const zoneLossData2024 = [
    { zone: "Zone 01 (FM)", stage01: 20839, stage02: -13716, total: 7123 },
    { zone: "Zone 03A", stage01: 17704, stage02: -11609, total: 6095 },
    { zone: "Zone 03B", stage01: 12773, stage02: -8539, total: 4234 },
    { zone: "Zone 05", stage01: 18489, stage02: -10204, total: 8285 },
    { zone: "Zone 08", stage01: 18952, stage02: -11907, total: 7045 },
    { zone: "Zone VS", stage01: 26254, stage02: -12166, total: 14088 }
  ];
  
  const zoneLossData2025 = [
    { zone: "Zone 01 (FM)", stage01: 17177, stage02: -13723, total: 3454 },
    { zone: "Zone 03A", stage01: 29259, stage02: -14773, total: 14486 },
    { zone: "Zone 03B", stage01: 19588, stage02: -18141, total: 1447 },
    { zone: "Zone 05", stage01: 30941, stage02: -23807, total: 7134 }
  ];

  // Colors for the pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  // Monthly loss data based on selected period
  const monthlyLossData = periodTab === "2024" ? sampleMonthlyLossData2024 : sampleMonthlyLossData2025;
  const zoneLossData = periodTab === "2024" ? zoneLossData2024 : zoneLossData2025;

  return (
    <div className="space-y-6">
      <Tabs defaultValue="2024" onValueChange={setPeriodTab}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Water Loss Analysis</h2>
          <TabsList>
            <TabsTrigger value="2024">2024</TabsTrigger>
            <TabsTrigger value="2025">2025</TabsTrigger>
          </TabsList>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Water Loss Trend</CardTitle>
            <CardDescription>Monthly water loss volumes and percentages for {periodTab}</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <span>Loading loss data...</span>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-full text-status-danger">
                <AlertCircle className="h-5 w-5 mr-2" />
                <span>Error loading loss data</span>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lossData || monthlyLossData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" orientation="left" stroke="#FF8042" />
                  <YAxis yAxisId="right" orientation="right" stroke="#0088FE" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="loss" stroke="#FF8042" name="Volume Loss (m³)" activeDot={{ r: 8 }} />
                  <Line yAxisId="right" type="monotone" dataKey="loss_percentage" stroke="#0088FE" name="Loss Percentage (%)" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Zone Loss Distribution</CardTitle>
              <CardDescription>Water loss by zone for {periodTab}</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={zoneLossData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="zone" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="stage01" name="Stage 01 Loss" fill="#FF8042" />
                  <Bar dataKey="stage02" name="Stage 02 Loss" fill="#0088FE" />
                  <Bar dataKey="total" name="Total Loss" fill="#00C49F" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Loss Causes Distribution</CardTitle>
              <CardDescription>Breakdown of water loss by cause</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={lossCausesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {lossCausesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Loss Reduction Strategies</CardTitle>
            <CardDescription>Recommended actions to reduce water loss</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-lg mb-2">Distribution Loss Analysis</h3>
                <p className="text-muted-foreground mb-4">
                  Based on the data for {periodTab}, we observe that the highest loss occurs in Stage 1 (between Main Bulk and Zone Bulk meters), 
                  while Stage 2 often shows negative loss values, indicating potential meter calibration issues.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Stage 01 Loss (Main Bulk to Zone Bulk): {periodTab === "2024" ? "235,237" : "96,965"} m³</li>
                  <li>Stage 02 Loss (Zone Bulk to Individual): {periodTab === "2024" ? "-127,066" : "-70,444"} m³</li>
                  <li>Total Loss: {periodTab === "2024" ? "108,171" : "26,521"} m³</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">Key Recommendations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Pipe Network Maintenance</h4>
                    <p className="text-muted-foreground">Schedule regular inspections and repair of aging pipes in the main distribution network to reduce Stage 1 losses.</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Meter Calibration</h4>
                    <p className="text-muted-foreground">Calibrate all meters with special attention to Zone Bulk meters that may be over-registering consumption (indicated by negative Stage 2 loss).</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Monitoring Systems</h4>
                    <p className="text-muted-foreground">Implement advanced monitoring systems to quickly identify and address abnormal water usage patterns and potential leaks.</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Priority Zones</h4>
                    <p className="text-muted-foreground">Focus on Zone VS and Zone 05 which show consistently high loss patterns across both years.</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default WaterLossAnalysis;
