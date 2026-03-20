export function createAdminSettingsModel(settings) {
  return {
    adminName: settings.adminName,
    adminEmail: settings.adminEmail,
    title: settings.title ?? "Operations Lead",
    apiBaseUrl: settings.apiBaseUrl,
    theme: settings.theme ?? "Warm light",
    density: settings.density ?? "Comfortable",
    notifyOrders: settings.notifyOrders ?? true,
    notifySupport: settings.notifySupport ?? true,
    notifyContent: settings.notifyContent ?? false,
  };
}
