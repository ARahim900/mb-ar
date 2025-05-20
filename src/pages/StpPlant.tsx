
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Factory, ArrowLeft, AlertTriangle, BarChart3, Truck, Waves, Activity, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample data - this would eventually come from Supabase
const dailyData = [
  { date: "2025-05-14", tankers: 12, expectedVolume: 36, directSewage: 28, totalInfluent: 64, processed: 61, tseOutput: 58, efficiency: 95.3 },
  { date: "2025-05-15", tankers: 10, expectedVolume: 30, directSewage: 27, totalInfluent: 57, processed: 55, tseOutput: 52, efficiency: 96.5 },
  { date: "2025-05-16", tankers: 14, expectedVolume: 42, directSewage: 30, totalInfluent: 72, processed: 69, tseOutput: 66, efficiency: 95.8 },
  { date: "2025-05-17", tankers: 8, expectedVolume: 24, directSewage: 26, totalInfluent: 50, processed: 48, tseOutput: 45, efficiency: 96.0 },
  { date: "2025-05-18", tankers: 11, expectedVolume: 33, directSewage: 29, totalInfluent: 62, processed: 59, tseOutput: 56, efficiency: 95.2 },
  { date: "2025-05-19", tankers: 13, expectedVolume: 39, directSewage: 31, totalInfluent: 70, processed: 67, tseOutput: 64, efficiency: 95.7 },
  { date: "2025-05-20", tankers: 12, expectedVolume: 36, directSewage: 30, totalInfluent: 66, processed: 64, tseOutput: 60, efficiency: 97.0 },
];

const waterQualityData = [
  { name: "pH", value: 7.2, target: "6.5-8.5", status: "normal" },
  { name: "BOD", value: 12, target: "<20", status: "normal" },
  { name: "COD", value: 48, target: "<100", status: "normal" },
  { name: "TSS", value: 15, target: "<30", status: "normal" },
  { name: "NH4-N", value: 1.8, target: "<5", status: "normal" },
  { name: "TN", value: 9.4, target: "<15", status: "normal" },
  { name: "TP", value: 1.2, target: "<2", status: "normal" },
];

