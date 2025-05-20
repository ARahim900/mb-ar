
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AreaChart, LineChart } from "recharts";
import { 
  Droplet, 
  Zap, 
  Factory, 
  Users,
  TrendingDown,
  ArrowRight
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import StatsCard from "@/components/ui-custom/StatsCard";
import ToggleView from "@/components/ui-custom/ToggleView";

// Sample data for charts
const waterData = [
  { month: "Jan", supply: 32500, consumption: 30200 },
  { month: "Feb", supply: 33400, consumption: 31000 },
  { month: "Mar", supply: 34200, consumption: 31800 },
  { month: "Apr", supply: 34915, consumption: 32264 },
];

const electricityData = [
  { month: "Jan", consumption: 85400 },
  { month: "Feb", consumption: 82300 },
  { month: "Mar", consumption: 80100 },
  { month: "Apr", consumption: 78479 },
];

const Index = () => {
  const [viewMode, setViewMode] = useState("Realtime");

  return (
    <div className="container py-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-muscat-primary">Muscat Bay Dashboard</h1>
          <p className="text-muted-foreground">Utility Management System Overview</p>
        </div>
        <ToggleView 
          options={["Realtime", "Monthly"]} 
          defaultOption="Realtime"
          onChange={setViewMode}
        />
      </div>

      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">System Performance Overview</h2>
        <div className="card-grid">
          {/* Water Analytics Card */}
          <StatsCard
            title="Water Analytics"
            subtitle="Water supply and consumption metrics"
            icon={<Droplet className="h-5 w-5" />}
            status="success"
            statusText="Within target"
          >
            <div className="mt-3">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Total Loss</span>
                <span className="text-sm font-medium">7.6%</span>
              </div>
              <Progress value={76} className="progress-bar">
                <div className="progress-value bg-blue-500" style={{ width: '76%' }}></div>
              </Progress>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs text-gray-500">Supply:</p>
                <p className="font-medium">34,915 m³</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Consumption:</p>
                <p className="font-medium">32,264 m³</p>
              </div>
            </div>
          </StatsCard>

          {/* Electricity Management Card */}
          <StatsCard
            title="Electricity Management"
            subtitle="Power consumption and distribution"
            icon={<Zap className="h-5 w-5" />}
            value="78,479"
            unit="kWh"
            change={-26.7}
            changeText="vs last period"
          >
            <div className="mt-3">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Efficiency</span>
                <span className="text-sm font-medium">92%</span>
              </div>
              <Progress value={92} className="progress-bar">
                <div className="progress-value bg-amber-500" style={{ width: '92%' }}></div>
              </Progress>
            </div>
            <div className="mt-4">
              <p className="text-xs text-gray-500">Peak:</p>
              <p className="font-medium">14,971 kWh</p>
            </div>
          </StatsCard>

          {/* STP Plant Card */}
          <StatsCard
            title="STP Plant"
            subtitle="Sewage treatment performance"
            icon={<Factory className="h-5 w-5" />}
            status="success"
            statusText="High"
          >
            <div className="mt-3">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Efficiency</span>
                <span className="text-sm text-status-success font-medium">105.3%</span>
              </div>
              <Progress value={100} className="progress-bar">
                <div className="progress-value bg-green-500" style={{ width: '100%' }}></div>
              </Progress>
              <p className="text-sm text-status-success mt-1">↓ 6.9% decrease</p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs text-gray-500">Daily Flow:</p>
                <p className="font-medium">16.9 m³/day</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Monthly:</p>
                <p className="font-medium">506 m³</p>
              </div>
            </div>
          </StatsCard>

          {/* Contractor Tracker Card */}
          <StatsCard
            title="Contractor Tracker"
            subtitle="Contractor agreements and status"
            icon={<Users className="h-5 w-5" />}
            value="5"
            status="warning"
            statusText="2 contracts expiring soon"
          >
            <div className="mt-4 grid grid-cols-3 gap-1">
              <div className="bg-green-100 rounded p-2 text-center">
                <p className="text-xs text-gray-600">Active:</p>
                <p className="font-medium text-green-700">5</p>
              </div>
              <div className="bg-amber-100 rounded p-2 text-center">
                <p className="text-xs text-gray-600">Expiring:</p>
                <p className="font-medium text-amber-700">2</p>
              </div>
              <div className="bg-red-50 rounded p-2 text-center">
                <p className="text-xs text-gray-600">Expired:</p>
                <p className="font-medium text-red-700">0</p>
              </div>
            </div>
          </StatsCard>
        </div>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-2">Water Supply vs Consumption</h2>
          <p className="text-muted-foreground text-sm mb-4">Trend analysis with loss percentage</p>
          <div className="h-64 w-full">
            <LineChart
              width={500}
              height={220}
              data={waterData}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              {/* Chart components would go here */}
            </LineChart>
          </div>
          <div className="mt-4 text-right">
            <Link to="/water-analysis">
              <Button variant="link" className="text-muscat-accent flex items-center gap-1">
                View detailed analysis <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-2">Electricity Consumption</h2>
          <p className="text-muted-foreground text-sm mb-4">Monthly consumption patterns</p>
          <div className="h-64 w-full">
            <AreaChart
              width={500}
              height={220}
              data={electricityData}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              {/* Chart components would go here */}
            </AreaChart>
          </div>
          <div className="mt-4 text-right">
            <Link to="/electricity-analysis">
              <Button variant="link" className="text-muscat-accent flex items-center gap-1">
                View detailed analysis <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
