// Mock data for development
export const mockInventory = [
  {
    id: 1,
    vendorId: 1,
    vendorName: "Green Valley Farms",
    type: "Hass",
    caliber: "48",
    quantityBoxes: 500,
    pricePerBox: 45.00,
    location: "California, USA",
    harvestDate: "2024-01-15"
  },
  {
    id: 2,
    vendorId: 1,
    vendorName: "Green Valley Farms",
    type: "Hass",
    caliber: "60",
    quantityBoxes: 300,
    pricePerBox: 42.00,
    location: "California, USA",
    harvestDate: "2024-01-15"
  },
  {
    id: 3,
    vendorId: 2,
    vendorName: "Tropical Harvest",
    type: "Fuerte",
    caliber: "48",
    quantityBoxes: 800,
    pricePerBox: 48.00,
    location: "Mexico",
    harvestDate: "2024-01-10"
  },
  {
    id: 4,
    vendorId: 3,
    vendorName: "Premium Avocados",
    type: "Hass",
    caliber: "70",
    quantityBoxes: 200,
    pricePerBox: 40.00,
    location: "Peru",
    harvestDate: "2024-01-20"
  },
  {
    id: 5,
    vendorId: 2,
    vendorName: "Tropical Harvest",
    type: "Fuerte",
    caliber: "60",
    quantityBoxes: 400,
    pricePerBox: 45.00,
    location: "Mexico",
    harvestDate: "2024-01-10"
  }
];

export const mockOrders = [
  // Fresh Market Co. orders
  {
    id: 1,
    buyerId: 1,
    buyerName: "Fresh Market Co.",
    type: "Hass",
    caliber: "48",
    quantityBoxes: 2000,
    orderDate: "2024-01-25",
    status: "pending",
    acceptedVendorId: null,
    totalAmount: 90000.00,
    item: { pricePerBox: 45.00 }
  },
  {
    id: 2,
    buyerId: 1,
    buyerName: "Fresh Market Co.",
    type: "Hass",
    caliber: "60",
    quantityBoxes: 1000,
    orderDate: "2024-01-23",
    status: "out-for-delivery",
    acceptedVendorId: 1,
    totalAmount: 42000.00,
    item: { pricePerBox: 42.00 }
  },
  {
    id: 3,
    buyerId: 1,
    buyerName: "Fresh Market Co.",
    type: "Hass",
    caliber: "70",
    quantityBoxes: 1500,
    orderDate: "2024-01-24",
    status: "delivered",
    acceptedVendorId: 1,
    totalAmount: 60000.00,
    item: { pricePerBox: 40.00 }
  },
  {
    id: 4,
    buyerId: 1,
    buyerName: "Fresh Market Co.",
    type: "Fuerte",
    caliber: "48",
    quantityBoxes: 1200,
    orderDate: "2024-01-22",
    status: "accepted",
    acceptedVendorId: 2,
    totalAmount: 57600.00,
    item: { pricePerBox: 48.00 }
  },
  
  // Grocery Chain Inc. orders
  {
    id: 5,
    buyerId: 2,
    buyerName: "Grocery Chain Inc.",
    type: "Fuerte",
    caliber: "60",
    quantityBoxes: 2000,
    orderDate: "2024-01-26",
    status: "accepted",
    acceptedVendorId: 2,
    totalAmount: 90000.00,
    item: { pricePerBox: 45.00 }
  },
  {
    id: 6,
    buyerId: 2,
    buyerName: "Grocery Chain Inc.",
    type: "Hass",
    caliber: "48",
    quantityBoxes: 800,
    orderDate: "2024-01-28",
    status: "pending",
    acceptedVendorId: null,
    totalAmount: 36000.00,
    item: { pricePerBox: 45.00 }
  },
  {
    id: 7,
    buyerId: 2,
    buyerName: "Grocery Chain Inc.",
    type: "Bacon",
    caliber: "70",
    quantityBoxes: 600,
    orderDate: "2024-01-20",
    status: "delivered",
    acceptedVendorId: 3,
    totalAmount: 24000.00,
    item: { pricePerBox: 40.00 }
  },
  
  // Organic Foods Ltd. orders
  {
    id: 8,
    buyerId: 3,
    buyerName: "Organic Foods Ltd.",
    type: "Bacon",
    caliber: "48",
    quantityBoxes: 800,
    orderDate: "2024-01-27",
    status: "pending",
    acceptedVendorId: null,
    totalAmount: 36000.00,
    item: { pricePerBox: 45.00 }
  },
  {
    id: 9,
    buyerId: 3,
    buyerName: "Organic Foods Ltd.",
    type: "Zutano",
    caliber: "60",
    quantityBoxes: 500,
    orderDate: "2024-01-21",
    status: "accepted",
    acceptedVendorId: 1,
    totalAmount: 21000.00,
    item: { pricePerBox: 42.00 }
  },
  {
    id: 10,
    buyerId: 3,
    buyerName: "Organic Foods Ltd.",
    type: "Hass",
    caliber: "84",
    quantityBoxes: 300,
    orderDate: "2024-01-19",
    status: "out-for-delivery",
    acceptedVendorId: 2,
    totalAmount: 12000.00,
    item: { pricePerBox: 40.00 }
  },
  
  // Premium Produce Co. orders
  {
    id: 11,
    buyerId: 4,
    buyerName: "Premium Produce Co.",
    type: "Fuerte",
    caliber: "70",
    quantityBoxes: 1500,
    orderDate: "2024-01-29",
    status: "pending",
    acceptedVendorId: null,
    totalAmount: 67500.00,
    item: { pricePerBox: 45.00 }
  },
  {
    id: 12,
    buyerId: 4,
    buyerName: "Premium Produce Co.",
    type: "Hass",
    caliber: "48",
    quantityBoxes: 1000,
    orderDate: "2024-01-18",
    status: "delivered",
    acceptedVendorId: 1,
    totalAmount: 45000.00,
    item: { pricePerBox: 45.00 }
  }
];

