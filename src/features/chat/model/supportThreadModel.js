export function createSupportThreadModel(thread) {
  return {
    id: thread.id,
    customerName: thread.customerName,
    customerEmail: thread.customerEmail ?? `${thread.customerName.toLowerCase().replace(/\s+/g, ".")}@optizenqor.com`,
    channel: thread.channel,
    orderRef: thread.orderRef,
    status: thread.status,
    unreadCount: Number(thread.unreadCount ?? 0),
    priority: thread.priority ?? "Normal",
    messages: thread.messages ?? [],
  };
}
