/**
 * Mock API Server
 * Provides realistic data for the application during development
 */

// KPIs
export const getKPIs = () => ({
  revenue: 8450000,
  profit: 1680000,
  yoy: 23.5,
  topModels: [
    { name: "Luxury Sedan", sales: 145 },
    { name: "Sport SUV", sales: 112 },
    { name: "Electric Coupe", sales: 89 },
  ],
});

// Branches with geo coordinates
export const getBranches = () => [
  { id: 1, name: "Downtown Showroom", lat: 40.7128, lng: -74.0060, sales: 245 },
  { id: 2, name: "North Branch", lat: 40.7589, lng: -73.9851, sales: 189 },
  { id: 3, name: "South Branch", lat: 40.6782, lng: -73.9442, sales: 156 },
  { id: 4, name: "East Branch", lat: 40.7282, lng: -73.7949, sales: 134 },
];

// Sales pipeline
export const getSalesPipeline = () => ({
  leads: [
    { id: 1, customer: "Alice Johnson", vehicle: "Luxury Sedan", value: 52000, stage: "inquiry", date: "2025-10-05" },
    { id: 2, customer: "Bob Smith", vehicle: "Sport SUV", value: 68000, stage: "test-drive", date: "2025-10-08" },
    { id: 3, customer: "Carol White", vehicle: "Electric Coupe", value: 75000, stage: "negotiation", date: "2025-10-10" },
  ],
  stages: ["inquiry", "test-drive", "negotiation", "closing"],
});

// Service jobs
export const getServiceJobs = () => [
  {
    id: 1,
    customer: "David Brown",
    vehicle: "2022 Sedan",
    service: "Full Service",
    bay: 1,
    status: "in-progress",
    progress: 65,
    eta: "14:30",
  },
  {
    id: 2,
    customer: "Emma Wilson",
    vehicle: "2023 SUV",
    service: "Oil Change",
    bay: 2,
    status: "completed",
    progress: 100,
    eta: "12:00",
  },
  {
    id: 3,
    customer: "Frank Miller",
    vehicle: "2021 Coupe",
    service: "Brake Service",
    bay: 3,
    status: "waiting",
    progress: 0,
    eta: "16:00",
  },
];

// Inventory
export const getInventory = () => [
  { id: 1, part: "Engine Oil 5W-30", sku: "EO-5W30-5L", stock: 145, reorder: 50, status: "healthy" },
  { id: 2, part: "Brake Pads (Front)", sku: "BP-FRT-001", stock: 32, reorder: 40, status: "low" },
  { id: 3, part: "Air Filter", sku: "AF-STD-002", stock: 89, reorder: 30, status: "healthy" },
  { id: 4, part: "Spark Plugs Set", sku: "SP-SET-004", stock: 8, reorder: 20, status: "critical" },
  { id: 5, part: "Coolant 1L", sku: "CL-1L-003", stock: 167, reorder: 50, status: "healthy" },
];

// Customers
export const getCustomers = () => [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "+1 234 567 8901",
    vehicles: ["2023 Luxury Sedan"],
    lastService: "2025-09-15",
    warranty: "Active",
    ltv: 125000,
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    phone: "+1 234 567 8902",
    vehicles: ["2022 Sport SUV", "2024 Electric Coupe"],
    lastService: "2025-10-01",
    warranty: "Active",
    ltv: 198000,
  },
];

// Charts data
export const getRevenueChart = () => ({
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
  data: [650000, 720000, 680000, 890000, 920000, 850000, 980000, 1050000, 1120000, 1180000],
});

export const getSalesbyCategory = () => [
  { name: "Sedan", value: 345 },
  { name: "SUV", value: 289 },
  { name: "Coupe", value: 156 },
  { name: "Electric", value: 98 },
];

// API adjustment
export const adjustInventory = (id: number, qty: number) => {
  const inventory = getInventory();
  const item = inventory.find((i) => i.id === id);
  if (item) {
    item.stock += qty;
    item.status = item.stock <= item.reorder ? (item.stock < item.reorder / 2 ? "critical" : "low") : "healthy";
  }
  return item;
};
