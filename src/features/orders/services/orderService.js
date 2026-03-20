import { createOrderModel } from "../model/orderModel";

const seedOrders = [
  {
    id: "ORD-1204",
    customerId: "USR-104",
    customerName: "Nafisa Rahman",
    total: 124,
    itemCount: 3,
    status: "Shipped",
    paymentMethod: "Card",
    source: "Website",
    placedAt: "Mar 18, 2026",
    address: "Dhanmondi, Dhaka",
    items: ["Urban Laptop", "Notebook Set", "Desk Lamp"],
    notes: "Priority customer",
  },
  {
    id: "ORD-1281",
    customerId: "USR-231",
    customerName: "Arif Hasan",
    total: 38,
    itemCount: 2,
    status: "Pending",
    paymentMethod: "Cash on delivery",
    source: "App",
    placedAt: "Mar 19, 2026",
    address: "Mirpur, Dhaka",
    items: ["Face Cleanser", "Shampoo"],
  },
  {
    id: "ORD-1310",
    customerId: "USR-567",
    customerName: "Ishraq Khan",
    total: 84,
    itemCount: 4,
    status: "Delivered",
    paymentMethod: "Card",
    source: "Website",
    placedAt: "Mar 17, 2026",
    address: "Banani, Dhaka",
    items: ["Studio Headphones", "Fitness Bottle", "Organic Snacks", "Desk Lamp"],
  },
  {
    id: "ORD-1333",
    customerId: "USR-418",
    customerName: "Tania Akter",
    total: 28,
    itemCount: 1,
    status: "Refunded",
    paymentMethod: "Mobile wallet",
    source: "App",
    placedAt: "Mar 14, 2026",
    address: "Uttara, Dhaka",
    items: ["Wellness Kit"],
  },
];

export function createOrderSeed() {
  return seedOrders.map(createOrderModel);
}

export function updateOrderStatus(orders, orderId, status) {
  return orders.map((order) => (order.id === orderId ? { ...order, status } : order));
}
