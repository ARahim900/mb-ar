// Material data types and mock data

export interface MaterialItem {
  id: string
  name: string
  category: string
  stockLevel: number
  minLevel: number
  unit: string
  unitCost: number
  totalValue: number
  location: string
  lastUpdated: string
  supplier: string
  status: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'On Order'
}

export interface MaterialDelivery {
  id: string
  poNumber: string
  supplier: string
  deliveryDate: string
  status: 'Pending' | 'In Transit' | 'Received' | 'Delayed' | 'Cancelled'
  items: {
    materialId: string
    materialName: string
    quantity: number
    unit: string
    unitCost: number
  }[]
  totalValue: number
  receivedBy?: string
  notes?: string
}

export interface MaterialRequest {
  id: string
  requestNumber: string
  requestedBy: string
  department: string
  requestDate: string
  requiredDate: string
  status: 'Pending' | 'Approved' | 'Rejected' | 'Fulfilled' | 'Cancelled'
  items: {
    materialId: string
    materialName: string
    quantity: number
    unit: string
    approved: boolean
  }[]
  priority: 'Low' | 'Medium' | 'High' | 'Critical'
  approvedBy?: string
  notes?: string
}

export interface MaterialStats {
  totalInventoryValue: number
  inventoryValueChange: number
  totalItems: number
  catalogItems: number
  itemsChange: number
  pendingOrders: number
  ordersChange: number
  lowStockItems: number
  lowStockChange: number
}

// Mock data for the Material Control Panel
export const materials: MaterialItem[] = [
  {
    id: "M001",
    name: "PVC Pipe (50mm)",
    category: "Plumbing",
    stockLevel: 45,
    minLevel: 20,
    unit: "m",
    unitCost: 3.5,
    totalValue: 157.5,
    location: "Warehouse A",
    lastUpdated: "2025-05-10",
    supplier: "Muscat Plumbing Supplies",
    status: "In Stock"
  },
  {
    id: "M002",
    name: "Copper Fitting (22mm)",
    category: "Plumbing",
    stockLevel: 120,
    minLevel: 50,
    unit: "pcs",
    unitCost: 2.75,
    totalValue: 330,
    location: "Warehouse A",
    lastUpdated: "2025-05-12",
    supplier: "Oman Metal Works",
    status: "In Stock"
  },
  {
    id: "M003",
    name: "Water Meter (Residential)",
    category: "Metering",
    stockLevel: 15,
    minLevel: 20,
    unit: "pcs",
    unitCost: 85.5,
    totalValue: 1282.5,
    location: "Secure Storage",
    lastUpdated: "2025-05-05",
    supplier: "Gulf Water Systems",
    status: "Low Stock"
  },
  {
    id: "M004",
    name: "Pressure Gauge (0-10 bar)",
    category: "Instrumentation",
    stockLevel: 28,
    minLevel: 10,
    unit: "pcs",
    unitCost: 32.8,
    totalValue: 918.4,
    location: "Warehouse B",
    lastUpdated: "2025-05-08",
    supplier: "Precision Instruments LLC",
    status: "In Stock"
  },
  {
    id: "M005",
    name: "Gate Valve (100mm)",
    category: "Valves",
    stockLevel: 0,
    minLevel: 5,
    unit: "pcs",
    unitCost: 145.6,
    totalValue: 0,
    location: "Warehouse B",
    lastUpdated: "2025-04-25",
    supplier: "Muscat Plumbing Supplies",
    status: "Out of Stock"
  },
  {
    id: "M006",
    name: "Check Valve (75mm)",
    category: "Valves",
    stockLevel: 8,
    minLevel: 5,
    unit: "pcs",
    unitCost: 120.25,
    totalValue: 962,
    location: "Warehouse B",
    lastUpdated: "2025-05-02",
    supplier: "Gulf Water Systems",
    status: "In Stock"
  },
  {
    id: "M007",
    name: "HDPE Pipe (110mm)",
    category: "Piping",
    stockLevel: 180,
    minLevel: 100,
    unit: "m",
    unitCost: 12.8,
    totalValue: 2304,
    location: "Yard Storage",
    lastUpdated: "2025-05-15",
    supplier: "Oman Pipes International",
    status: "In Stock"
  },
  {
    id: "M008",
    name: "Flow Meter (Digital)",
    category: "Metering",
    stockLevel: 3,
    minLevel: 5,
    unit: "pcs",
    unitCost: 425.5,
    totalValue: 1276.5,
    location: "Secure Storage",
    lastUpdated: "2025-04-28",
    supplier: "Smart Water Solutions",
    status: "Low Stock"
  },
  {
    id: "M009",
    name: "Chlorine Dosing Pump",
    category: "Treatment",
    stockLevel: 4,
    minLevel: 2,
    unit: "pcs",
    unitCost: 780.25,
    totalValue: 3121,
    location: "Warehouse C",
    lastUpdated: "2025-05-03",
    supplier: "Water Treatment Specialists",
    status: "In Stock"
  },
  {
    id: "M010",
    name: "Water Testing Kit",
    category: "Laboratory",
    stockLevel: 12,
    minLevel: 8,
    unit: "sets",
    unitCost: 145.8,
    totalValue: 1749.6,
    location: "Laboratory Storage",
    lastUpdated: "2025-05-10",
    supplier: "Aqua Lab Supplies",
    status: "In Stock"
  },
  {
    id: "M011",
    name: "pH Sensor",
    category: "Instrumentation",
    stockLevel: 5,
    minLevel: 5,
    unit: "pcs",
    unitCost: 210.5,
    totalValue: 1052.5,
    location: "Laboratory Storage",
    lastUpdated: "2025-05-07",
    supplier: "Precision Instruments LLC",
    status: "In Stock"
  },
  {
    id: "M012",
    name: "Filter Cartridge (5 micron)",
    category: "Filtration",
    stockLevel: 85,
    minLevel: 50,
    unit: "pcs",
    unitCost: 18.75,
    totalValue: 1593.75,
    location: "Warehouse A",
    lastUpdated: "2025-05-12",
    supplier: "Aqua Lab Supplies",
    status: "In Stock"
  }
];

