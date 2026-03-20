export function createCustomerModel(customer) {
  return {
    id: customer.id,
    name: customer.name,
    email: customer.email,
    role: customer.role,
    status: customer.status,
    plan: customer.plan,
    orders: Number(customer.orders ?? 0),
    favorites: Number(customer.favorites ?? 0),
    lastSeen: customer.lastSeen ?? "Recently",
    notes: customer.notes ?? "No notes yet.",
    history: customer.history ?? [
      { id: `${customer.id}-h1`, action: "Seeded into admin dashboard", time: "Today" },
    ],
  };
}
