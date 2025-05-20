import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Droplet, ArrowLeft, ArrowUpRight, ArrowDownRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "@/components/ui/progress";
import WaterZoneAnalysis from "@/components/water/WaterZoneAnalysis";
import WaterConsumptionSummary from "@/components/water/WaterConsumptionSummary";
import WaterDistributionChart from "@/components/water/WaterDistributionChart";
import WaterBulkMeters from "@/components/water/WaterBulkMeters";
import WaterLossAnalysis from "@/components/water/WaterLossAnalysis";
import WaterDirectConnection from "@/components/water/WaterDirectConnection";
import WaterPayable from "@/components/water/WaterPayable";

// Sample data until we connect to the database
const monthlyWaterData = [
  { month: "Jan", consumption: 7500, loss: 580 },
  { month: "Feb", consumption: 6800, loss: 530 },
  { month: "Mar", consumption: 7100, loss: 550 },
  { month: "Apr", consumption: 7400, loss: 560 },
  { month: "May", consumption: 7800, loss: 600 },
  { month: "Jun", consumption: 8200, loss: 640 },
  { month: "Jul", consumption: 8500, loss: 670 },
  { month: "Aug", consumption: 8300, loss: 650 },
  { month: "Sep", consumption: 8000, loss: 620 },
  { month: "Oct", consumption: 7700, loss: 590 },
  { month: "Nov", consumption: 7200, loss: 560 },
  { month: "Dec", consumption: 7245, loss: 575 }
];

const WaterAnalysis = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const { data: summaryData, isLoading: summaryLoading, error: summaryError } = useQuery({
    queryKey: ["waterSummary"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('water_consumption_by_type')
        .select('*')
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
    }
  });

  // Function to calculate total consumption for current month
  const getCurrentConsumption = () => {
    if (!summaryData || summaryData.length === 0) return 0;
    
    // In a real app, we'd calculate the sum for the current month
    // For now, let's use a sample value
    return 7245;
  };

  // Function to calculate month-over-month change
  const getMonthOverMonthChange = () => {
    // In a real app, we'd calculate this from actual data
    return 5.2; 
  };

  return (
    <div className="container py-6">
      <div className="flex items-center gap-2 mb-6">
        <Link to="/">
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Button>
        </Link>
      </div>
      
      <div className="flex items-center gap-3 mb-6">
        <Droplet className="h-8 w-8 text-blue-500" />
        <div>
          <h1 className="text-3xl font-bold text-muscat-primary">Water Analysis</h1>
          <p className="text-muted-foreground">Water supply and consumption management</p>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="zones">Zone Analysis</TabsTrigger>
          <TabsTrigger value="bulkMeters">Bulk Meters</TabsTrigger>
          <TabsTrigger value="loss">Loss Analysis</TabsTrigger>
          <TabsTrigger value="directConnection">Direct Connection</TabsTrigger>
          <TabsTrigger value="payable">Payable Consumption</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Current Consumption Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Current Consumption</CardTitle>
                <CardDescription>Total water consumption this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold">{getCurrentConsumption().toLocaleString()}</span>
                  <span className="text-muted-foreground mb-1">m³</span>
                </div>
                <div className="flex items-center mt-2">
                  {getMonthOverMonthChange() > 0 ? (
                    <>
                      <ArrowUpRight className="h-4 w-4 text-status-danger mr-1" />
                      <span className="text-status-danger text-sm">+{getMonthOverMonthChange()}% from last month</span>
                    </>
                  ) : (
                    <>
                      <ArrowDownRight className="h-4 w-4 text-status-success mr-1" />
                      <span className="text-status-success text-sm">{getMonthOverMonthChange()}% from last month</span>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Loss Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Water Loss</CardTitle>
                <CardDescription>Total water loss percentage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold">7.9%</span>
                  <span className="text-muted-foreground mb-1">overall</span>
                </div>
                <div className="mt-2">
                  <Progress value={79} className="h-2" />
                </div>
                <div className="flex items-center mt-2">
                  <AlertCircle className="h-4 w-4 text-status-warning mr-1" />
                  <span className="text-status-warning text-sm">Above target of 5%</span>
                </div>
              </CardContent>
            </Card>

            {/* Efficiency Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Distribution Efficiency</CardTitle>
                <CardDescription>Water system performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold">92.1%</span>
                  <span className="text-muted-foreground mb-1">effective</span>
                </div>
                <div className="mt-2">
                  <Progress value={92} className="h-2" />
                </div>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="h-4 w-4 text-status-success mr-1" />
                  <span className="text-status-success text-sm">+1.2% from previous quarter</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Consumption Chart Card */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Water Consumption</CardTitle>
              <CardDescription>Water consumption and loss over the past 12 months</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyWaterData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorConsumption" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorLoss" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="consumption" stroke="#0EA5E9" fillOpacity={1} fill="url(#colorConsumption)" name="Consumption (m³)" />
                  <Area type="monotone" dataKey="loss" stroke="#EF4444" fillOpacity={1} fill="url(#colorLoss)" name="Loss (m³)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Water Distribution Types */}
          <Card>
            <CardHeader>
              <CardTitle>Water Distribution by Type</CardTitle>
              <CardDescription>Breakdown of water distribution channels</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              {summaryLoading ? (
                <div className="flex items-center justify-center h-full">
                  <span>Loading data...</span>
                </div>
              ) : summaryError ? (
                <div className="flex items-center justify-center h-full text-status-danger">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  <span>Error loading data</span>
                </div>
              ) : (
                <WaterDistributionChart data={summaryData || []} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tabs content */}
        <TabsContent value="zones">
          <WaterZoneAnalysis />
        </TabsContent>

        <TabsContent value="bulkMeters">
          <WaterBulkMeters />
        </TabsContent>

        <TabsContent value="loss">
          <WaterLossAnalysis />
        </TabsContent>

        <TabsContent value="directConnection">
          <WaterDirectConnection />
        </TabsContent>

        <TabsContent value="payable">
          <WaterPayable />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WaterAnalysis;
