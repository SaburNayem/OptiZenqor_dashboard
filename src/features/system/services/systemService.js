import { activityFeed, apiConfig, authFlows, toneMap } from "../../../store/data/system";
import { createSystemEndpointModel } from "../model/systemEndpointModel";

export function createSystemSeed() {
  return {
    activityFeed: [...activityFeed],
    apiConfig: {
      baseUrl: apiConfig.baseUrl,
      endpoints: apiConfig.endpoints.map((endpoint) =>
        createSystemEndpointModel({
          path: endpoint,
          purpose: describeEndpoint(endpoint),
          status: "Healthy",
          latency: `${100 + endpoint.length * 3}ms`,
        }),
      ),
    },
    authFlows: authFlows.map((flow) => ({ ...flow })),
    toneMap: {
      ...toneMap,
      Paid: "success",
      Packed: "warning",
      Shipped: "warning",
      Delivered: "success",
      Cancelled: "danger",
      Refunded: "danger",
      Pending: "warning",
    },
    healthCards: [
      { label: "Storefront sync", value: "Healthy", detail: "Products and homepage content are aligned." },
      { label: "App services", value: "Healthy", detail: "Mobile auth and order surfaces responding." },
      { label: "Background jobs", value: "Monitoring", detail: "Promotions and messaging checks queued." },
    ],
  };
}

export function refreshSystemStatus(system) {
  return {
    ...system,
    activityFeed: [
      "Manual health refresh completed from the admin dashboard.",
      ...system.activityFeed,
    ].slice(0, 6),
  };
}

export function describeEndpoint(endpoint) {
  if (endpoint.includes("sign-in")) return "Login and token issue";
  if (endpoint.includes("sign-up")) return "Create customer account";
  if (endpoint.includes("products")) return "Catalog listing and merchandising";
  if (endpoint.includes("categories")) return "Store taxonomy and browse structure";
  if (endpoint.includes("cart")) return "Order intent and checkout basket";
  if (endpoint.includes("favorite")) return "Wishlist and repeat intent";

  return "Platform route";
}
