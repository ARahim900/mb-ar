import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Droplet, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Import components
import WaterDashboard from "@/components/WaterDashboard";
import WaterBulkMeters from "@/components/water/WaterBulkMeters";
import WaterZoneAnalysis from "@/components/water/WaterZoneAnalysis";
import WaterLossAnalysis from "@/components/water/WaterLossAnalysis";

const WaterAnalysis = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

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

      <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="dashboard">Water Dashboard</TabsTrigger>
          <TabsTrigger value="bulk-meters">Bulk Meters</TabsTrigger>
          <TabsTrigger value="zone-analysis">Zone Analysis</TabsTrigger>
          <TabsTrigger value="loss-analysis">Loss Analysis</TabsTrigger>
          <TabsTrigger value="legacy">Legacy Dashboard</TabsTrigger>
        </TabsList>

        {/* Water Dashboard */}
        <TabsContent value="dashboard">
          <WaterDashboard />
        </TabsContent>
        
        {/* Bulk Meters Analysis */}
        <TabsContent value="bulk-meters">
          <WaterBulkMeters />
        </TabsContent>
        
        {/* Zone Analysis */}
        <TabsContent value="zone-analysis">
          <WaterZoneAnalysis />
        </TabsContent>
        
        {/* Loss Analysis */}
        <TabsContent value="loss-analysis">
          <WaterLossAnalysis />
        </TabsContent>

        {/* Legacy Dashboard */}
        <TabsContent value="legacy">
          <Card>
            <CardHeader>
              <CardTitle>Legacy Dashboard</CardTitle>
              <CardDescription>
                The previous version of the water analysis dashboard is still available here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Please use the new Water Dashboard tab for the improved experience.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WaterAnalysis;