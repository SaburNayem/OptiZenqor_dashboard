import { features } from "../../../store/data/system";
import { createFeatureFlagModel } from "../model/featureFlagModel";

export function createFeatureSeed() {
  return features.map((feature) =>
    createFeatureFlagModel({
      ...feature,
      environment: feature.exposure === "Internal" ? "internal" : feature.exposure === "Beta users" ? "beta" : "public",
    }),
  );
}

export function toggleFeature(featuresList, featureId) {
  return featuresList.map((feature) =>
    feature.id === featureId ? { ...feature, enabled: !feature.enabled } : feature,
  );
}

export function updateFeatureRollout(featuresList, featureId, rollout) {
  return featuresList.map((feature) =>
    feature.id === featureId ? { ...feature, rollout: Number(rollout) } : feature,
  );
}

export function updateFeatureEnvironment(featuresList, featureId, environment) {
  return featuresList.map((feature) =>
    feature.id === featureId ? { ...feature, environment } : feature,
  );
}
