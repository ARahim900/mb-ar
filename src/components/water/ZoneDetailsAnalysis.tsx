import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { waterData } from "@/data/waterData";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, FilterIcon, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Zone bulk data for our application
const zoneBulkData = [
  {
    id: "zone_3b",
    label: "ZONE 3B (BULK ZONE 3B)",
    meter_id: "4300344",
    months: {
      "012025": { bulk: 2962, consumption: 1988, loss: 974, lossPercentage: 2.21 },
      "022025": { bulk: 2469, consumption: 4521, loss: -2052, lossPercentage: -83.1 },
      "032025": { bulk: 2621, consumption: 5146, loss: -2525, lossPercentage: -96.3 },
      "042025": { bulk: 2624, consumption: 5961, loss: -3337, lossPercentage: -127.2 }
    },
    yearTotals: {
      "2024": { parentMeter: -38682, childAccounts: -35662, loss: -3020, lossPercentage: -1.9 },
      "2025Q1": { parentMeter: 10173, childAccounts: 20096, loss: -9923, lossPercentage: -97.5 }
    },
    customers: [
      { account: "4300008", name: "Habib Ismail Ali Al SuwaidZ3 052(6)", consumption: 9 },
      { account: "4300009", name: "Leopold Julian Zentner & Erica Kalobwe", consumption: 53 },
      { account: "4300020", name: "Wahibah R H Al MullaZ3 020", consumption: 14 },
      { account: "4300025", name: "Britta Stefanie Gerdes & Dr. Barbara Unger", consumption: 22 },
      { account: "4300029", name: "Al Fadhal Mohamed Ahmed Al HarthyZ3 029", consumption: 0 },
      { account: "4300042", name: "Nasser Abdelsalam Abdelrehiem Abdelsalam", consumption: 9 }
    ]
  },
  {
    id: "zone_3a",
    label: "ZONE 3A (BULK ZONE 3A)",
    meter_id: "4300343",
    months: {
      "012025": { bulk: 2529, consumption: 4728, loss: -2199, lossPercentage: -87.0 },
      "022025": { bulk: 2307, consumption: 4844, loss: -2537, lossPercentage: -110.0 },
      "032025": { bulk: 2370, consumption: 5493, loss: -3123, lossPercentage: -131.8 },
      "042025": { bulk: 2464, consumption: 6412, loss: -3948, lossPercentage: -160.2 }
    },
    yearTotals: {
      "2024": { parentMeter: 27731, childAccounts: 47992, loss: -20261, lossPercentage: -73.1 },
      "2025Q1": { parentMeter: 9670, childAccounts: 21477, loss: -11807, lossPercentage: -122.1 }
    },
    customers: [
      { account: "4300101", name: "Ahmed Al Siyabi", consumption: 18 },
      { account: "4300102", name: "Mohammed Al Balushi", consumption: 43 },
      { account: "4300103", name: "Sara Al Harthi", consumption: 32 },
      { account: "4300104", name: "Khalid Al Rawahi", consumption: 25 },
      { account: "4300105", name: "Fatima Al Zadjali", consumption: 16 }
    ]
  },
  {
    id: "zone_05",
    label: "ZONE 5 (BULK ZONE 5)",
    meter_id: "4300342",
    months: {
      "012025": { bulk: 3019, consumption: 5528, loss: -2509, lossPercentage: -83.1 },
      "022025": { bulk: 2959, consumption: 5582, loss: -2623, lossPercentage: -88.6 },
      "032025": { bulk: 3038, consumption: 6339, loss: -3301, lossPercentage: -108.7 },
      "042025": { bulk: 3095, consumption: 7366, loss: -4271, lossPercentage: -138.0 }
    },
    yearTotals: {
      "2024": { parentMeter: 32934, childAccounts: 56060, loss: -23126, lossPercentage: -70.2 },
      "2025Q1": { parentMeter: 12111, childAccounts: 24815, loss: -12704, lossPercentage: -104.9 }
    },
    customers: [
      { account: "4300201", name: "Sultan Al Maamari", consumption: 37 },
      { account: "4300202", name: "Noor Al Saadi", consumption: 29 },
      { account: "4300203", name: "Hassan Al Farsi", consumption: 48 },
      { account: "4300204", name: "Aisha Al Habsi", consumption: 21 },
      { account: "4300205", name: "Omar Al Maskari", consumption: 33 }
    ]
  },
  {
    id: "zone_01_fm",
    label: "ZONE FM (BULK ZONE FM)",
    meter_id: "4300341",
    months: {
      "012025": { bulk: 2832, consumption: 6232, loss: -3400, lossPercentage: -120.1 },
      "022025": { bulk: 2748, consumption: 6354, loss: -3606, lossPercentage: -131.2 },
      "032025": { bulk: 2929, consumption: 7130, loss: -4201, lossPercentage: -143.4 },
      "042025": { bulk: 2854, consumption: 8319, loss: -5465, lossPercentage: -191.5 }
    },
    yearTotals: {
      "2024": { parentMeter: 36076, childAccounts: 64390, loss: -28314, lossPercentage: -78.5 },
      "2025Q1": { parentMeter: 11363, childAccounts: 28035, loss: -16672, lossPercentage: -146.7 }
    },
    customers: [
      { account: "4300301", name: "Building FM", consumption: 611 },
      { account: "4300302", name: "Building Taxi", consumption: 1270 },
      { account: "4300303", name: "Building B1", consumption: 276 },
      { account: "4300304", name: "Building B2", consumption: 349 },
      { account: "4300305", name: "Building B3", consumption: 336 }
    ]
  },
  {
    id: "zone_08",
    label: "ZONE 8 (BULK ZONE 8)",
    meter_id: "4300345",
    months: {
      "012025": { bulk: 2196, consumption: 4108, loss: -1912, lossPercentage: -87.1 },
      "022025": { bulk: 2143, consumption: 4102, loss: -1959, lossPercentage: -91.4 },
      "032025": { bulk: 2120, consumption: 4616, loss: -2496, lossPercentage: -117.7 },
      "042025": { bulk: 2108, consumption: 5329, loss: -3221, lossPercentage: -152.8 }
    },
    yearTotals: {
      "2024": { parentMeter: 24093, childAccounts: 41544, loss: -17451, lossPercentage: -72.4 },
      "2025Q1": { parentMeter: 8567, childAccounts: 18155, loss: -9588, lossPercentage: -111.9 }
    },
    customers: [
      { account: "4300401", name: "Salim Al Hashmi", consumption: 27 },
      { account: "4300402", name: "Maryam Al Waili", consumption: 35 },
      { account: "4300403", name: "Abdullah Al Kindi", consumption: 19 },
      { account: "4300404", name: "Laila Al Aufi", consumption: 24 },
      { account: "4300405", name: "Yusuf Al Abri", consumption: 30 }
    ]
  },
  {
    id: "zone_vs",
    label: "Village Square (Zone Bulk)",
    meter_id: "4300335",
    months: {
      "012025": { bulk: 2368, consumption: 4062, loss: -1694, lossPercentage: -71.5 },
      "022025": { bulk: 2158, consumption: 4154, loss: -1996, lossPercentage: -92.5 },
      "032025": { bulk: 2249, consumption: 4744, loss: -2495, lossPercentage: -110.9 },
      "042025": { bulk: 1953, consumption: 5518, loss: -3565, lossPercentage: -182.5 }
    },
    yearTotals: {
      "2024": { parentMeter: 22203, childAccounts: 42376, loss: -20173, lossPercentage: -90.9 },
      "2025Q1": { parentMeter: 8728, childAccounts: 18478, loss: -9750, lossPercentage: -111.7 }
    },
    customers: [
      { account: "4300326", name: "Irrigation Tank - VS", consumption: 0 },
      { account: "4300327", name: "Coffee 1 (GF Shop No.591)", consumption: 0 },
      { account: "4300328", name: "Sale Centre Caffe & Bar", consumption: 14 },
      { account: "4300329", name: "Coffee 2 (GF Shop No.594 A)", consumption: 15 },
      { account: "4300330", name: "Supermarket (FF Shop No.591)", consumption: 0 }
    ]
  }
];

