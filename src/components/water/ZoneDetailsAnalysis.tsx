import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, FilterIcon, BarChart3, DropletIcon, ActivityIcon, InfoIcon, AreaChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  waterMetersData, 
  ZoneData, 
  MeterData, 
  getZoneData, 
  getMetersByZone, 
  calculateZoneTotalConsumption,
  getZoneBulkMeter
} from "@/data/waterMetersData";

// Month options for selection
const months = [
  { value: "apr", label: "April 2025" },
  { value: "mar", label: "March 2025" },
  { value: "feb", label: "February 2025" },
  { value: "jan", label: "January 2025" }
];

// Define meter type colors for visualization
const meterTypeColors: Record<string, string> = {
  "Zone Bulk": "#4285F4",
  "Main BULK": "#0F9D58",
  "MB_Common": "#DB4437",
  "Retail": "#F4B400",
  "IRR_Servies": "#4285F4",
  "Residential (Villa)": "#673AB7",
  "Residential (Apart)": "#3F51B5",
  "D_Building_Bulk": "#2196F3",
  "D_Building_Common": "#03A9F4",
  "Building": "#00BCD4"
};

const ZoneDetailsAnalysis: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState("zone_01_fm");
  const [selectedMonth, setSelectedMonth] = useState("apr");
  const [activeTab, setActiveTab] = useState("overview");
  const [zoneData, setZoneData] = useState<ZoneData | undefined>(getZoneData("zone_01_fm"));
  const [zoneBulkMeter, setZoneBulkMeter] = useState<MeterData | undefined>(getZoneBulkMeter("zone_01_fm"));
  const [filteredMeters, setFilteredMeters] = useState<MeterData[]>([]);
  const [zoneConsumptionData, setZoneConsumptionData] = useState<any>({
    totalConsumption: 0,
    byType: {}
  });

  // Update zone data when selected zone changes
  useEffect(() => {
    const newZoneData = getZoneData(selectedZone);
    if (newZoneData) {
      setZoneData(newZoneData);
      
      // Get zone bulk meter
      const bulkMeter = getZoneBulkMeter(selectedZone);
      setZoneBulkMeter(bulkMeter);
      
      // Get all meters for this zone
      const meters = getMetersByZone(selectedZone);
      setFilteredMeters(meters);
      
      // Calculate consumption by meter type
      const totalConsumption = calculateZoneTotalConsumption(selectedZone, selectedMonth as 'jan' | 'feb' | 'mar' | 'apr');
      
      // Group consumption by meter type
      const consumptionByType: Record<string, number> = {};
      meters.forEach(meter => {
        const meterType = meter.type;
        if (!consumptionByType[meterType]) {
          consumptionByType[meterType] = 0;
        }
        consumptionByType[meterType] += meter.readings[selectedMonth as 'jan' | 'feb' | 'mar' | 'apr'];
      });
      
      setZoneConsumptionData({
        totalConsumption,
        byType: consumptionByType
      });
    }
  }, [selectedZone, selectedMonth]);

  // Generate monthly consumption comparison data
  const getMeterMonthlyData = (meter: MeterData) => {
    return [
      { month: 'Jan', consumption: meter.readings.jan },
      { month: 'Feb', consumption: meter.readings.feb },
      { month: 'Mar', consumption: meter.readings.mar },
      { month: 'Apr', consumption: meter.readings.apr }
    ];
  };

  // Sum the total readings for the zone by month
  const calculateZoneTotalByMonth = () => {
    if (!zoneData) return { jan: 0, feb: 0, mar: 0, apr: 0 };
    
    return {
      jan: calculateZoneTotalConsumption(selectedZone, 'jan'),
      feb: calculateZoneTotalConsumption(selectedZone, 'feb'),
      mar: calculateZoneTotalConsumption(selectedZone, 'mar'),
      apr: calculateZoneTotalConsumption(selectedZone, 'apr')
    };
  };

  const zoneTotals = calculateZoneTotalByMonth();

  // Calculate consumption by type for meter type distribution
  const calculateConsumptionByType = () => {
    if (!filteredMeters.length) return [];
    
    const typeConsumption: Record<string, number> = {};
    
    filteredMeters.forEach(meter => {
      const type = meter.type;
      if (!typeConsumption[type]) typeConsumption[type] = 0;
      typeConsumption[type] += meter.readings[selectedMonth as 'jan' | 'feb' | 'mar' | 'apr'];
    });
    
    return Object.entries(typeConsumption).map(([type, consumption]) => ({
      type,
      consumption,
      percentage: (consumption / zoneTotals[selectedMonth as 'jan' | 'feb' | 'mar' | 'apr'] * 100).toFixed(1)
    }));
  };

  const consumptionByType = calculateConsumptionByType();

  if (!zoneData) {
    return <div>Loading zone data...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-muted/40 p-4 rounded-lg">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-muted-foreground" />
          <h1 className="text-xl font-semibold">Zone Details Analysis</h1>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-auto">
            <Select value={selectedZone} onValueChange={setSelectedZone}>
              <SelectTrigger className="w-full sm:w-[240px]">
                <SelectValue placeholder="Select Zone" />
              </SelectTrigger>
              <SelectContent>
                {waterMetersData.map(zone => (
                  <SelectItem key={zone.id} value={zone.id}>
                    {zone.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full sm:w-auto">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map(month => (
                  <SelectItem key={month.value} value={month.value}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start border-b space-x-4 rounded-none bg-transparent h-auto p-0">
          <TabsTrigger 
            value="overview" 
            className="py-2 px-4 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none border-b-2 border-transparent rounded-none bg-transparent"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="consumption" 
            className="py-2 px-4 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none border-b-2 border-transparent rounded-none bg-transparent"
          >
            Consumption
          </TabsTrigger>
          <TabsTrigger 
            value="meters" 
            className="py-2 px-4 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none border-b-2 border-transparent rounded-none bg-transparent"
          >
            Meters
          </TabsTrigger>
          <TabsTrigger 
            value="trends" 
            className="py-2 px-4 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none border-b-2 border-transparent rounded-none bg-transparent"
          >
            Trends
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Zone Summary Card */}
            <Card className="md:col-span-2 border-0 shadow-sm">
              <CardHeader className="pb-2 px-5 pt-5 border-b">
                <CardTitle className="text-lg text-muted-foreground font-medium">
                  {zoneData.label} - Overview
                </CardTitle>
                <CardDescription>
                  Zone details and consumption summary
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-base mb-2">Zone Information</h3>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Zone Name:</span>
                        <span className="font-medium">{zoneData.label}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Bulk Meter:</span>
                        <span className="font-medium">{zoneBulkMeter?.meterLabel || "N/A"}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Account Number:</span>
                        <span className="font-medium">{zoneBulkMeter?.accountNumber || "N/A"}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Total Meters:</span>
                        <span className="font-medium">{filteredMeters.length}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-base mb-2">Consumption Overview ({months.find(m => m.value === selectedMonth)?.label})</h3>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Bulk Meter Reading:</span>
                        <span className="font-medium">{zoneBulkMeter?.readings[selectedMonth as 'jan' | 'feb' | 'mar' | 'apr'] || 0} units</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Total Consumption:</span>
                        <span className="font-medium">{zoneTotals[selectedMonth as 'jan' | 'feb' | 'mar' | 'apr']} units</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Average Consumption:</span>
                        <span className="font-medium">
                          {filteredMeters.length ? (zoneTotals[selectedMonth as 'jan' | 'feb' | 'mar' | 'apr'] / filteredMeters.length).toFixed(2) : 0} units/meter
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Highest Consumption:</span>
                        <span className="font-medium">
                          {filteredMeters.reduce((max, meter) => 
                            Math.max(max, meter.readings[selectedMonth as 'jan' | 'feb' | 'mar' | 'apr']), 0)} units
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium text-base mb-3">Monthly Consumption Trend</h3>
                  <div className="flex items-end justify-between h-32">
                    {Object.entries(zoneTotals).map(([month, value]) => {
                      const maxValue = Math.max(...Object.values(zoneTotals));
                      const heightPercentage = maxValue ? (value / maxValue) * 100 : 0;
                      
                      return (
                        <div key={month} className="flex flex-col items-center">
                          <div 
                            className="w-12 bg-blue-500 rounded-t"
                            style={{ 
                              height: `${heightPercentage}%`,
                              minHeight: value > 0 ? '8px' : '0'
                            }}
                          ></div>
                          <div className="mt-2 text-xs text-muted-foreground capitalize">{month}</div>
                          <div className="mt-1 text-xs font-medium">{value.toLocaleString()}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Distribution by Type */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2 px-5 pt-5 border-b">
                <CardTitle className="text-lg text-muted-foreground font-medium">
                  Consumption by Type
                </CardTitle>
                <CardDescription>
                  Distribution for {months.find(m => m.value === selectedMonth)?.label}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5">
                <div className="space-y-4">
                  {consumptionByType.map(item => (
                    <div key={item.type} className="space-y-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span>{item.type}</span>
                        <span className="font-medium">{item.consumption} ({item.percentage}%)</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full" 
                          style={{ 
                            width: `${item.percentage}%`,
                            backgroundColor: meterTypeColors[item.type] || '#4285F4',
                            minWidth: '4px'
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Consumption Tab */}
        <TabsContent value="consumption" className="pt-4">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2 px-5 pt-5 border-b">
              <CardTitle className="text-lg text-muted-foreground font-medium">
                {zoneData.label} - Consumption Details ({months.find(m => m.value === selectedMonth)?.label})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Meter Label</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Account #</TableHead>
                    <TableHead>Parent Meter</TableHead>
                    <TableHead className="text-right">Consumption</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMeters
                    .sort((a, b) => b.readings[selectedMonth as 'jan' | 'feb' | 'mar' | 'apr'] - a.readings[selectedMonth as 'jan' | 'feb' | 'mar' | 'apr'])
                    .map((meter, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{meter.meterLabel}</TableCell>
                      <TableCell>
                        <Badge 
                          style={{ backgroundColor: meterTypeColors[meter.type] || '#4285F4' }}
                          className="text-white font-normal"
                        >
                          {meter.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-normal">{meter.accountNumber}</Badge>
                      </TableCell>
                      <TableCell>{meter.parentMeter}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end">
                          <div className="h-4 bg-blue-100 mr-2" style={{ 
                            width: `${Math.min(meter.readings[selectedMonth as 'jan' | 'feb' | 'mar' | 'apr'] / 10, 150)}px`,
                            minWidth: '10px',
                            backgroundColor: `${meterTypeColors[meter.type]}25` || '#4285F425'
                          }}></div>
                          <span className="font-medium" style={{ color: meterTypeColors[meter.type] || '#4285F4' }}>
                            {meter.readings[selectedMonth as 'jan' | 'feb' | 'mar' | 'apr']}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Meters Tab */}
        <TabsContent value="meters" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMeters
              .filter(meter => meter.readings[selectedMonth as 'jan' | 'feb' | 'mar' | 'apr'] > 0)
              .sort((a, b) => b.readings[selectedMonth as 'jan' | 'feb' | 'mar' | 'apr'] - a.readings[selectedMonth as 'jan' | 'feb' | 'mar' | 'apr'])
              .slice(0, 6)
              .map((meter, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardHeader className="pb-2 px-5 pt-5 border-b">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base font-medium">
                      {meter.meterLabel}
                    </CardTitle>
                    <Badge 
                      style={{ backgroundColor: meterTypeColors[meter.type] || '#4285F4' }}
                      className="text-white font-normal"
                    >
                      {meter.type}
                    </Badge>
                  </div>
                  <CardDescription>
                    Account: {meter.accountNumber}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Current Reading ({months.find(m => m.value === selectedMonth)?.label})</div>
                      <div className="text-2xl font-semibold" style={{ color: meterTypeColors[meter.type] || '#4285F4' }}>
                        {meter.readings[selectedMonth as 'jan' | 'feb' | 'mar' | 'apr']}
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">Parent: {meter.parentMeter}</div>
                    </div>
                    
                    <div className="w-24 h-24">
                      <CircularProgressbar
                        value={100}
                        text={`${meter.readings[selectedMonth as 'jan' | 'feb' | 'mar' | 'apr']}`}
                        styles={buildStyles({
                          textSize: '22px',
                          pathColor: meterTypeColors[meter.type] || '#4285F4',
                          textColor: meterTypeColors[meter.type] || '#4285F4',
                          trailColor: '#F5F5F5',
                        })}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="text-xs text-muted-foreground mb-2">Monthly Readings</div>
                    <div className="flex items-end justify-between h-16">
                      {getMeterMonthlyData(meter).map(item => {
                        const maxReading = Math.max(meter.readings.jan, meter.readings.feb, meter.readings.mar, meter.readings.apr);
                        const heightPercentage = maxReading ? (item.consumption / maxReading) * 100 : 0;
                        
                        return (
                          <div key={item.month} className="flex flex-col items-center">
                            <div 
                              className="w-8 rounded-t"
                              style={{ 
                                height: `${heightPercentage}%`, 
                                backgroundColor: meterTypeColors[meter.type] || '#4285F4',
                                minHeight: item.consumption > 0 ? '4px' : '0'
                              }}
                            ></div>
                            <div className="mt-1 text-xs text-muted-foreground">{item.month}</div>
                            <div className="mt-1 text-xs font-medium">{item.consumption}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends" className="pt-4">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2 px-5 pt-5 border-b">
              <CardTitle className="text-lg text-muted-foreground font-medium">
                {zoneData.label} - Consumption Trends
              </CardTitle>
              <CardDescription>
                Monthly consumption analysis and trends
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-base mb-3">Monthly Zone Total Consumption</h3>
                  <div className="h-64 w-full bg-muted/20 p-4 rounded-lg">
                    <div className="flex flex-col justify-between h-full">
                      <div className="grid grid-cols-4 h-[calc(100%-24px)]">
                        {Object.entries(zoneTotals).map(([month, value], index) => {
                          const maxValue = Math.max(...Object.values(zoneTotals));
                          const heightPercentage = maxValue ? (value / maxValue) * 100 : 0;
                          
                          return (
                            <div key={month} className="flex flex-col items-center justify-end">
                              <div 
                                className="w-24 rounded-t"
                                style={{ 
                                  height: `${heightPercentage}%`,
                                  backgroundColor: index % 2 === 0 ? '#4285F4' : '#4285F480',
                                  minHeight: value > 0 ? '8px' : '0'
                                }}
                              ></div>
                              <div className="mt-4 text-sm font-medium capitalize">{month}: {value}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-base mb-3">Consumption Growth</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Month</TableHead>
                        <TableHead>Consumption</TableHead>
                        <TableHead>Change</TableHead>
                        <TableHead>Growth %</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(zoneTotals)
                        .sort((a, b) => {
                          const months = { jan: 1, feb: 2, mar: 3, apr: 4 };
                          return months[b[0] as 'jan' | 'feb' | 'mar' | 'apr'] - months[a[0] as 'jan' | 'feb' | 'mar' | 'apr'];
                        })
                        .map(([month, value], index, array) => {
                          // Calculate change and growth
                          let change = 0;
                          let growthPercent = 0;
                          
                          // If not the last item (which is the earliest month)
                          if (index < array.length - 1) {
                            const nextMonth = array[index + 1][0];
                            const nextValue = array[index + 1][1];
                            
                            change = value - nextValue;
                            growthPercent = nextValue !== 0 ? (change / nextValue) * 100 : 0;
                          }
                          
                          return (
                            <TableRow key={month}>
                              <TableCell className="font-medium capitalize">{month}</TableCell>
                              <TableCell>{value.toLocaleString()}</TableCell>
                              <TableCell>
                                {index < array.length - 1 ? (
                                  <div className="flex items-center">
                                    {change > 0 ? (
                                      <span className="text-green-600">+{change.toLocaleString()}</span>
                                    ) : change < 0 ? (
                                      <span className="text-red-600">{change.toLocaleString()}</span>
                                    ) : (
                                      <span className="text-gray-500">0</span>
                                    )}
                                  </div>
                                ) : (
                                  <span className="text-gray-500">-</span>
                                )}
                              </TableCell>
                              <TableCell>
                                {index < array.length - 1 ? (
                                  <div className="flex items-center">
                                    {growthPercent > 0 ? (
                                      <span className="text-green-600">+{growthPercent.toFixed(1)}%</span>
                                    ) : growthPercent < 0 ? (
                                      <span className="text-red-600">{growthPercent.toFixed(1)}%</span>
                                    ) : (
                                      <span className="text-gray-500">0%</span>
                                    )}
                                  </div>
                                ) : (
                                  <span className="text-gray-500">-</span>
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Export options */}
      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <CalendarIcon className="h-4 w-4" /> Export to Excel
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <FilterIcon className="h-4 w-4" /> Print Report
        </Button>
      </div>
    </div>
  );
};

export default ZoneDetailsAnalysis;