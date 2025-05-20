
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AlertCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const WaterDirectConnection = () => {
  const { data: directConnections, isLoading, error } = useQuery({
    queryKey: ["waterDirectConnections"],
    queryFn: async () => {
      // Replace with actual table name if different
      const { data, error } = await supabase
        .from('water_system_direct_connection')
        .select('*');
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
    }
  });

  // Sample data for direct connections
  const sampleMonthlyData = [
    { month: "Jan", consumption: 980 },
    { month: "Feb", consumption: 1020 },
    { month: "Mar", consumption: 1150 },
    { month: "Apr", consumption: 1060 },
    { month: "May", consumption: 1110 },
    { month: "Jun", consumption: 1230 },
    { month: "Jul", consumption: 1350 },
    { month: "Aug", consumption: 1320 },
    { month: "Sep", consumption: 1250 },
    { month: "Oct", consumption: 1180 },
    { month: "Nov", consumption: 1050 },
    { month: "Dec", consumption: 1020 },
  ];

  // Sample connection details
  const sampleConnections = [
    { id: 1, location: "Residential Area A", meter_id: "DC-0023", monthly_avg: 320, status: "Active" },
    { id: 2, location: "Commercial Zone B", meter_id: "DC-0045", monthly_avg: 540, status: "Active" },
    { id: 3, location: "Irrigation System C", meter_id: "DC-0067", monthly_avg: 780, status: "Warning" },
    { id: 4, location: "Public Facility D", meter_id: "DC-0089", monthly_avg: 290, status: "Active" },
    { id: 5, location: "Residential Area E", meter_id: "DC-0112", monthly_avg: 410, status: "Active" },
  ];

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "active": return "text-status-success";
      case "warning": return "text-status-warning";
      case "inactive": return "text-status-danger";
      default: return "text-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Direct Connection Consumption</CardTitle>
          <CardDescription>Monthly water consumption through direct connections</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <span>Loading direct connection data...</span>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full text-status-danger">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span>Error loading direct connection data</span>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={directConnections || sampleMonthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value.toLocaleString()} m³`, "Consumption"]} />
                <Legend />
                <Bar 
                  dataKey="consumption" 
                  name="Direct Connection Usage (m³)" 
                  fill="#F59E0B" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Direct Connection Details</CardTitle>
          <CardDescription>List of all direct water connections</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Location</TableHead>
                <TableHead>Meter ID</TableHead>
                <TableHead className="text-right">Monthly Average (m³)</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(directConnections?.length ? directConnections : sampleConnections).map((connection) => (
                <TableRow key={connection.id}>
                  <TableCell className="font-medium">{connection.location}</TableCell>
                  <TableCell>{connection.meter_id}</TableCell>
                  <TableCell className="text-right">{connection.monthly_avg?.toLocaleString()}</TableCell>
                  <TableCell className={getStatusClass(connection.status)}>{connection.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default WaterDirectConnection;
