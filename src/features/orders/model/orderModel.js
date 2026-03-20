export function createOrderModel(order) {
  return {
    id: order.id,
    customerId: order.customerId,
    customerName: order.customerName,
    total: Number(order.total),
    itemCount: Number(order.itemCount),
    status: order.status,
    paymentMethod: order.paymentMethod,
    source: order.source,
    placedAt: order.placedAt,
    address: order.address,
    items: order.items ?? [],
    notes: order.notes ?? "",
  };
}
