
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, ArrowLeft, AlertTriangle, BarChart3, Map, Building, PieChart, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample data - this would eventually come from Supabase
const monthlyData = [
  { month: "Nov 24", consumption: 120450, cost: 12045 },
  { month: "Dec 24", consumption: 132500, cost: 13250 },
  { month: "Jan 25", consumption: 143200, cost: 14320 },
  { month: "Feb 25", consumption: 138760, cost: 13876 },
  { month: "Mar 25", consumption: 129340, cost: 12934 },
  { month: "Apr 25", consumption: 135780, cost: 13578 },
];

const zoneData = [
  { name: "Zone A", consumption: 35270, percentage: 26 },
  { name: "Zone B", consumption: 28450, percentage: 21 },
  { name: "Zone C", consumption: 32840, percentage: 24 },
  { name: "Zone D", consumption: 23670, percentage: 17 },
  { name: "Zone E", consumption: 16550, percentage: 12 },
];

const topConsumers = [
  { id: 1, facilityName: "Main Resort Hotel", zone: "Zone A", consumption: 28350, previousMonth: 27240, change: 4.1 },
  { id: 2, facilityName: "Villa Complex 1", zone: "Zone B", consumption: 21460, previousMonth: 22580, change: -4.9 },
  { id: 3, facilityName: "Restaurant Area", zone: "Zone A", consumption: 18720, previousMonth: 17350, change: 7.9 },
  { id: 4, facilityName: "Villa Complex 2", zone: "Zone C", consumption: 15670, previousMonth: 16120, change: -2.8 },
  { id: 5, facilityName: "Clubhouse", zone: "Zone D", consumption: 12450, previousMonth: 11980, change: 3.9 },
];

const ElectricityAnalysis = () => {
  const [dateRange, setDateRange] = useState("last6months");

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
          <Zap className="h-8 w-8 text-amber-500" />
          <div>
            <h1 className="text-3xl font-bold text-muscat-primary">Electricity Analysis</h1>
            <p className="text-muted-foreground">Power consumption and distribution management</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last3months">Last 3 Months</SelectItem>
              <SelectItem value="last6months">Last 6 Months</SelectItem>
              <SelectItem value="lastyear">Last Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" /> Overview
          </TabsTrigger>
          <TabsTrigger value="zones" className="flex items-center gap-2">
            <Map className="h-4 w-4" /> Zone Analysis
          </TabsTrigger>
          <TabsTrigger value="facilities" className="flex items-center gap-2">
            <Building className="h-4 w-4" /> Facility Details
          </TabsTrigger>
          <TabsTrigger value="cost" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" /> Cost Analysis
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="h-4 w-4" /> Reports & Exports
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Current Month</CardTitle>
                <CardDescription>April 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">135,780 kWh</div>
                <div className="flex items-center mt-2 text-sm">
                  <span className="text-green-600 font-medium">↑ 5.0% </span>
                  <span className="text-muted-foreground ml-1">vs last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Electricity Cost</CardTitle>
                <CardDescription>April 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">13,578 OMR</div>
                <div className="flex items-center mt-2 text-sm">
                  <span className="text-green-600 font-medium">↑ 5.0% </span>
                  <span className="text-muted-foreground ml-1">vs last month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1 md:col-span-2 lg:col-span-1">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Alerts</CardTitle>
                  <CardDescription>Recent issues</CardDescription>
                </div>
                <AlertTriangle className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="rounded-lg bg-amber-50 p-3 border border-amber-100">
                    <div className="font-medium text-amber-800">Zone C Consumption Spike</div>
                    <div className="text-sm text-amber-700">15% increase in last week</div>
                  </div>
                  <div className="rounded-lg bg-amber-50 p-3 border border-amber-100">
                    <div className="font-medium text-amber-800">Villa Complex 1 Decrease</div>
                    <div className="text-sm text-amber-700">Unusual 4.9% drop from previous month</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Consumption Trend</CardTitle>
              <CardDescription>Monthly electricity usage in kWh</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="consumption" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="consumption" stroke="#F59E0B" fillOpacity={1} fill="url(#consumption)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Consumers</CardTitle>
              <CardDescription>Highest electricity consumption facilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-2 text-left font-medium">Facility</th>
                      <th className="py-3 px-2 text-left font-medium">Zone</th>
                      <th className="py-3 px-2 text-right font-medium">Consumption (kWh)</th>
                      <th className="py-3 px-2 text-right font-medium">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topConsumers.map((facility) => (
                      <tr key={facility.id} className="border-b">
                        <td className="py-3 px-2">{facility.facilityName}</td>
                        <td className="py-3 px-2">{facility.zone}</td>
                        <td className="py-3 px-2 text-right">{facility.consumption.toLocaleString()}</td>
                        <td className="py-3 px-2 text-right">
                          <span className={facility.change > 0 ? "text-red-600" : "text-green-600"}>
                            {facility.change > 0 ? "↑" : "↓"} {Math.abs(facility.change)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Zone Analysis Tab */}
        <TabsContent value="zones" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Zone Distribution</CardTitle>
              <CardDescription>Electricity consumption by zone</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={zoneData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="consumption" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {zoneData.map((zone) => (
                  <div key={zone.name} className="rounded-lg p-3 border">
                    <div className="text-sm font-medium">{zone.name}</div>
                    <div className="text-lg font-bold">{zone.consumption.toLocaleString()} kWh</div>
                    <div className="text-sm text-muted-foreground">{zone.percentage}% of total</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <div className="text-center text-muted-foreground">
            Additional zone analysis features will be implemented in the next phase.
          </div>
        </TabsContent>

        {/* Placeholder content for other tabs */}
        <TabsContent value="facilities" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Facilities Analysis</h2>
            <p className="text-muted-foreground">
              The facilities analysis section will be implemented in the next development phase. 
              This will include a searchable table of all facilities, detailed consumption history, and anomaly detection.
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="cost" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Cost Analysis</h2>
            <p className="text-muted-foreground">
              The cost analysis section will be implemented in the next development phase.
              This will include monthly cost breakdown, cost per zone, forecasting, and optimization recommendations.
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Reports & Exports</h2>
            <p className="text-muted-foreground">
              The reports and exports section will be implemented in the next development phase.
              This will include PDF report generation, Excel/CSV exports, scheduled reports, and custom date ranges.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ElectricityAnalysis;
