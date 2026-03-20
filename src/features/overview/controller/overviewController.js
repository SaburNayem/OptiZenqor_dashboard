import { useDashboard } from "../../../store/DashboardContext";

export function useOverviewController() {
  const dashboard = useDashboard();

  return {
    stats: dashboard.stats,
    activityFeed: dashboard.state.system.activityFeed,
    authFlows: dashboard.state.system.authFlows,
    products: dashboard.state.catalog.products,
    users: dashboard.state.customers.users,
    systemEndpoints: dashboard.state.system.apiConfig.endpoints,
    toneMap: dashboard.state.system.toneMap,
  };
}