// Available months for selection
const months = [
  { value: "022025", label: "Feb 2025", billmonth: "billmonth" },
  { value: "012025", label: "Jan 2025", billmonth: "billmonth" },
  { value: "122024", label: "Dec 2024", billmonth: "billmonth" },
  { value: "112024", label: "Nov 2024", billmonth: "billmonth" }
];

const ZoneDetailsAnalysis = () => {
  const [selectedZone, setSelectedZone] = useState("zone_3b");
  const [selectedMonth, setSelectedMonth] = useState("022025");
  const [zoneData, setZoneData] = useState(zoneBulkData.find(zone => zone.id === "zone_3b"));

  // Update zone data when selected zone changes
  useEffect(() => {
    const newZoneData = zoneBulkData.find(zone => zone.id === selectedZone);
    if (newZoneData) {
      setZoneData(newZoneData);
    }
  }, [selectedZone]);

  if (!zoneData) {
    return <div>Loading zone data...</div>;
  }

  // Get current month data
  const currentMonthData = zoneData.months[selectedMonth] || zoneData.months["022025"];
  
  // Current year data based on month
  const currentYearData = selectedMonth.substring(2) === "2024" 
    ? zoneData.yearTotals["2024"] 
    : zoneData.yearTotals["2025Q1"];

  // Get zone consumption data from waterData
  const getZoneConsumptionData = (zoneId) => {
    // Map zone_id to the format in waterData
    const zoneMapping = {
      "zone_3b": "Zone03B",
      "zone_3a": "Zone03A",
      "zone_05": "Zone05",
      "zone_01_fm": "Zone01FM",
      "zone_08": "Zone08",
      "zone_vs": "ZoneVS"
    };
    
    const zoneKey = zoneMapping[zoneId];
    if (!zoneKey) return [];

    return waterData.zones.individual.map(monthData => ({
      month: monthData.month,
      consumption: monthData[zoneKey]
    }));
  };

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
                {zoneBulkData.map(zone => (
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2 px-5 pt-5 border-b">
            <CardTitle className="text-lg text-muted-foreground font-medium">
              {selectedMonth.substring(0, 2) === "02" ? "022025" : currentMonthData ? selectedMonth : "022025"} Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col items-center">
                <div style={{ width: 150, height: 150 }}>
                  <CircularProgressbar
                    value={100}
                    text={`${currentMonthData.bulk}`}
                    styles={buildStyles({
                      textSize: '22px',
                      pathColor: '#4285F4',
                      textColor: '#4285F4',
                      trailColor: '#F5F5F5',
                    })}
                  />
                </div>
                <p className="mt-2 text-center text-sm font-medium">Total Bulk Supply</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div style={{ width: 150, height: 150 }}>
                  <CircularProgressbar
                    value={100}
                    text={`${currentMonthData.consumption}`}
                    styles={buildStyles({
                      textSize: '22px',
                      pathColor: '#FF6B2B',
                      textColor: '#FF6B2B',
                      trailColor: '#F5F5F5',
                    })}
                  />
                </div>
                <p className="mt-2 text-center text-sm font-medium">Total Consumption</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div style={{ width: 150, height: 150 }}>
                  <CircularProgressbar
                    value={100}
                    text={`${currentMonthData.loss}`}
                    styles={buildStyles({
                      textSize: '22px',
                      pathColor: '#DC2626',
                      textColor: '#DC2626',
                      trailColor: '#F5F5F5',
                    })}
                  />
                </div>
                <p className="mt-2 text-center text-sm font-medium">Total Zone Loss</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div style={{ width: 150, height: 150 }}>
                  <CircularProgressbar
                    value={100}
                    text={`${Math.abs(currentMonthData.lossPercentage).toFixed(1)}%`}
                    styles={buildStyles({
                      textSize: '22px',
                      pathColor: '#DC2626',
                      textColor: '#DC2626',
                      trailColor: '#F5F5F5',
                    })}
                  />
                </div>
                <p className="mt-2 text-center text-sm font-medium">Loss Percentage</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2 px-5 pt-5 border-b">
            <CardTitle className="text-lg text-muted-foreground font-medium">Related Year Stats</CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col items-center">
                <div style={{ width: 150, height: 150 }}>
                  <CircularProgressbar
                    value={100}
                    text={`${currentYearData.parentMeter}`}
                    styles={buildStyles({
                      textSize: '22px',
                      pathColor: '#4285F4',
                      textColor: '#4285F4',
                      trailColor: '#F5F5F5',
                    })}
                  />
                </div>
                <p className="mt-2 text-center text-sm font-medium">Parent Meter Consumption</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div style={{ width: 150, height: 150 }}>
                  <CircularProgressbar
                    value={100}
                    text={`${currentYearData.childAccounts}`}
                    styles={buildStyles({
                      textSize: '22px',
                      pathColor: '#FF6B2B',
                      textColor: '#FF6B2B',
                      trailColor: '#F5F5F5',
                    })}
                  />
                </div>
                <p className="mt-2 text-center text-sm font-medium">Child Account Total</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div style={{ width: 150, height: 150 }}>
                  <CircularProgressbar
                    value={100}
                    text={`${currentYearData.loss}`}
                    styles={buildStyles({
                      textSize: '22px',
                      pathColor: '#DC2626',
                      textColor: '#DC2626',
                      trailColor: '#F5F5F5',
                    })}
                  />
                </div>
                <p className="mt-2 text-center text-sm font-medium">Loss</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div style={{ width: 150, height: 150 }}>
                  <CircularProgressbar
                    value={100}
                    text={`${Math.abs(currentYearData.lossPercentage).toFixed(1)}%`}
                    styles={buildStyles({
                      textSize: '22px',
                      pathColor: '#DC2626',
                      textColor: '#DC2626',
                      trailColor: '#F5F5F5',
                    })}
                  />
                </div>
                <p className="mt-2 text-center text-sm font-medium">Loss Percentage</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2 px-5 pt-5 border-b">
          <CardTitle className="text-lg text-muted-foreground font-medium">
            Customer Details As of {selectedMonth.substring(0, 2) === "02" ? "022025" : selectedMonth} Under {zoneData.label}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Parent Meter</TableHead>
                <TableHead>Account #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="text-right">CONSUMPTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {zoneData.customers.map((customer, index) => (
                <TableRow key={index}>
                  <TableCell>{zoneData.meter_id}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal">{customer.account}</Badge>
                  </TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end">
                      <div className="h-4 bg-green-100 mr-2" style={{ 
                        width: `${Math.min(customer.consumption * 3, 150)}px`,
                        minWidth: '10px'
                      }}></div>
                      <span className="font-medium text-green-600">{customer.consumption}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Additional chart options */}
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