export const mockVendors = [
  {
    id: 1,
    email: "vendor1@greenvalley.com",
    name: "Green Valley Farms",
    location: "California, USA",
    contactInfo: "+1-555-0123"
  },
  {
    id: 2,
    email: "vendor2@tropical.com",
    name: "Tropical Harvest",
    location: "Mexico",
    contactInfo: "+52-555-0456"
  },
  {
    id: 3,
    email: "vendor3@premium.com",
    name: "Premium Avocados",
    location: "Peru",
    contactInfo: "+51-555-0789"
  }
];

export const mockBuyers = [
  {
    id: 1,
    email: "buyer1@freshmarket.com",
    companyName: "Fresh Market Co.",
    contactName: "Sarah Johnson",
    phone: "+1-555-1000",
    address: "123 Fresh Street, Los Angeles, CA 90210"
  },
  {
    id: 2,
    email: "buyer2@grocerychain.com",
    companyName: "Grocery Chain Inc.",
    contactName: "Michael Chen",
    phone: "+1-555-2000",
    address: "456 Chain Avenue, New York, NY 10001"
  },
  {
    id: 3,
    email: "buyer3@organicfoods.com",
    companyName: "Organic Foods Ltd.",
    contactName: "Emily Rodriguez",
    phone: "+1-555-3000",
    address: "789 Organic Way, Portland, OR 97201"
  },
  {
    id: 4,
    email: "buyer4@premiumproduce.com",
    companyName: "Premium Produce Co.",
    contactName: "David Kim",
    phone: "+1-555-4000",
    address: "321 Premium Blvd, Miami, FL 33101"
  }
];

export const avocadoTypes = ["Hass", "Fuerte", "Bacon", "Zutano"];
export const calibers = ["48", "60", "70", "84"];
