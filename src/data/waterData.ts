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

// Water consumption data from 2024-2025
export const waterData: WaterDataStructure = {
  summary: [
    { month: "Jan-24", L1: 32803, L2: 11964, L3: 25680, Stage01Loss: 20839, Stage02Loss: -13716, TotalLoss: 7123 },
    { month: "Feb-24", L1: 27996, L2: 10292, L3: 21901, Stage01Loss: 17704, Stage02Loss: -11609, TotalLoss: 6095 },
    { month: "Mar-24", L1: 23860, L2: 11087, L3: 19626, Stage01Loss: 12773, Stage02Loss: -8539, TotalLoss: 4234 },
    { month: "Apr-24", L1: 31869, L2: 13380, L3: 23584, Stage01Loss: 18489, Stage02Loss: -10204, TotalLoss: 8285 },
    { month: "May-24", L1: 30737, L2: 11785, L3: 23692, Stage01Loss: 18952, Stage02Loss: -11907, TotalLoss: 7045 },
    { month: "Jun-24", L1: 41953, L2: 15699, L3: 27865, Stage01Loss: 26254, Stage02Loss: -12166, TotalLoss: 14088 },
    { month: "Jul-24", L1: 35166, L2: 18370, L3: 25961, Stage01Loss: 16796, Stage02Loss: -7591, TotalLoss: 9205 },
    { month: "Aug-24", L1: 35420, L2: 16401, L3: 25245, Stage01Loss: 19019, Stage02Loss: -8844, TotalLoss: 10175 },
    { month: "Sep-24", L1: 41341, L2: 14818, L3: 23744, Stage01Loss: 26523, Stage02Loss: -8926, TotalLoss: 17597 },
    { month: "Oct-24", L1: 31519, L2: 16461, L3: 30881, Stage01Loss: 15058, Stage02Loss: -14420, TotalLoss: 638 },
    { month: "Nov-24", L1: 35290, L2: 13045, L3: 24792, Stage01Loss: 22245, Stage02Loss: -11747, TotalLoss: 10498 },
    { month: "Dec-24", L1: 36733, L2: 16148, L3: 24545, Stage01Loss: 20585, Stage02Loss: -8397, TotalLoss: 12188 },
    { month: "Jan-25", L1: 32580, L2: 15403, L3: 29126, Stage01Loss: 17177, Stage02Loss: -13723, TotalLoss: 3454 },
    { month: "Feb-25", L1: 44043, L2: 14784, L3: 29557, Stage01Loss: 29259, Stage02Loss: -14773, TotalLoss: 14486 },
    { month: "Mar-25", L1: 34915, L2: 15327, L3: 33468, Stage01Loss: 19588, Stage02Loss: -18141, TotalLoss: 1447 },
    { month: "Apr-25", L1: 46039, L2: 15098, L3: 38905, Stage01Loss: 30941, Stage02Loss: -23807, TotalLoss: 7134 },
  ],
  
  zones: {
    bulkMeters: [
      { month: "Jan-24", Zone01FM: 2654, Zone03A: 1956, Zone03B: 1836, Zone05: 2235, Zone08: 1637, ZoneVS: 1646 },
      { month: "Feb-24", Zone01FM: 2204, Zone03A: 1635, Zone03B: 1650, Zone05: 1939, Zone08: 1418, ZoneVS: 1446 },
      { month: "Mar-24", Zone01FM: 2414, Zone03A: 1712, Zone03B: 1762, Zone05: 2147, Zone08: 1517, ZoneVS: 1535 },
      { month: "Apr-24", Zone01FM: 2761, Zone03A: 2208, Zone03B: 2047, Zone05: 2641, Zone08: 1942, ZoneVS: 1781 },
      { month: "May-24", Zone01FM: 2454, Zone03A: 1905, Zone03B: 1866, Zone05: 2318, Zone08: 1682, ZoneVS: 1560 },
      { month: "Jun-24", Zone01FM: 3303, Zone03A: 2567, Zone03B: 2446, Zone05: 3064, Zone08: 2241, ZoneVS: 2078 },
      { month: "Jul-24", Zone01FM: 3811, Zone03A: 3069, Zone03B: 2827, Zone05: 3655, Zone08: 2647, ZoneVS: 2361 },
      { month: "Aug-24", Zone01FM: 3582, Zone03A: 2714, Zone03B: 2539, Zone05: 3122, Zone08: 2303, ZoneVS: 2141 },
      { month: "Sep-24", Zone01FM: 3227, Zone03A: 2405, Zone03B: 2331, Zone05: 2905, Zone08: 2134, ZoneVS: 1816 },
      { month: "Oct-24", Zone01FM: 3459, Zone03A: 2747, Zone03B: 2598, Zone05: 3249, Zone08: 2379, ZoneVS: 2029 },
      { month: "Nov-24", Zone01FM: 2814, Zone03A: 2115, Zone03B: 2032, Zone05: 2567, Zone08: 1873, ZoneVS: 1644 },
      { month: "Dec-24", Zone01FM: 3393, Zone03A: 2698, Zone03B: 2479, Zone05: 3092, Zone08: 2320, ZoneVS: 2166 },
      { month: "Jan-25", Zone01FM: 2832, Zone03A: 2529, Zone03B: 2459, Zone05: 3019, Zone08: 2196, ZoneVS: 2368 },
      { month: "Feb-25", Zone01FM: 2748, Zone03A: 2307, Zone03B: 2469, Zone05: 2959, Zone08: 2143, ZoneVS: 2158 },
      { month: "Mar-25", Zone01FM: 2929, Zone03A: 2370, Zone03B: 2621, Zone05: 3038, Zone08: 2120, ZoneVS: 2249 },
      { month: "Apr-25", Zone01FM: 2854, Zone03A: 2464, Zone03B: 2624, Zone05: 3095, Zone08: 2108, ZoneVS: 1953 },
    ],
    
    individual: [
      { month: "Jan-24", Zone01FM: 5472, Zone03A: 4232, Zone03B: 3901, Zone05: 4873, Zone08: 3572, ZoneVS: 3630 },
      { month: "Feb-24", Zone01FM: 4685, Zone03A: 3569, Zone03B: 3317, Zone05: 4147, Zone08: 3033, ZoneVS: 3150 },
      { month: "Mar-24", Zone01FM: 4286, Zone03A: 3148, Zone03B: 2963, Zone05: 3763, Zone08: 2729, ZoneVS: 2737 },
      { month: "Apr-24", Zone01FM: 5212, Zone03A: 3740, Zone03B: 3539, Zone05: 4443, Zone08: 3253, ZoneVS: 3397 },
      { month: "May-24", Zone01FM: 5121, Zone03A: 3783, Zone03B: 3589, Zone05: 4534, Zone08: 3314, ZoneVS: 3351 },
      { month: "Jun-24", Zone01FM: 6235, Zone03A: 4423, Zone03B: 4222, Zone05: 5261, Zone08: 3991, ZoneVS: 3733 },
      { month: "Jul-24", Zone01FM: 5635, Zone03A: 4209, Zone03B: 3989, Zone05: 4865, Zone08: 3657, ZoneVS: 3606 },
      { month: "Aug-24", Zone01FM: 5474, Zone03A: 4128, Zone03B: 3885, Zone05: 4684, Zone08: 3525, ZoneVS: 3549 },
      { month: "Sep-24", Zone01FM: 5153, Zone03A: 3806, Zone03B: 3621, Zone05: 4459, Zone08: 3260, ZoneVS: 3445 },
      { month: "Oct-24", Zone01FM: 6627, Zone03A: 5030, Zone03B: 4673, Zone05: 5733, Zone08: 4309, ZoneVS: 4509 },
      { month: "Nov-24", Zone01FM: 5290, Zone03A: 3986, Zone03B: 3740, Zone05: 4660, Zone08: 3466, ZoneVS: 3650 },
      { month: "Dec-24", Zone01FM: 5200, Zone03A: 3938, Zone03B: 3715, Zone05: 4638, Zone08: 3435, ZoneVS: 3619 },
      { month: "Jan-25", Zone01FM: 6232, Zone03A: 4728, Zone03B: 4468, Zone05: 5528, Zone08: 4108, ZoneVS: 4062 },
      { month: "Feb-25", Zone01FM: 6354, Zone03A: 4844, Zone03B: 4521, Zone05: 5582, Zone08: 4102, ZoneVS: 4154 },
      { month: "Mar-25", Zone01FM: 7130, Zone03A: 5493, Zone03B: 5146, Zone05: 6339, Zone08: 4616, ZoneVS: 4744 },
      { month: "Apr-25", Zone01FM: 8319, Zone03A: 6412, Zone03B: 5961, Zone05: 7366, Zone08: 5329, ZoneVS: 5518 },
    ],
    
    loss: [
      { month: "Jan-24", Zone01FM: -2818, Zone03A: -2276, Zone03B: -2065, Zone05: -2638, Zone08: -1935, ZoneVS: -1984 },
      { month: "Feb-24", Zone01FM: -2481, Zone03A: -1934, Zone03B: -1667, Zone05: -2208, Zone08: -1615, ZoneVS: -1704 },
      { month: "Mar-24", Zone01FM: -1872, Zone03A: -1436, Zone03B: -1201, Zone05: -1616, Zone08: -1212, ZoneVS: -1202 },
      { month: "Apr-24", Zone01FM: -2451, Zone03A: -1532, Zone03B: -1492, Zone05: -1802, Zone08: -1311, ZoneVS: -1616 },
      { month: "May-24", Zone01FM: -2667, Zone03A: -1878, Zone03B: -1723, Zone05: -2216, Zone08: -1632, ZoneVS: -1791 },
      { month: "Jun-24", Zone01FM: -2932, Zone03A: -1856, Zone03B: -1776, Zone05: -2197, Zone08: -1750, ZoneVS: -1655 },
      { month: "Jul-24", Zone01FM: -1824, Zone03A: -1140, Zone03B: -1162, Zone05: -1210, Zone08: -1010, ZoneVS: -1245 },
      { month: "Aug-24", Zone01FM: -1892, Zone03A: -1414, Zone03B: -1346, Zone05: -1562, Zone08: -1222, ZoneVS: -1408 },
      { month: "Sep-24", Zone01FM: -1926, Zone03A: -1401, Zone03B: -1290, Zone05: -1554, Zone08: -1126, ZoneVS: -1629 },
      { month: "Oct-24", Zone01FM: -3168, Zone03A: -2283, Zone03B: -2075, Zone05: -2484, Zone08: -1930, ZoneVS: -2480 },
      { month: "Nov-24", Zone01FM: -2476, Zone03A: -1871, Zone03B: -1708, Zone05: -2093, Zone08: -1593, ZoneVS: -2006 },
      { month: "Dec-24", Zone01FM: -1807, Zone03A: -1240, Zone03B: -1236, Zone05: -1546, Zone08: -1115, ZoneVS: -1453 },
      { month: "Jan-25", Zone01FM: -3400, Zone03A: -2199, Zone03B: -2009, Zone05: -2509, Zone08: -1912, ZoneVS: -1694 },
      { month: "Feb-25", Zone01FM: -3606, Zone03A: -2537, Zone03B: -2052, Zone05: -2623, Zone08: -1959, ZoneVS: -1996 },
      { month: "Mar-25", Zone01FM: -4201, Zone03A: -3123, Zone03B: -2525, Zone05: -3301, Zone08: -2496, ZoneVS: -2495 },
      { month: "Apr-25", Zone01FM: -5465, Zone03A: -3948, Zone03B: -3337, Zone05: -4271, Zone08: -3221, ZoneVS: -3565 },
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