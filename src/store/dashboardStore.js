import {
  createCatalogSeed,
  addProduct as addProductRecord,
  addOfferTab as addOfferTabRecord,
  deleteProduct as deleteProductRecord,
  getCatalogStats,
  updateProduct as updateProductRecord,
} from "../features/catalog/services/catalogService";
import { getCategoryRows } from "../features/categories/services/categoryService";
import {
  createChatSeed,
  sendChatMessage as sendChatReply,
  updateChatStatus as updateChatThreadStatus,
} from "../features/chat/services/chatService";
import { createContentSeed, updatePost as updatePostRecord } from "../features/content/services/contentService";
import {
  createCustomerSeed,
  updateCustomerStatus as updateCustomerRecordStatus,
} from "../features/customers/services/customerService";
import {
  createFeatureSeed,
  toggleFeature as toggleFeatureFlag,
  updateFeatureEnvironment as updateFeatureFlagEnvironment,
  updateFeatureRollout as updateFeatureFlagRollout,
} from "../features/features_rollout/services/featureFlagService";
import { createHomepageSeed } from "../features/homepage/services/homepageService";
import { createOrderSeed, updateOrderStatus as updateOrderRecordStatus } from "../features/orders/services/orderService";
import { createSettingsSeed } from "../features/settings/services/settingsService";
import { createSystemSeed, refreshSystemStatus } from "../features/system/services/systemService";

export function createSeedState() {
  const catalog = createCatalogSeed();
  const customers = createCustomerSeed();
  const content = createContentSeed();
  const chat = createChatSeed();

  return {
    catalog,
    customers,
    orders: {
      orders: createOrderSeed(),
    },
    content,
    homepage: createHomepageSeed(),
    featureFlags: {
      features: createFeatureSeed(),
    },
    chat,
    system: createSystemSeed(),
    settings: createSettingsSeed(),
  };
}

export function createDashboardActions(setState) {
  return {
    addProduct(form) {
      setState((current) => ({
        ...current,
        catalog: {
          ...current.catalog,
          products: addProductRecord(current.catalog.products, form),
        },
      }));
    },
    updateProduct(productId, updates) {
      setState((current) => ({
        ...current,
        catalog: {
          ...current.catalog,
          products: updateProductRecord(current.catalog.products, productId, updates),
        },
      }));
    },
    deleteProduct(productId) {
      setState((current) => ({
        ...current,
        catalog: {
          ...current.catalog,
          products: deleteProductRecord(current.catalog.products, productId),
        },
      }));
    },
    addOfferTab(label) {
      setState((current) => ({
        ...current,
        catalog: {
          ...current.catalog,
          offerTabs: addOfferTabRecord(current.catalog.offerTabs, label),
        },
      }));
    },
    updateCustomerStatus(userId, status) {
      setState((current) => ({
        ...current,
        customers: {
          ...current.customers,
          users: updateCustomerRecordStatus(current.customers.users, userId, status),
        },
      }));
    },
    updateOrderStatus(orderId, status) {
      setState((current) => ({
        ...current,
        orders: {
          ...current.orders,
          orders: updateOrderRecordStatus(current.orders.orders, orderId, status),
        },
      }));
    },
    updatePost(postId, updates) {
      setState((current) => ({
        ...current,
        content: {
          ...current.content,
          posts: updatePostRecord(current.content.posts, postId, updates),
        },
      }));
    },
    updateHomepage(updates) {
      setState((current) => ({
        ...current,
        homepage: {
          ...current.homepage,
          ...updates,
        },
      }));
    },
    toggleFeature(featureId) {
      setState((current) => ({
        ...current,
        featureFlags: {
          ...current.featureFlags,
          features: toggleFeatureFlag(current.featureFlags.features, featureId),
        },
      }));
    },
    updateFeatureRollout(featureId, rollout) {
      setState((current) => ({
        ...current,
        featureFlags: {
          ...current.featureFlags,
          features: updateFeatureFlagRollout(current.featureFlags.features, featureId, rollout),
        },
      }));
    },
    updateFeatureEnvironment(featureId, environment) {
      setState((current) => ({
        ...current,
        featureFlags: {
          ...current.featureFlags,
          features: updateFeatureFlagEnvironment(current.featureFlags.features, featureId, environment),
        },
      }));
    },
    sendChatMessage(threadId, text) {
      setState((current) => ({
        ...current,
        chat: {
          ...current.chat,
          chatThreads: sendChatReply(current.chat.chatThreads, threadId, text),
        },
      }));
    },
    updateChatStatus(threadId, status) {
      setState((current) => ({
        ...current,
        chat: {
          ...current.chat,
          chatThreads: updateChatThreadStatus(current.chat.chatThreads, threadId, status),
        },
      }));
    },
    refreshSystem() {
      setState((current) => ({
        ...current,
        system: refreshSystemStatus(current.system),
      }));
    },
    updateSettings(updates) {
      setState((current) => ({
        ...current,
        settings: {
          ...current.settings,
          ...updates,
        },
      }));
    },
  };
}

export function buildDashboardView(state) {
  const categoryRows = getCategoryRows(state.catalog.categories, state.catalog.products);
  const catalogStats = getCatalogStats(state.catalog.products, state.catalog.offerTabs);
  const activeUsers = state.customers.users.filter((user) => user.status === "Active").length;
  const unresolvedChats = state.chat.chatThreads.filter((thread) => thread.status !== "Closed").length;

  const stats = [
    {
      label: "Categories",
      value: state.catalog.categories.length,
      change: `${categoryRows.filter((row) => row.productCount > 0).length} populated groups`,
    },
    {
      label: "Products",
      value: state.catalog.products.length,
      change: `${state.catalog.products.filter((product) => product.visible).length} visible to customers`,
    },
    {
      label: "Customers",
      value: state.customers.users.length,
      change: `${activeUsers} active accounts`,
    },
    {
      label: "Orders",
      value: state.orders.orders.length,
      change: `${state.orders.orders.filter((order) => order.status === "Pending").length} awaiting action`,
    },
  ];

  const pendingActions =
    state.catalog.products.filter((product) => product.status !== "Published").length +
    state.content.posts.filter((post) => post.status !== "Published" && post.status !== "Approved").length +
    state.customers.users.filter((user) => user.status !== "Active").length +
    state.featureFlags.features.filter((feature) => !feature.enabled).length +
    unresolvedChats;

  return {
    state,
    stats,
    pendingActions,
    catalogStats,
    categoryRows,
    unresolvedChats,
    systemSnapshot: {
      liveRoutes: 11,
      apiCount: state.system.apiConfig.endpoints.length,
    },
  };
}