export const deliveries: MaterialDelivery[] = [
  {
    id: "D001",
    poNumber: "PO-2025-0142",
    supplier: "Muscat Plumbing Supplies",
    deliveryDate: "2025-05-22",
    status: "In Transit",
    items: [
      {
        materialId: "M001",
        materialName: "PVC Pipe (50mm)",
        quantity: 100,
        unit: "m",
        unitCost: 3.5
      },
      {
        materialId: "M005",
        materialName: "Gate Valve (100mm)",
        quantity: 10,
        unit: "pcs",
        unitCost: 145.6
      }
    ],
    totalValue: 1806.0
  },
  {
    id: "D002",
    poNumber: "PO-2025-0138",
    supplier: "Smart Water Solutions",
    deliveryDate: "2025-05-25",
    status: "Pending",
    items: [
      {
        materialId: "M008",
        materialName: "Flow Meter (Digital)",
        quantity: 5,
        unit: "pcs",
        unitCost: 425.5
      }
    ],
    totalValue: 2127.5
  },
  {
    id: "D003",
    poNumber: "PO-2025-0136",
    supplier: "Gulf Water Systems",
    deliveryDate: "2025-05-18",
    status: "Received",
    items: [
      {
        materialId: "M003",
        materialName: "Water Meter (Residential)",
        quantity: 20,
        unit: "pcs",
        unitCost: 85.5
      },
      {
        materialId: "M006",
        materialName: "Check Valve (75mm)",
        quantity: 5,
        unit: "pcs",
        unitCost: 120.25
      }
    ],
    totalValue: 2311.25,
    receivedBy: "Ahmed Al Balushi",
    notes: "All items received in good condition"
  },
  {
    id: "D004",
    poNumber: "PO-2025-0145",
    supplier: "Oman Pipes International",
    deliveryDate: "2025-05-28",
    status: "Pending",
    items: [
      {
        materialId: "M007",
        materialName: "HDPE Pipe (110mm)",
        quantity: 200,
        unit: "m",
        unitCost: 12.8
      }
    ],
    totalValue: 2560.0
  },
  {
    id: "D005",
    poNumber: "PO-2025-0144",
    supplier: "Precision Instruments LLC",
    deliveryDate: "2025-05-15",
    status: "Delayed",
    items: [
      {
        materialId: "M004",
        materialName: "Pressure Gauge (0-10 bar)",
        quantity: 15,
        unit: "pcs",
        unitCost: 32.8
      },
      {
        materialId: "M011",
        materialName: "pH Sensor",
        quantity: 8,
        unit: "pcs",
        unitCost: 210.5
      }
    ],
    totalValue: 2175.2,
    notes: "Supplier informed of delay due to shipping issues"
  }
];

