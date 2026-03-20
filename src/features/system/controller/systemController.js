import { useDashboard } from "../../../store/DashboardContext";

export function useSystemController() {
  const dashboard = useDashboard();

  return {
    system: dashboard.state.system,
    refreshSystem: dashboard.refreshSystem,
  };
}
