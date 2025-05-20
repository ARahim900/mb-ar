
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const WaterZoneAnalysis = () => {
  const [selectedZone, setSelectedZone] = useState("Zone_01_(FM)");
  
  const { data: zoneData, isLoading, error } = useQuery({
    queryKey: ["waterZoneData"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('water_consumption_by_zone')
          .select('*');
        
        if (error) {
          throw new Error(error.message);
        }
        
        return data;
      } catch (error) {
        console.error("Error fetching zone data:", error);
        return null;
      }
    }
  });

  // Sample data in case the fetch fails
  const sampleZoneData = [
    { 
      zone: "Zone 01 (FM)", 
      total: 36076,
      bulk_meter: "ZONE FM (BULK ZONE FM)",
      submeters: 17,
      indiv_consumption: 64390,
      efficiency: 82.5,
      loss: -28348
    },
    { 
      zone: "Zone 03A", 
      total: 27731,
      bulk_meter: "ZONE 3A (Bulk Zone 3A)",
      submeters: 102,
      indiv_consumption: 47992,
      efficiency: 73.1,
      loss: -20261
    },
    { 
      zone: "Zone 03B", 
      total: 26413,
      bulk_meter: "ZONE 3B (Bulk Zone 3B)",
      submeters: 147,
      indiv_consumption: 45154,
      efficiency: 63.1,
      loss: -18741
    },
    { 
      zone: "Zone 05", 
      total: 32934,
      bulk_meter: "ZONE 5 (Bulk Zone 5)",
      submeters: 35,
      indiv_consumption: 56060,
      efficiency: 70.1,
      loss: -23126
    },
    { 
      zone: "Zone 08", 
      total: 24093,
      bulk_meter: "ZONE 8 (Bulk Zone 8)",
      submeters: 22,
      indiv_consumption: 41544,
      efficiency: 72.8,
      loss: -17451
    },
    { 
      zone: "Zone VS", 
      total: 22203,
      bulk_meter: "Village Square (Zone Bulk)",
      submeters: 8,
      indiv_consumption: 42376,
      efficiency: 52.4,
      loss: -20173
    }
  ];

  // Sample submeter data for each zone
  const submeterData = {
    "Zone_01_(FM)": [
      { meter: "Building FM", type: "MB_Common", consumption: 6213, avg_monthly: 518 },
      { meter: "Building Taxi", type: "Retail", consumption: 13135, avg_monthly: 1095 },
      { meter: "Building B1", type: "Building", consumption: 2856, avg_monthly: 238 },
      { meter: "Building B2", type: "Building", consumption: 3617, avg_monthly: 301 },
      { meter: "Building B3", type: "Building", consumption: 3478, avg_monthly: 290 }
    ],
    "Zone_03_(A)": [
      { meter: "Z3A-1", type: "Residential (Villa)", consumption: 995, avg_monthly: 83 },
      { meter: "Z3A-2", type: "Residential (Villa)", consumption: 895, avg_monthly: 75 },
      { meter: "Z3A-3", type: "Residential (Villa)", consumption: 1030, avg_monthly: 86 },
      { meter: "Z3A-Building 1", type: "D_Building_Common", consumption: 673, avg_monthly: 56 },
      { meter: "Z3A-Building 2", type: "D_Building_Common", consumption: 746, avg_monthly: 62 }
    ],
    "Zone_03_(B)": [
      { meter: "Z3B-1", type: "Residential (Villa)", consumption: 736, avg_monthly: 61 },
      { meter: "Z3B-2", type: "Residential (Villa)", consumption: 836, avg_monthly: 70 },
      { meter: "Z3B-3", type: "Residential (Villa)", consumption: 780, avg_monthly: 65 },
      { meter: "Z3B-Building 1", type: "D_Building_Common", consumption: 673, avg_monthly: 56 },
      { meter: "Z3B-Building 2", type: "D_Building_Common", consumption: 649, avg_monthly: 54 }
    ],
    "Zone_05": [
      { meter: "Z5-1", type: "Residential (Villa)", consumption: 1898, avg_monthly: 158 },
      { meter: "Z5-2", type: "Residential (Villa)", consumption: 2141, avg_monthly: 178 },
      { meter: "Z5-3", type: "Residential (Villa)", consumption: 2042, avg_monthly: 170 },
      { meter: "Z5-4", type: "Residential (Villa)", consumption: 1936, avg_monthly: 161 },
      { meter: "Z5-IRR", type: "IRR_Servies", consumption: 1693, avg_monthly: 141 }
    ],
    "Zone_08": [
      { meter: "Z8-1", type: "Residential (Villa)", consumption: 2158, avg_monthly: 180 },
      { meter: "Z8-2", type: "Residential (Villa)", consumption: 2313, avg_monthly: 193 },
      { meter: "Z8-3", type: "Residential (Villa)", consumption: 2190, avg_monthly: 183 },
      { meter: "Z8-4", type: "Residential (Villa)", consumption: 2387, avg_monthly: 199 },
      { meter: "Z8-5", type: "Residential (Villa)", consumption: 2241, avg_monthly: 187 }
    ],
    "Zone_VS": [
      { meter: "Irrigation Tank - VS", type: "IRR_Servies", consumption: 447, avg_monthly: 37 },
      { meter: "Laundry Services (FF Shop No.593)", type: "Retail", consumption: 373, avg_monthly: 31 },
      { meter: "Coffee 2 (GF Shop No.594 A)", type: "Retail", consumption: 7, avg_monthly: 1 },
      { meter: "Supermarket (FF Shop No.591)", type: "Retail", consumption: 3, avg_monthly: 0 },
      { meter: "Pharmacy (FF Shop No.591 A)", type: "Retail", consumption: 2, avg_monthly: 0 }
    ]
  };

  // Distribution of submeter types by zone
  const typeDistribution = {
    "Zone_01_(FM)": [
      { name: "MB_Common", value: 20 },
      { name: "Retail", value: 30 },
      { name: "Building", value: 50 }
    ],
    "Zone_03_(A)": [
      { name: "Residential (Villa)", value: 60 },
      { name: "D_Building_Common", value: 25 },
      { name: "Residential (Apart)", value: 15 }
    ],
    "Zone_03_(B)": [
      { name: "Residential (Villa)", value: 55 },
      { name: "D_Building_Common", value: 30 },
      { name: "Residential (Apart)", value: 15 }
    ],
    "Zone_05": [
      { name: "Residential (Villa)", value: 75 },
      { name: "IRR_Servies", value: 25 }
    ],
    "Zone_08": [
      { name: "Residential (Villa)", value: 95 },
      { name: "IRR_Servies", value: 5 }
    ],
    "Zone_VS": [
      { name: "Retail", value: 75 },
      { name: "IRR_Servies", value: 25 }
    ]
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Zone Water Consumption</CardTitle>
          <CardDescription>Water consumption breakdown by zone (2024)</CardDescription>
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
                margin={{ top: 20, right: 30, left: 120, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" />
                <YAxis dataKey="zone" type="category" width={120} />
                <Tooltip formatter={(value) => [`${value.toLocaleString()} m³`, "Consumption"]} />
                <Legend />
                <Bar 
                  dataKey="total" 
                  name="Bulk Consumption (m³)" 
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
          <CardTitle>Zone Details Analysis</CardTitle>
          <CardDescription>Detailed information about zone meters and consumption patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="Zone_01_(FM)" onValueChange={setSelectedZone}>
            <TabsList className="mb-4">
              <TabsTrigger value="Zone_01_(FM)">Zone 01 (FM)</TabsTrigger>
              <TabsTrigger value="Zone_03_(A)">Zone 03A</TabsTrigger>
              <TabsTrigger value="Zone_03_(B)">Zone 03B</TabsTrigger>
              <TabsTrigger value="Zone_05">Zone 05</TabsTrigger>
              <TabsTrigger value="Zone_08">Zone 08</TabsTrigger>
              <TabsTrigger value="Zone_VS">Zone VS</TabsTrigger>
            </TabsList>
            
            {Object.keys(submeterData).map((zoneKey) => (
              <TabsContent key={zoneKey} value={zoneKey}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Zone Information</h3>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Bulk Meter</TableCell>
                          <TableCell>
                            {sampleZoneData.find(zone => zone.zone.includes(zoneKey.replace('_', ' ')))?.bulk_meter}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Total Submeters</TableCell>
                          <TableCell>
                            {sampleZoneData.find(zone => zone.zone.includes(zoneKey.replace('_', ' ')))?.submeters}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Total Bulk Consumption (2024)</TableCell>
                          <TableCell>
                            {sampleZoneData.find(zone => zone.zone.includes(zoneKey.replace('_', ' ')))?.total.toLocaleString()} m³
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Total Individual Consumption (2024)</TableCell>
                          <TableCell>
                            {sampleZoneData.find(zone => zone.zone.includes(zoneKey.replace('_', ' ')))?.indiv_consumption.toLocaleString()} m³
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Efficiency</TableCell>
                          <TableCell>
                            {sampleZoneData.find(zone => zone.zone.includes(zoneKey.replace('_', ' ')))?.efficiency}%
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Loss</TableCell>
                          <TableCell className={sampleZoneData.find(zone => zone.zone.includes(zoneKey.replace('_', ' ')))?.loss < 0 ? "text-red-500" : ""}>
                            {sampleZoneData.find(zone => zone.zone.includes(zoneKey.replace('_', ' ')))?.loss.toLocaleString()} m³
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Submeter Type Distribution</h3>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={typeDistribution[zoneKey]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {typeDistribution[zoneKey].map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => `${value}%`} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Top Submeters</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Meter Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="text-right">Total Consumption (2024)</TableHead>
                        <TableHead className="text-right">Avg. Monthly (m³)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {submeterData[zoneKey].map((meter, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{meter.meter}</TableCell>
                          <TableCell>{meter.type}</TableCell>
                          <TableCell className="text-right">{meter.consumption.toLocaleString()} m³</TableCell>
                          <TableCell className="text-right">{meter.avg_monthly.toLocaleString()} m³</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default WaterZoneAnalysis;
