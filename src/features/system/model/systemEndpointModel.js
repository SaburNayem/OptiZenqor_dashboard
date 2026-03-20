export function createSystemEndpointModel(endpoint) {
  return {
    path: endpoint.path ?? endpoint,
    purpose: endpoint.purpose ?? "Platform route",
    status: endpoint.status ?? "Healthy",
    latency: endpoint.latency ?? "120ms",
  };
}
