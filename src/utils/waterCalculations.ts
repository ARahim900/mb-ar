import { waterData, WaterSummary, ZoneBulkMeter } from '../data/waterData';

// Calculate efficiency
export const calculateEfficiency = (data: WaterSummary) => {
  return data.L1 > 0 ? ((data.L1 - data.TotalLoss) / data.L1 * 100).toFixed(1) : "0";
};

// Generate zone performance data
export const generateZonePerformanceData = (month: string) => {
  const zoneBulk = waterData.zones.bulkMeters.find((m) => m.month === month) as ZoneBulkMeter;
  const zoneIndiv = waterData.zones.individual.find((m) => m.month === month) as ZoneBulkMeter;
  const zoneLoss = waterData.zones.loss.find((m) => m.month === month) as ZoneBulkMeter;

  if (!zoneBulk || !zoneIndiv || !zoneLoss) {
    return [];
  }

  return [
    {
      name: "Zone 01 FM",
      bulk: zoneBulk.Zone01FM,
      individual: zoneIndiv.Zone01FM,
      loss: zoneLoss.Zone01FM,
      efficiency: zoneBulk.Zone01FM > 0 
        ? ((zoneIndiv.Zone01FM / zoneBulk.Zone01FM) * 100).toFixed(1) 
        : "0",
    },
    {
      name: "Zone 03A",
      bulk: zoneBulk.Zone03A,
      individual: zoneIndiv.Zone03A,
      loss: zoneLoss.Zone03A,
      efficiency: zoneBulk.Zone03A > 0 
        ? ((zoneIndiv.Zone03A / zoneBulk.Zone03A) * 100).toFixed(1) 
        : "0",
    },
    {
      name: "Zone 03B",
      bulk: zoneBulk.Zone03B,
      individual: zoneIndiv.Zone03B,
      loss: zoneLoss.Zone03B,
      efficiency: zoneBulk.Zone03B > 0 
        ? ((zoneIndiv.Zone03B / zoneBulk.Zone03B) * 100).toFixed(1) 
        : "0",
    },
    {
      name: "Zone 05",
      bulk: zoneBulk.Zone05,
      individual: zoneIndiv.Zone05,
      loss: zoneLoss.Zone05,
      efficiency: zoneBulk.Zone05 > 0 
        ? ((zoneIndiv.Zone05 / zoneBulk.Zone05) * 100).toFixed(1) 
        : "0",
    },
    {
      name: "Zone 08",
      bulk: zoneBulk.Zone08,
      individual: zoneIndiv.Zone08,
      loss: zoneLoss.Zone08,
      efficiency: zoneBulk.Zone08 > 0 
        ? ((zoneIndiv.Zone08 / zoneBulk.Zone08) * 100).toFixed(1) 
        : "0",
    },
    {
      name: "Zone VS",
      bulk: zoneBulk.ZoneVS,
      individual: zoneIndiv.ZoneVS,
      loss: zoneLoss.ZoneVS,
      efficiency: zoneBulk.ZoneVS > 0 
        ? ((zoneIndiv.ZoneVS / zoneBulk.ZoneVS) * 100).toFixed(1) 
        : "0",
    },
  ];
};

// Generate 3D flow data for bar chart
export const generate3DFlowData = (month: string) => {
  const summaryData = waterData.summary.find((m) => m.month === month);
  
  if (!summaryData) {
    return [];
  }
  
  return [
    { name: "Supply (L1)", value: summaryData.L1 },
    { name: "Distribution (L2)", value: summaryData.L2 },
    { name: "Consumption (L3)", value: summaryData.L3 },
  ];
};

// Generate direct connection breakdown data
export const generateDCBreakdownData = (month: string) => {
  const dcData = waterData.directConnection.find((m) => m.month === month);
  
  if (!dcData) {
    return [];
  }
  
  return [
    { name: "Direct Connection", value: dcData.DC },
    { name: "Irrigation", value: dcData.Irrigation },
    { name: "D-Building Common", value: dcData.DBuildingCommon },
    { name: "MB Common", value: dcData.MBCommon },
  ];
};

// Generate loss distribution data
export const generateLossDistributionData = (month: string) => {
  const summaryData = waterData.summary.find((m) => m.month === month);
  
  if (!summaryData) {
    return [];
  }
  
  return [
    { name: "Stage 01 Loss", value: summaryData.Stage01Loss },
    { name: "Stage 02 Loss", value: summaryData.Stage02Loss },
  ];
};

// Generate radar data
export const generateRadarData = (month: string) => {
  const zoneData = generateZonePerformanceData(month);
  
  return zoneData.map((zone) => ({
    subject: zone.name,
    efficiency: parseFloat(zone.efficiency),
    loss: (zone.loss / zone.bulk) * 100,
  }));
};

// Generate month options for filters
export const generateMonthOptions = () => {
  return waterData.summary.map((item) => ({
    label: item.month,
    value: item.month,
  }));
};

// Get all unique zone names
export const getZoneNames = () => {
  return [
    { label: "All Zones", value: "all" },
    { label: "Zone 01 FM", value: "Zone01FM" },
    { label: "Zone 03A", value: "Zone03A" },
    { label: "Zone 03B", value: "Zone03B" },
    { label: "Zone 05", value: "Zone05" },
    { label: "Zone 08", value: "Zone08" },
    { label: "Zone VS", value: "ZoneVS" },
  ];
};

// Get previous month data
export const getPreviousMonthData = (currentMonth: string) => {
  const currentIndex = waterData.summary.findIndex((m) => m.month === currentMonth);
  if (currentIndex <= 0) {
    return waterData.summary[0];
  }
  return waterData.summary[currentIndex - 1];
};