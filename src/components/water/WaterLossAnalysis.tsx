
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AlertCircle } from "lucide-react";

const WaterLossAnalysis = () => {
  const { data: lossData, isLoading, error } = useQuery({
    queryKey: ["waterLossData"],
    queryFn: async () => {
      // Replace with actual table name if different
      const { data, error } = await supabase
        .from('water_system_zones_loss')
        .select('*');
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
    }
  });

  // Sample monthly loss data
  const sampleMonthlyLossData = [
    { month: "Jan", loss: 580, loss_percentage: 7.7 },
    { month: "Feb", loss: 530, loss_percentage: 7.8 },
    { month: "Mar", loss: 550, loss_percentage: 7.7 },
    { month: "Apr", loss: 560, loss_percentage: 7.6 },
    { month: "May", loss: 600, loss_percentage: 7.7 },
    { month: "Jun", loss: 640, loss_percentage: 7.8 },
    { month: "Jul", loss: 670, loss_percentage: 7.9 },
    { month: "Aug", loss: 650, loss_percentage: 7.8 },
    { month: "Sep", loss: 620, loss_percentage: 7.8 },
    { month: "Oct", loss: 590, loss_percentage: 7.7 },
    { month: "Nov", loss: 560, loss_percentage: 7.8 },
    { month: "Dec", loss: 575, loss_percentage: 7.9 }
  ];

  // Sample loss causes data
  const lossCausesData = [
    { name: "Pipe Leakage", value: 45 },
    { name: "Meter Inaccuracy", value: 25 },
    { name: "Evaporation", value: 15 },
    { name: "Unauthorized Usage", value: 10 },
    { name: "Other", value: 5 }
  ];

  // Colors for the pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Water Loss Trend</CardTitle>
          <CardDescription>Monthly water loss volumes and percentages</CardDescription>
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
              <LineChart data={lossData || sampleMonthlyLossData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Loss Causes Distribution</CardTitle>
            <CardDescription>Breakdown of water loss by cause</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
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

        <Card>
          <CardHeader>
            <CardTitle>Loss Reduction Strategies</CardTitle>
            <CardDescription>Recommended actions to reduce water loss</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-lg">Pipe Network Maintenance</h3>
                <p className="text-muted-foreground">Schedule regular inspections and repair of aging pipes to prevent leaks.</p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg">Meter Calibration</h3>
                <p className="text-muted-foreground">Ensure all meters are properly calibrated to accurately track water flow and detect discrepancies.</p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg">Monitoring Systems</h3>
                <p className="text-muted-foreground">Implement advanced monitoring systems to quickly identify and address abnormal water usage patterns.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WaterLossAnalysis;
