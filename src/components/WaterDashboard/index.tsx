import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs'; 

import { waterData } from '../../data/waterData';
import { generateMonthOptions, getZoneNames } from '../../utils/waterCalculations';
import DataFilter from './DataFilter';
import TimeRangeSlider from './TimeRangeSlider';
import DashboardOverview from './tabs/DashboardOverview';

// Import these when implemented
// import ZoneAnalysis from './tabs/ZoneAnalysis';
// import LossAnalysis from './tabs/LossAnalysis';
// import TrendAnalysis from './tabs/TrendAnalysis';
// import DirectConnection from './tabs/DirectConnection';
// import ReportsInsights from './tabs/ReportsInsights';

const WaterDashboard: React.FC = () => {
  // State management
  const [selectedMonth, setSelectedMonth] = useState("Apr-25");
  const [selectedZone, setSelectedZone] = useState("all");
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState(15); // Default to showing all data
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  
  // Generate options for filters
  const monthOptions = generateMonthOptions();
  const zoneOptions = getZoneNames();
  
  // Generate labels for time range slider
  const timeRangeLabels = waterData.summary.map(item => item.month);
  
  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
          Water Management Dashboard
        </h1>
        
        <div className="flex flex-wrap gap-4">
          <DataFilter
            label="Month"
            options={monthOptions}
            value={selectedMonth}
            onChange={setSelectedMonth}
            className="bg-white rounded-lg px-3 py-2"
          />
          
          <DataFilter
            label="Zone"
            options={zoneOptions}
            value={selectedZone}
            onChange={setSelectedZone}
            className="bg-white rounded-lg px-3 py-2"
          />
          
          <div className="flex items-center">
            <label className="text-sm font-medium text-gray-700 mr-2">Animations:</label>
            <input
              type="checkbox"
              checked={animationsEnabled}
              onChange={(e) => setAnimationsEnabled(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>
      
      {/* Time Range Slider */}
      <div className="mb-6">
        <TimeRangeSlider
          value={timeRange}
          onChange={setTimeRange}
          min={0}
          max={timeRangeLabels.length - 1}
          labels={timeRangeLabels}
        />
      </div>
      
      {/* Tab Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex space-x-1 rounded-xl bg-gray-100 p-1">
          <TabsTrigger value="overview" className={activeTab === "overview" ? "bg-white shadow-sm rounded-lg px-3 py-2 text-sm font-medium text-gray-900" : "text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"}>
            Dashboard Overview
          </TabsTrigger>
          <TabsTrigger value="zoneAnalysis" className={activeTab === "zoneAnalysis" ? "bg-white shadow-sm rounded-lg px-3 py-2 text-sm font-medium text-gray-900" : "text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"}>
            Zone Analysis
          </TabsTrigger>
          <TabsTrigger value="lossAnalysis" className={activeTab === "lossAnalysis" ? "bg-white shadow-sm rounded-lg px-3 py-2 text-sm font-medium text-gray-900" : "text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"}>
            Loss Analysis
          </TabsTrigger>
          <TabsTrigger value="trends" className={activeTab === "trends" ? "bg-white shadow-sm rounded-lg px-3 py-2 text-sm font-medium text-gray-900" : "text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"}>
            Trend Analysis
          </TabsTrigger>
          <TabsTrigger value="directConnection" className={activeTab === "directConnection" ? "bg-white shadow-sm rounded-lg px-3 py-2 text-sm font-medium text-gray-900" : "text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"}>
            Direct Connection
          </TabsTrigger>
          <TabsTrigger value="reports" className={activeTab === "reports" ? "bg-white shadow-sm rounded-lg px-3 py-2 text-sm font-medium text-gray-900" : "text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"}>
            Reports & Insights
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-4">
          <DashboardOverview
            selectedMonth={selectedMonth}
            animationsEnabled={animationsEnabled}
            timeRange={timeRange}
            timeRangeLabels={timeRangeLabels}
          />
        </TabsContent>
        
        <TabsContent value="zoneAnalysis" className="mt-4">
          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Zone Analysis</h2>
            <p>Zone analysis content coming soon...</p>
          </div>
        </TabsContent>
        
        <TabsContent value="lossAnalysis" className="mt-4">
          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Loss Analysis</h2>
            <p>Loss analysis content coming soon...</p>
          </div>
        </TabsContent>
        
        <TabsContent value="trends" className="mt-4">
          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Trend Analysis</h2>
            <p>Trend analysis content coming soon...</p>
          </div>
        </TabsContent>
        
        <TabsContent value="directConnection" className="mt-4">
          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Direct Connection</h2>
            <p>Direct connection content coming soon...</p>
          </div>
        </TabsContent>
        
        <TabsContent value="reports" className="mt-4">
          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Reports & Insights</h2>
            <p>Reports and insights content coming soon...</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WaterDashboard;