const StpPlant = () => {
  const [dateRange, setDateRange] = useState("last7days");
  const latestData = dailyData[dailyData.length - 1];

  // Calculate efficiency percentages
  const processingEfficiency = (latestData.processed / latestData.totalInfluent) * 100;
  const utilizationEfficiency = (latestData.tseOutput / latestData.processed) * 100;
  const directSewagePercentage = (latestData.directSewage / latestData.totalInfluent) * 100;
  const tankerPercentage = 100 - directSewagePercentage;

  return (
    <div className="container py-6">
      <div className="flex items-center gap-2 mb-6">
        <Link to="/">
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Button>
        </Link>
      </div>
      
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <Factory className="h-8 w-8 text-green-500" />
          <div>
            <h1 className="text-3xl font-bold text-muscat-primary">STP Plant</h1>
            <p className="text-muted-foreground">Sewage treatment plant monitoring and management</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7days">Last 7 Days</SelectItem>
              <SelectItem value="last14days">Last 14 Days</SelectItem>
              <SelectItem value="last30days">Last 30 Days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="operations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="operations" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" /> Daily Operations
          </TabsTrigger>
          <TabsTrigger value="tankers" className="flex items-center gap-2">
            <Truck className="h-4 w-4" /> Tanker Management
          </TabsTrigger>
          <TabsTrigger value="waterflow" className="flex items-center gap-2">
            <Waves className="h-4 w-4" /> Water Flow Analysis
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <Activity className="h-4 w-4" /> Treatment Performance
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="h-4 w-4" /> Reports & Analytics
          </TabsTrigger>
        </TabsList>

        {/* Daily Operations Tab */}
        <TabsContent value="operations" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Total Influent</CardTitle>
                <CardDescription>Today's total intake</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{latestData.totalInfluent} m³</div>
                <div className="flex items-center mt-2 text-sm">
                  <span className="text-amber-600 font-medium">↑ 6.5% </span>
                  <span className="text-muted-foreground ml-1">vs yesterday</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Processed Water</CardTitle>
                <CardDescription>Today's treatment volume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{latestData.processed} m³</div>
                <div className="flex items-center mt-2 text-sm">
                  <span className="text-green-600 font-medium">↑ 7.2% </span>
                  <span className="text-muted-foreground ml-1">vs yesterday</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>TSE Output</CardTitle>
                <CardDescription>Water for irrigation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{latestData.tseOutput} m³</div>
                <div className="flex items-center mt-2 text-sm">
                  <span className="text-green-600 font-medium">↑ 7.1% </span>
                  <span className="text-muted-foreground ml-1">vs yesterday</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Efficiency Metrics</CardTitle>
                <CardDescription>Processing and utilization performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Processing Efficiency</span>
                    <span className="text-sm font-medium">{processingEfficiency.toFixed(1)}%</span>
                  </div>
                  <Progress value={processingEfficiency} className="h-2" />
                  <div className="text-xs text-muted-foreground mt-1">Treated water vs total influent</div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">TSE Utilization</span>
                    <span className="text-sm font-medium">{utilizationEfficiency.toFixed(1)}%</span>
                  </div>
                  <Progress value={utilizationEfficiency} className="h-2" />
                  <div className="text-xs text-muted-foreground mt-1">TSE output vs processed water</div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm">
                    <div>
                      <div className="font-medium">Direct Sewage</div>
                      <div>{latestData.directSewage} m³ ({directSewagePercentage.toFixed(1)}%)</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">Tanker Discharge</div>
                      <div>{latestData.expectedVolume} m³ ({tankerPercentage.toFixed(1)}%)</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Alerts & Notifications</CardTitle>
                  <CardDescription>System issues and warnings</CardDescription>
                </div>
                <AlertTriangle className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="rounded-lg bg-green-50 p-3 border border-green-100">
                    <div className="font-medium text-green-800">All systems operating normally</div>
                    <div className="text-sm text-green-700">No critical alerts at this time</div>
                  </div>
                  <div className="rounded-lg bg-amber-50 p-3 border border-amber-100">
                    <div className="font-medium text-amber-800">Scheduled Maintenance</div>
                    <div className="text-sm text-amber-700">Pump inspection scheduled for tomorrow, 8:00 AM</div>
                  </div>
                  <div className="rounded-lg bg-blue-50 p-3 border border-blue-100">
                    <div className="font-medium text-blue-800">Processing Efficiency Increase</div>
                    <div className="text-sm text-blue-700">0.7% improvement in the last 24 hours</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Daily Operations Overview</CardTitle>
              <CardDescription>Past 7 days performance data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dailyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="totalInfluent" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="processed" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="totalInfluent" name="Total Influent" stroke="#3B82F6" fillOpacity={1} fill="url(#totalInfluent)" />
                    <Area type="monotone" dataKey="processed" name="Processed" stroke="#10B981" fillOpacity={0.5} fill="url(#processed)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Water Quality Parameters</CardTitle>
              <CardDescription>Latest measurements from treatment plant</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4 text-left font-medium">Parameter</th>
                      <th className="py-3 px-4 text-right font-medium">Value</th>
                      <th className="py-3 px-4 text-right font-medium">Target</th>
                      <th className="py-3 px-4 text-center font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {waterQualityData.map((param) => (
                      <tr key={param.name} className="border-b">
                        <td className="py-3 px-4">{param.name}</td>
                        <td className="py-3 px-4 text-right">{param.value}</td>
                        <td className="py-3 px-4 text-right">{param.target}</td>
                        <td className="py-3 px-4 text-center">
                          {param.status === "normal" ? (
                            <span className="inline-block w-3 h-3 bg-green-500 rounded-full" title="Normal"></span>
                          ) : param.status === "warning" ? (
                            <span className="inline-block w-3 h-3 bg-amber-500 rounded-full" title="Warning"></span>
                          ) : (
                            <span className="inline-block w-3 h-3 bg-red-500 rounded-full" title="Alert"></span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Placeholder content for other tabs */}
        <TabsContent value="tankers" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Tanker Management</h2>
            <p className="text-muted-foreground">
              The tanker management section will be implemented in the next development phase.
              This will include daily tanker tracking, volume analysis, scheduling interface, and historical data.
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="waterflow" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Water Flow Analysis</h2>
            <p className="text-muted-foreground">
              The water flow analysis section will be implemented in the next development phase.
              This will include Sankey diagrams, inlet vs. outlet comparison, efficiency metrics, and water loss identification.
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Treatment Performance</h2>
            <p className="text-muted-foreground">
              The treatment performance section will be implemented in the next development phase.
              This will include key performance indicators, historical trends, efficiency metrics, and quality control tracking.
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Reports & Analytics</h2>
            <p className="text-muted-foreground">
              The reports and analytics section will be implemented in the next development phase.
              This will include report generation, anomaly detection, predictive maintenance, and export functionality.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StpPlant;
