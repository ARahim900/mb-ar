
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const WaterBulkMeters = () => {
  const { data: bulkMetersData, isLoading, error } = useQuery({
    queryKey: ["waterBulkMeters"],
    queryFn: async () => {
      // Assuming we have this table, replace with actual table name if different
      const { data, error } = await supabase
        .from('water_system_zones_bulk_meters')
        .select('*');
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data || [];
    }
  });

  // Sample data structure in case the fetch fails
  const sampleData = [
    { id: 1, meter_id: "BM-1001", zone: "Zone 01", reading: 12350, previous_reading: 11890, flow_rate: 15.2, status: "Active" },
    { id: 2, meter_id: "BM-1002", zone: "Zone 02", reading: 9870, previous_reading: 9560, flow_rate: 10.3, status: "Active" },
    { id: 3, meter_id: "BM-1003", zone: "Zone 03", reading: 8560, previous_reading: 8210, flow_rate: 11.6, status: "Active" },
    { id: 4, meter_id: "BM-1004", zone: "Zone 04", reading: 7890, previous_reading: 7630, flow_rate: 8.7, status: "Warning" },
    { id: 5, meter_id: "BM-1005", zone: "Zone 05", reading: 6750, previous_reading: 6520, flow_rate: 7.6, status: "Active" },
  ];

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "active": return "text-status-success";
      case "warning": return "text-status-warning";
      case "error": return "text-status-danger";
      default: return "text-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Bulk Meters Overview</CardTitle>
          <CardDescription>Status and readings of all bulk water meters</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <span>Loading bulk meter data...</span>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-8 text-status-danger">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span>Error loading bulk meter data</span>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Meter ID</TableHead>
                  <TableHead>Zone</TableHead>
                  <TableHead className="text-right">Current Reading</TableHead>
                  <TableHead className="text-right">Previous Reading</TableHead>
                  <TableHead className="text-right">Flow Rate (m³/h)</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(bulkMetersData?.length ? bulkMetersData : sampleData).map((meter) => (
                  <TableRow key={meter.id}>
                    <TableCell className="font-medium">{meter.meter_id}</TableCell>
                    <TableCell>{meter.zone}</TableCell>
                    <TableCell className="text-right">{meter.reading?.toLocaleString()} m³</TableCell>
                    <TableCell className="text-right">{meter.previous_reading?.toLocaleString()} m³</TableCell>
                    <TableCell className="text-right">{meter.flow_rate}</TableCell>
                    <TableCell className={getStatusClass(meter.status)}>{meter.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bulk Meter Performance</CardTitle>
          <CardDescription>Analysis of flow rates and consumption patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This section will display detailed performance metrics of bulk meters, including historical flow rates, 
            consumption patterns, and anomalies when connected to the full database.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default WaterBulkMeters;
