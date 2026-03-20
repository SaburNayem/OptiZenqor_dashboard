import { useState } from "react";
import { useDashboard } from "../../../store/DashboardContext";

export function useOrdersController() {
  const dashboard = useDashboard();
  const [activeOrderId, setActiveOrderId] = useState(dashboard.state.orders.orders[0]?.id ?? "");

  const orders = dashboard.state.orders.orders;
  const activeOrder = orders.find((order) => order.id === activeOrderId) ?? orders[0] ?? null;

  return {
    orders,
    activeOrder,
    toneMap: dashboard.state.system.toneMap,
    setActiveOrderId,
    updateOrderStatus: dashboard.updateOrderStatus,
  };
}
