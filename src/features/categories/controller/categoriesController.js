import { useDashboard } from "../../../store/DashboardContext";

export function useCategoriesController() {
  const dashboard = useDashboard();

  return {
    categories: dashboard.categoryRows,
  };
}
