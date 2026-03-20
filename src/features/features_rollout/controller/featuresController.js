import { useDashboard } from "../../../store/DashboardContext";

export function useFeaturesController() {
  const dashboard = useDashboard();

  return {
    features: dashboard.state.featureFlags.features,
    toggleFeature: dashboard.toggleFeature,
    updateFeatureRollout: dashboard.updateFeatureRollout,
    updateFeatureEnvironment: dashboard.updateFeatureEnvironment,
  };
}
