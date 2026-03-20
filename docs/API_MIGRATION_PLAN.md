# API Migration Plan

## What Changed

The dashboard is still local-first, but the codebase now has explicit service boundaries so mock logic can be replaced incrementally.

## Why It Changed

The goal is to avoid a future rewrite when real admin APIs are introduced for products, orders, homepage content, customer support, and settings.

## Migration Strategy

### Phase 1

Keep the current Context store, but replace service internals one domain at a time.

Recommended order:

1. Auth
2. Catalog
3. Orders
4. Customers
5. Homepage
6. Content
7. Chat
8. Feature flags
9. Settings
10. System health

### Phase 2

For each domain:

1. Keep the controller API stable.
2. Swap seed creators for fetch-based loaders.
3. Swap mutation helpers for async service calls.
4. Add loading, empty, and error states per route.
5. Keep model normalizers as the API-to-UI translation layer.

### Phase 3

Introduce persistence in [persistence.js](/Users/bdcalling/Desktop/nayamProjects/OptiZenqor_dashboard/src/store/persistence.js) only if you need local caching or draft recovery during the transition.

## Important Rule

When APIs arrive, preserve this direction:

- API payload enters `service`
- shape cleanup happens in `model`
- page-facing state preparation happens in `controller`
- JSX stays mostly presentation-focused

## How To Continue Correctly

Do not bypass services by calling `fetch()` from pages or controllers.

Do not bind raw API payloads directly into UI tables without normalization.

Do not merge multiple domains into a single generic API helper too early. Keep services feature-specific unless a real shared abstraction emerges.
