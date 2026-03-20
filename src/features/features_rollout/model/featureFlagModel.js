export function createFeatureFlagModel(feature) {
  return {
    id: feature.id,
    name: feature.name,
    owner: feature.owner,
    exposure: feature.exposure,
    environment: feature.environment ?? "public",
    rollout: Number(feature.rollout ?? 0),
    enabled: Boolean(feature.enabled),
  };
}
