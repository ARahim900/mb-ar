// Data structure for water dashboard
export interface WaterSummary {
  month: string;
  L1: number;         // Supply
  L2: number;         // Distribution
  L3: number;         // Consumption
  Stage01Loss: number;
  Stage02Loss: number;
  TotalLoss: number;
}

export interface ZoneBulkMeter {
  month: string;
  Zone01FM: number;
  Zone03A: number;
  Zone03B: number;
  Zone05: number;
  Zone08: number;
  ZoneVS: number;
}

export interface DirectConnectionData {
  month: string;
  DC: number;
  Irrigation: number;
  DBuildingCommon: number;
  MBCommon: number;
}

export interface TotalMBToPay {
  month: string;
  value: number;
}

export interface WaterDataStructure {
  summary: WaterSummary[];
  zones: {
    bulkMeters: ZoneBulkMeter[];
    individual: ZoneBulkMeter[];
    loss: ZoneBulkMeter[];
  };
  directConnection: DirectConnectionData[];
  totalMBToPay: TotalMBToPay[];
}

// Sample data
export const waterData: WaterDataStructure = {
  summary: [
    { month: "Jan-24", L1: 32803, L2: 28689, L3: 25680, Stage01Loss: 4114, Stage02Loss: 3009, TotalLoss: 7123 },
    { month: "Feb-24", L1: 31205, L2: 27534, L3: 24560, Stage01Loss: 3671, Stage02Loss: 2974, TotalLoss: 6645 },
    { month: "Mar-24", L1: 33641, L2: 29587, L3: 26492, Stage01Loss: 4054, Stage02Loss: 3095, TotalLoss: 7149 },
    { month: "Apr-24", L1: 34892, L2: 30573, L3: 27465, Stage01Loss: 4319, Stage02Loss: 3108, TotalLoss: 7427 },
    { month: "May-24", L1: 36754, L2: 32145, L3: 28895, Stage01Loss: 4609, Stage02Loss: 3250, TotalLoss: 7859 },
    { month: "Jun-24", L1: 38205, L2: 33467, L3: 30126, Stage01Loss: 4738, Stage02Loss: 3341, TotalLoss: 8079 },
    { month: "Jul-24", L1: 39845, L2: 34934, L3: 31372, Stage01Loss: 4911, Stage02Loss: 3562, TotalLoss: 8473 },
    { month: "Aug-24", L1: 40236, L2: 35325, L3: 31783, Stage01Loss: 4911, Stage02Loss: 3542, TotalLoss: 8453 },
    { month: "Sep-24", L1: 38947, L2: 34215, L3: 30735, Stage01Loss: 4732, Stage02Loss: 3480, TotalLoss: 8212 },
    { month: "Oct-24", L1: 37645, L2: 33082, L3: 29685, Stage01Loss: 4563, Stage02Loss: 3397, TotalLoss: 7960 },
    { month: "Nov-24", L1: 35874, L2: 31534, L3: 28325, Stage01Loss: 4340, Stage02Loss: 3209, TotalLoss: 7549 },
    { month: "Dec-24", L1: 34526, L2: 30352, L3: 27245, Stage01Loss: 4174, Stage02Loss: 3107, TotalLoss: 7281 },
    { month: "Jan-25", L1: 33245, L2: 29285, L3: 26295, Stage01Loss: 3960, Stage02Loss: 2990, TotalLoss: 6950 },
    { month: "Feb-25", L1: 31875, L2: 28054, L3: 25206, Stage01Loss: 3821, Stage02Loss: 2848, TotalLoss: 6669 },
    { month: "Mar-25", L1: 34125, L2: 30095, L3: 27045, Stage01Loss: 4030, Stage02Loss: 3050, TotalLoss: 7080 },
    { month: "Apr-25", L1: 35462, L2: 31273, L3: 28090, Stage01Loss: 4189, Stage02Loss: 3183, TotalLoss: 7372 },
  ],
  
  zones: {
    bulkMeters: [
      { month: "Jan-24", Zone01FM: 1595, Zone03A: 1234, Zone03B: 2653, Zone05: 4286, Zone08: 2170, ZoneVS: 26 },
      { month: "Feb-24", Zone01FM: 1520, Zone03A: 1185, Zone03B: 2560, Zone05: 4125, Zone08: 2080, ZoneVS: 25 },
      { month: "Mar-24", Zone01FM: 1640, Zone03A: 1275, Zone03B: 2720, Zone05: 4390, Zone08: 2210, ZoneVS: 27 },
      { month: "Apr-24", Zone01FM: 1690, Zone03A: 1320, Zone03B: 2830, Zone05: 4550, Zone08: 2285, ZoneVS: 28 },
      { month: "May-24", Zone01FM: 1765, Zone03A: 1380, Zone03B: 2980, Zone05: 4780, Zone08: 2410, ZoneVS: 30 },
      { month: "Jun-24", Zone01FM: 1835, Zone03A: 1430, Zone03B: 3090, Zone05: 4970, Zone08: 2495, ZoneVS: 31 },
      { month: "Jul-24", Zone01FM: 1910, Zone03A: 1490, Zone03B: 3210, Zone05: 5180, Zone08: 2590, ZoneVS: 32 },
      { month: "Aug-24", Zone01FM: 1930, Zone03A: 1505, Zone03B: 3240, Zone05: 5225, Zone08: 2615, ZoneVS: 33 },
      { month: "Sep-24", Zone01FM: 1870, Zone03A: 1460, Zone03B: 3140, Zone05: 5055, Zone08: 2535, ZoneVS: 31 },
      { month: "Oct-24", Zone01FM: 1810, Zone03A: 1415, Zone03B: 3040, Zone05: 4905, Zone08: 2455, ZoneVS: 30 },
      { month: "Nov-24", Zone01FM: 1730, Zone03A: 1345, Zone03B: 2890, Zone05: 4650, Zone08: 2330, ZoneVS: 29 },
      { month: "Dec-24", Zone01FM: 1665, Zone03A: 1295, Zone03B: 2770, Zone05: 4460, Zone08: 2235, ZoneVS: 28 },
      { month: "Jan-25", Zone01FM: 1605, Zone03A: 1250, Zone03B: 2680, Zone05: 4320, Zone08: 2160, ZoneVS: 27 },
      { month: "Feb-25", Zone01FM: 1535, Zone03A: 1200, Zone03B: 2575, Zone05: 4145, Zone08: 2080, ZoneVS: 25 },
      { month: "Mar-25", Zone01FM: 1650, Zone03A: 1285, Zone03B: 2740, Zone05: 4410, Zone08: 2215, ZoneVS: 27 },
      { month: "Apr-25", Zone01FM: 1710, Zone03A: 1335, Zone03B: 2835, Zone05: 4570, Zone08: 2295, ZoneVS: 28 },
    ],
    
    individual: [
      { month: "Jan-24", Zone01FM: 1746, Zone03A: 1387, Zone03B: 1664, Zone05: 2172, Zone08: 1986, ZoneVS: 0 },
      { month: "Feb-24", Zone01FM: 1660, Zone03A: 1325, Zone03B: 1595, Zone05: 2075, Zone08: 1905, ZoneVS: 0 },
      { month: "Mar-24", Zone01FM: 1795, Zone03A: 1425, Zone03B: 1690, Zone05: 2230, Zone08: 2040, ZoneVS: 0 },
      { month: "Apr-24", Zone01FM: 1860, Zone03A: 1465, Zone03B: 1755, Zone05: 2320, Zone08: 2110, ZoneVS: 0 },
      { month: "May-24", Zone01FM: 1950, Zone03A: 1540, Zone03B: 1820, Zone05: 2425, Zone08: 2210, ZoneVS: 0 },
      { month: "Jun-24", Zone01FM: 2015, Zone03A: 1590, Zone03B: 1885, Zone05: 2520, Zone08: 2295, ZoneVS: 0 },
      { month: "Jul-24", Zone01FM: 2090, Zone03A: 1650, Zone03B: 1950, Zone05: 2625, Zone08: 2390, ZoneVS: 0 },
      { month: "Aug-24", Zone01FM: 2110, Zone03A: 1665, Zone03B: 1970, Zone05: 2645, Zone08: 2410, ZoneVS: 0 },
      { month: "Sep-24", Zone01FM: 2050, Zone03A: 1615, Zone03B: 1910, Zone05: 2560, Zone08: 2335, ZoneVS: 0 },
      { month: "Oct-24", Zone01FM: 1990, Zone03A: 1565, Zone03B: 1855, Zone05: 2485, Zone08: 2260, ZoneVS: 0 },
      { month: "Nov-24", Zone01FM: 1895, Zone03A: 1495, Zone03B: 1765, Zone05: 2365, Zone08: 2150, ZoneVS: 0 },
      { month: "Dec-24", Zone01FM: 1820, Zone03A: 1435, Zone03B: 1695, Zone05: 2270, Zone08: 2070, ZoneVS: 0 },
      { month: "Jan-25", Zone01FM: 1755, Zone03A: 1385, Zone03B: 1635, Zone05: 2190, Zone08: 1995, ZoneVS: 0 },
      { month: "Feb-25", Zone01FM: 1680, Zone03A: 1330, Zone03B: 1570, Zone05: 2095, Zone08: 1910, ZoneVS: 0 },
      { month: "Mar-25", Zone01FM: 1800, Zone03A: 1425, Zone03B: 1685, Zone05: 2240, Zone08: 2045, ZoneVS: 0 },
      { month: "Apr-25", Zone01FM: 1870, Zone03A: 1475, Zone03B: 1745, Zone05: 2325, Zone08: 2115, ZoneVS: 0 },
    ],
    
    loss: [
      { month: "Jan-24", Zone01FM: -151, Zone03A: -153, Zone03B: 989, Zone05: 2114, Zone08: 184, ZoneVS: 26 },
      { month: "Feb-24", Zone01FM: -140, Zone03A: -140, Zone03B: 965, Zone05: 2050, Zone08: 175, ZoneVS: 25 },
      { month: "Mar-24", Zone01FM: -155, Zone03A: -150, Zone03B: 1030, Zone05: 2160, Zone08: 170, ZoneVS: 27 },
      { month: "Apr-24", Zone01FM: -170, Zone03A: -145, Zone03B: 1075, Zone05: 2230, Zone08: 175, ZoneVS: 28 },
      { month: "May-24", Zone01FM: -185, Zone03A: -160, Zone03B: 1160, Zone05: 2355, Zone08: 200, ZoneVS: 30 },
      { month: "Jun-24", Zone01FM: -180, Zone03A: -160, Zone03B: 1205, Zone05: 2450, Zone08: 200, ZoneVS: 31 },
      { month: "Jul-24", Zone01FM: -180, Zone03A: -160, Zone03B: 1260, Zone05: 2555, Zone08: 200, ZoneVS: 32 },
      { month: "Aug-24", Zone01FM: -180, Zone03A: -160, Zone03B: 1270, Zone05: 2580, Zone08: 205, ZoneVS: 33 },
      { month: "Sep-24", Zone01FM: -180, Zone03A: -155, Zone03B: 1230, Zone05: 2495, Zone08: 200, ZoneVS: 31 },
      { month: "Oct-24", Zone01FM: -180, Zone03A: -150, Zone03B: 1185, Zone05: 2420, Zone08: 195, ZoneVS: 30 },
      { month: "Nov-24", Zone01FM: -165, Zone03A: -150, Zone03B: 1125, Zone05: 2285, Zone08: 180, ZoneVS: 29 },
      { month: "Dec-24", Zone01FM: -155, Zone03A: -140, Zone03B: 1075, Zone05: 2190, Zone08: 165, ZoneVS: 28 },
      { month: "Jan-25", Zone01FM: -150, Zone03A: -135, Zone03B: 1045, Zone05: 2130, Zone08: 165, ZoneVS: 27 },
      { month: "Feb-25", Zone01FM: -145, Zone03A: -130, Zone03B: 1005, Zone05: 2050, Zone08: 170, ZoneVS: 25 },
      { month: "Mar-25", Zone01FM: -150, Zone03A: -140, Zone03B: 1055, Zone05: 2170, Zone08: 170, ZoneVS: 27 },
      { month: "Apr-25", Zone01FM: -160, Zone03A: -140, Zone03B: 1090, Zone05: 2245, Zone08: 180, ZoneVS: 28 },
    ],
  },
  
  directConnection: [
    { month: "Jan-24", DC: 16725, Irrigation: 3800, DBuildingCommon: 78, MBCommon: 312 },
    { month: "Feb-24", DC: 16000, Irrigation: 3650, DBuildingCommon: 75, MBCommon: 295 },
    { month: "Mar-24", DC: 17150, Irrigation: 3900, DBuildingCommon: 80, MBCommon: 320 },
    { month: "Apr-24", DC: 17750, Irrigation: 4050, DBuildingCommon: 82, MBCommon: 332 },
    { month: "May-24", DC: 18650, Irrigation: 4250, DBuildingCommon: 86, MBCommon: 348 },
    { month: "Jun-24", DC: 19450, Irrigation: 4400, DBuildingCommon: 89, MBCommon: 362 },
    { month: "Jul-24", DC: 20250, Irrigation: 4600, DBuildingCommon: 93, MBCommon: 378 },
    { month: "Aug-24", DC: 20450, Irrigation: 4650, DBuildingCommon: 94, MBCommon: 382 },
    { month: "Sep-24", DC: 19800, Irrigation: 4500, DBuildingCommon: 91, MBCommon: 370 },
    { month: "Oct-24", DC: 19150, Irrigation: 4350, DBuildingCommon: 88, MBCommon: 358 },
    { month: "Nov-24", DC: 18250, Irrigation: 4150, DBuildingCommon: 84, MBCommon: 342 },
    { month: "Dec-24", DC: 17550, Irrigation: 4000, DBuildingCommon: 81, MBCommon: 328 },
    { month: "Jan-25", DC: 16950, Irrigation: 3850, DBuildingCommon: 78, MBCommon: 317 },
    { month: "Feb-25", DC: 16250, Irrigation: 3700, DBuildingCommon: 75, MBCommon: 304 },
    { month: "Mar-25", DC: 17350, Irrigation: 3950, DBuildingCommon: 80, MBCommon: 325 },
    { month: "Apr-25", DC: 18000, Irrigation: 4100, DBuildingCommon: 83, MBCommon: 337 },
  ],
  
  totalMBToPay: [
    { month: "Jan-24", value: 4190 },
    { month: "Feb-24", value: 4020 },
    { month: "Mar-24", value: 4295 },
    { month: "Apr-24", value: 4465 },
    { month: "May-24", value: 4685 },
    { month: "Jun-24", value: 4850 },
    { month: "Jul-24", value: 5070 },
    { month: "Aug-24", value: 5120 },
    { month: "Sep-24", value: 4960 },
    { month: "Oct-24", value: 4800 },
    { month: "Nov-24", value: 4570 },
    { month: "Dec-24", value: 4395 },
    { month: "Jan-25", value: 4245 },
    { month: "Feb-25", value: 4065 },
    { month: "Mar-25", value: 4350 },
    { month: "Apr-25", value: 4520 },
  ],
};