export const requests: MaterialRequest[] = [
  {
    id: "R001",
    requestNumber: "REQ-2025-0078",
    requestedBy: "Sara Al Habsi",
    department: "Operations",
    requestDate: "2025-05-17",
    requiredDate: "2025-05-24",
    status: "Approved",
    items: [
      {
        materialId: "M001",
        materialName: "PVC Pipe (50mm)",
        quantity: 30,
        unit: "m",
        approved: true
      },
      {
        materialId: "M002",
        materialName: "Copper Fitting (22mm)",
        quantity: 25,
        unit: "pcs",
        approved: true
      }
    ],
    priority: "Medium",
    approvedBy: "Mohammed Al Farsi",
    notes: "For zone 3B maintenance work"
  },
  {
    id: "R002",
    requestNumber: "REQ-2025-0082",
    requestedBy: "Khalid Al Kindi",
    department: "Maintenance",
    requestDate: "2025-05-18",
    requiredDate: "2025-05-19",
    status: "Fulfilled",
    items: [
      {
        materialId: "M004",
        materialName: "Pressure Gauge (0-10 bar)",
        quantity: 2,
        unit: "pcs",
        approved: true
      },
      {
        materialId: "M006",
        materialName: "Check Valve (75mm)",
        quantity: 1,
        unit: "pcs",
        approved: true
      }
    ],
    priority: "Critical",
    approvedBy: "Mohammed Al Farsi",
    notes: "Emergency repair at Zone 5 pump station"
  },
  {
    id: "R003",
    requestNumber: "REQ-2025-0085",
    requestedBy: "Fatma Al Lawati",
    department: "Laboratory",
    requestDate: "2025-05-19",
    requiredDate: "2025-05-26",
    status: "Pending",
    items: [
      {
        materialId: "M010",
        materialName: "Water Testing Kit",
        quantity: 5,
        unit: "sets",
        approved: false
      },
      {
        materialId: "M012",
        materialName: "Filter Cartridge (5 micron)",
        quantity: 20,
        unit: "pcs",
        approved: false
      }
    ],
    priority: "Low",
    notes: "Regular monthly stock for water quality testing"
  },
  {
    id: "R004",
    requestNumber: "REQ-2025-0087",
    requestedBy: "Anwar Al Zadjali",
    department: "Projects",
    requestDate: "2025-05-20",
    requiredDate: "2025-05-30",
    status: "Pending",
    items: [
      {
        materialId: "M007",
        materialName: "HDPE Pipe (110mm)",
        quantity: 150,
        unit: "m",
        approved: false
      },
      {
        materialId: "M003",
        materialName: "Water Meter (Residential)",
        quantity: 10,
        unit: "pcs",
        approved: false
      },
      {
        materialId: "M008",
        materialName: "Flow Meter (Digital)",
        quantity: 2,
        unit: "pcs",
        approved: false
      }
    ],
    priority: "High",
    notes: "For new connection project in Zone 8 expansion"
  }
];

export const materialStatsData: MaterialStats = {
  totalInventoryValue: 14747.75, // Sum of all material values
  inventoryValueChange: 8.2, // % change from previous month
  totalItems: 12, // Number of distinct materials
  catalogItems: 15, // Total catalog items
  itemsChange: 0, // % change from previous month
  pendingOrders: 3, // Number of pending deliveries
  ordersChange: -25, // % change from previous month
  lowStockItems: 3, // Number of items with low stock
  lowStockChange: 50 // % change from previous month
};

// Categories for filtering
export const materialCategories = [
  'All Categories',
  'Plumbing',
  'Metering',
  'Instrumentation',
  'Valves',
  'Piping',
  'Treatment',
  'Laboratory',
  'Filtration'
];

// Location options
export const storageLocations = [
  'All Locations',
  'Warehouse A',
  'Warehouse B',
  'Warehouse C',
  'Secure Storage',
  'Laboratory Storage',
  'Yard Storage'
];

// Status options
export const stockStatuses = [
  'All Statuses',
  'In Stock',
  'Low Stock',
  'Out of Stock',
  'On Order'
];
