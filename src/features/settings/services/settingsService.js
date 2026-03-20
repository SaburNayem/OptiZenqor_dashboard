import { createAdminSettingsModel } from "../model/adminSettingsModel";

export function createSettingsSeed() {
  return createAdminSettingsModel({
    adminName: "OptiZenqor Admin",
    adminEmail: "admin@optizenqor.com",
    title: "Commerce Operations Lead",
    apiBaseUrl: "https://api.omnizara.com",
    theme: "Warm light",
    density: "Comfortable",
    notifyOrders: true,
    notifySupport: true,
    notifyContent: false,
  });
}
