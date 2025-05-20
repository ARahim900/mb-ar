// This file contains the processed water meter data from the CSV
export interface MeterData {
  meterLabel: string;
  zone: string;
  type: string;
  parentMeter: string;
  accountNumber: string;
  readings: {
    jan: number;
    feb: number;
    mar: number;
    apr: number;
  };
}

export interface ZoneData {
  id: string;
  label: string;
  meters: MeterData[];
}

// Process and organize the CSV data by zones
export const waterMetersData: ZoneData[] = [
  {
    id: "main_bulk",
    label: "Main Bulk (NAMA)",
    meters: [
      {
        meterLabel: "Main Bulk (NAMA)",
        zone: "Main Bulk",
        type: "Main BULK",
        parentMeter: "NAMA",
        accountNumber: "C43659",
        readings: {
          jan: 32580,
          feb: 44043,
          mar: 34915,
          apr: 46039
        }
      },
      {
        meterLabel: "Irrigation Tank 04 - (Z08)",
        zone: "Direct Connection",
        type: "IRR_Servies",
        parentMeter: "Main Bulk (NAMA)",
        accountNumber: "4300294",
        readings: {
          jan: 0,
          feb: 0,
          mar: 0,
          apr: 0
        }
      },
      {
        meterLabel: "Sales Center Common Building",
        zone: "Direct Connection",
        type: "Zone Bulk",
        parentMeter: "Main Bulk (NAMA)",
        accountNumber: "4300295",
        readings: {
          jan: 76,
          feb: 68,
          mar: 37,
          apr: 67
        }
      },
      {
        meterLabel: "Building (Security)",
        zone: "Direct Connection",
        type: "MB_Common",
        parentMeter: "Main Bulk (NAMA)",
        accountNumber: "4300297",
        readings: {
          jan: 17,
          feb: 18,
          mar: 13,
          apr: 16
        }
      },
      {
        meterLabel: "Building (ROP)",
        zone: "Direct Connection",
        type: "MB_Common",
        parentMeter: "Main Bulk (NAMA)",
        accountNumber: "4300299",
        readings: {
          jan: 23,
          feb: 21,
          mar: 19,
          apr: 20
        }
      },
      {
        meterLabel: "Hotel Main Building",
        zone: "Direct Connection",
        type: "Retail",
        parentMeter: "Main Bulk (NAMA)",
        accountNumber: "4300334",
        readings: {
          jan: 18048,
          feb: 19482,
          mar: 22151,
          apr: 27676
        }
      },
      {
        meterLabel: "Village Square (Zone Bulk)",
        zone: "Zone_VS",
        type: "Zone Bulk",
        parentMeter: "Main Bulk (NAMA)",
        accountNumber: "4300335",
        readings: {
          jan: 14,
          feb: 12,
          mar: 21,
          apr: 13
        }
      }
    ]
  },
  {
    id: "zone_01_fm",
    label: "Zone_01_(FM)",
    meters: [
      {
        meterLabel: "ZONE FM (BULK ZONE FM)",
        zone: "Zone_01_(FM)",
        type: "Zone Bulk",
        parentMeter: "Main Bulk (NAMA)",
        accountNumber: "4300346",
        readings: {
          jan: 2008,
          feb: 1740,
          mar: 1880,
          apr: 1880
        }
      },
      {
        meterLabel: "Building FM",
        zone: "Zone_01_(FM)",
        type: "MB_Common",
        parentMeter: "ZONE FM (BULK ZONE FM)",
        accountNumber: "4300296",
        readings: {
          jan: 37,
          feb: 39,
          mar: 49,
          apr: 40
        }
      },
      {
        meterLabel: "Building Taxi",
        zone: "Zone_01_(FM)",
        type: "Retail",
        parentMeter: "ZONE FM (BULK ZONE FM)",
        accountNumber: "4300298",
        readings: {
          jan: 11,
          feb: 16,
          mar: 12,
          apr: 14
        }
      },
      {
        meterLabel: "Building B1",
        zone: "Zone_01_(FM)",
        type: "Retail",
        parentMeter: "ZONE FM (BULK ZONE FM)",
        accountNumber: "4300300",
        readings: {
          jan: 228,
          feb: 225,
          mar: 235,
          apr: 253
        }
      },
      {
        meterLabel: "Building B2",
        zone: "Zone_01_(FM)",
        type: "Retail",
        parentMeter: "ZONE FM (BULK ZONE FM)",
        accountNumber: "4300301",
        readings: {
          jan: 236,
          feb: 213,
          mar: 202,
          apr: 187
        }
      },
      {
        meterLabel: "Building B3",
        zone: "Zone_01_(FM)",
        type: "Retail",
        parentMeter: "ZONE FM (BULK ZONE FM)",
        accountNumber: "4300302",
        readings: {
          jan: 169,
          feb: 165,
          mar: 132,
          apr: 134
        }
      }
    ]
  },
  {
    id: "zone_03_a",
    label: "Zone_03_(A)",
    meters: [
      {
        meterLabel: "ZONE 3A (BULK ZONE 3A)",
        zone: "Zone_03_(A)",
        type: "Zone Bulk",
        parentMeter: "Main Bulk (NAMA)",
        accountNumber: "4300343",
        readings: {
          jan: 4235,
          feb: 4273,
          mar: 3591,
          apr: 4041
        }
      },
      {
        meterLabel: "Z3-44(1A) (Building)",
        zone: "Zone_03_(A)",
        type: "Residential (Apart)",
        parentMeter: "D-44 Building Bulk Meter",
        accountNumber: "4300030",
        readings: {
          jan: 11,
          feb: 11,
          mar: 10,
          apr: 6
        }
      },
      {
        meterLabel: "Z3-44(1B) (Building)",
        zone: "Zone_03_(A)",
        type: "Residential (Apart)",
        parentMeter: "D-44 Building Bulk Meter",
        accountNumber: "4300031",
        readings: {
          jan: 0,
          feb: 0,
          mar: 0,
          apr: 0
        }
      },
      {
        meterLabel: "Z3-44(2A) (Building)",
        zone: "Zone_03_(A)",
        type: "Residential (Apart)",
        parentMeter: "D-44 Building Bulk Meter",
        accountNumber: "4300032",
        readings: {
          jan: 9,
          feb: 3,
          mar: 5,
          apr: 10
        }
      }
    ]
  },
  {
    id: "zone_03_b",
    label: "Zone_03_(B)",
    meters: [
      {
        meterLabel: "ZONE 3B (BULK ZONE 3B)",
        zone: "Zone_03_(B)",
        type: "Zone Bulk",
        parentMeter: "Main Bulk (NAMA)",
        accountNumber: "4300344",
        readings: {
          jan: 3256,
          feb: 2962,
          mar: 3331,
          apr: 2157
        }
      },
      {
        meterLabel: "Z3-52(6) (Building)",
        zone: "Zone_03_(B)",
        type: "Residential (Apart)",
        parentMeter: "D-52 Building Bulk Meter",
        accountNumber: "4300008",
        readings: {
          jan: 10,
          feb: 9,
          mar: 9,
          apr: 14
        }
      },
      {
        meterLabel: "Z3-52(4A) (Building)",
        zone: "Zone_03_(B)",
        type: "Residential (Apart)",
        parentMeter: "D-52 Building Bulk Meter",
        accountNumber: "4300029",
        readings: {
          jan: 0,
          feb: 0,
          mar: 0,
          apr: 0
        }
      }
    ]
  },
  {
    id: "zone_05",
    label: "Zone_05",
    meters: [
      {
        meterLabel: "ZONE 5 (BULK ZONE 5)",
        zone: "Zone_05",
        type: "Zone Bulk",
        parentMeter: "Main Bulk (NAMA)",
        accountNumber: "4300345",
        readings: {
          jan: 4267,
          feb: 4231,
          mar: 3862,
          apr: 3737
        }
      },
      {
        meterLabel: "Z5-17",
        zone: "Zone_05",
        type: "Residential (Villa)",
        parentMeter: "ZONE 5 (Bulk Zone 5)",
        accountNumber: "4300001",
        readings: {
          jan: 112,
          feb: 80,
          mar: 81,
          apr: 90
        }
      },
      {
        meterLabel: "Z5-13",
        zone: "Zone_05",
        type: "Residential (Villa)",
        parentMeter: "ZONE 5 (Bulk Zone 5)",
        accountNumber: "4300058",
        readings: {
          jan: 72,
          feb: 106,
          mar: 89,
          apr: 120
        }
      }
    ]
  },
  {
    id: "zone_08",
    label: "Zone_08",
    meters: [
      {
        meterLabel: "ZONE 8 (BULK ZONE 8)",
        zone: "Zone_08",
        type: "Zone Bulk",
        parentMeter: "Main Bulk (NAMA)",
        accountNumber: "4300342",
        readings: {
          jan: 1547,
          feb: 1498,
          mar: 2605,
          apr: 3203
        }
      },
      {
        meterLabel: "Z8-11",
        zone: "Zone_08",
        type: "Residential (Villa)",
        parentMeter: "BULK ZONE 8",
        accountNumber: "4300023",
        readings: {
          jan: 0,
          feb: 1,
          mar: 0,
          apr: 0
        }
      },
      {
        meterLabel: "Z8-13",
        zone: "Zone_08",
        type: "Residential (Villa)",
        parentMeter: "BULK ZONE 8",
        accountNumber: "4300024",
        readings: {
          jan: 0,
          feb: 0,
          mar: 0,
          apr: 0
        }
      }
    ]
  },
  {
    id: "zone_vs",
    label: "Zone_VS",
    meters: [
      {
        meterLabel: "Village Square (Zone Bulk)",
        zone: "Zone_VS",
        type: "Zone Bulk",
        parentMeter: "Main Bulk (NAMA)",
        accountNumber: "4300335",
        readings: {
          jan: 14,
          feb: 12,
          mar: 21,
          apr: 13
        }
      },
      {
        meterLabel: "Irrigation Tank - VS",
        zone: "Zone_VS",
        type: "IRR_Servies",
        parentMeter: "Village Square (Zone Bulk)",
        accountNumber: "4300326",
        readings: {
          jan: 0,
          feb: 0,
          mar: 0,
          apr: 0
        }
      },
      {
        meterLabel: "Coffee 1 (GF Shop No.591)",
        zone: "Zone_VS",
        type: "Retail",
        parentMeter: "Village Square (Zone Bulk)",
        accountNumber: "4300327",
        readings: {
          jan: 0,
          feb: 0,
          mar: 3,
          apr: -3
        }
      }
    ]
  }
];

// Function to get meters by zone
export const getMetersByZone = (zoneId: string): MeterData[] => {
  const zone = waterMetersData.find(zone => zone.id === zoneId);
  return zone ? zone.meters : [];
};

// Function to get zone data by zone ID
export const getZoneData = (zoneId: string): ZoneData | undefined => {
  return waterMetersData.find(zone => zone.id === zoneId);
};

// Function to get all zone types
export const getZoneTypes = (): string[] => {
  const types = new Set<string>();
  waterMetersData.forEach(zone => {
    zone.meters.forEach(meter => {
      types.add(meter.type);
    });
  });
  return Array.from(types).sort();
};

// Function to calculate zone total consumption for a month
export const calculateZoneTotalConsumption = (zoneId: string, month: 'jan' | 'feb' | 'mar' | 'apr'): number => {
  const meters = getMetersByZone(zoneId);
  return meters.reduce((total, meter) => total + meter.readings[month], 0);
};

// Function to find primary bulk meter for a zone
export const getZoneBulkMeter = (zoneId: string): MeterData | undefined => {
  const meters = getMetersByZone(zoneId);
  return meters.find(meter => meter.type === 'Zone Bulk' || meter.type === 'Main BULK');
};
