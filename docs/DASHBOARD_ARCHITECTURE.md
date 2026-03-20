# Dashboard Architecture

## What Changed

The dashboard moved from a mostly page-driven structure into a feature-based architecture with explicit `controller`, `services`, and `model` layers.

The largest shifts were:

- route modules now point to feature pages
- store state is split into domain slices
- page logic moved into controller hooks
- mutation logic moved into service functions
- entity normalization moved into model helpers
- new domains were added for orders, homepage, and settings

## Why It Changed

The old structure was workable for a demo, but it would become difficult to maintain once the dashboard started managing website content, app data, and future API-backed operations together.

The new structure keeps the current UI direction while making it easier to:

- replace local mock logic with real APIs
- extend one feature without touching unrelated domains
- keep page files smaller
- standardize admin behavior across modules

## Current Shape

```text
src/
  app/
    layout/
    router.jsx
    providers.jsx
  core/
    constants/
    utils/
  shared/
    ui/
    feedback/
    config/
  features/
    auth/
    overview/
    catalog/
    categories/
    customers/
    orders/
    content/
    homepage/
    features_rollout/
    chat/
    system/
    settings/
  store/
```

## Source of Truth

Global session data still lives in the Context store:

- [src/store/DashboardContext.jsx](/Users/bdcalling/Desktop/nayamProjects/OptiZenqor_dashboard/src/store/DashboardContext.jsx)
- [src/store/dashboardStore.js](/Users/bdcalling/Desktop/nayamProjects/OptiZenqor_dashboard/src/store/dashboardStore.js)

Services are now responsible for domain mutations and seed creation, while controllers adapt that global state for a specific page.

## How To Continue Correctly

When adding a new admin feature:

1. Create or extend a feature folder.
2. Put UI in `pages` and `components`.
3. Put derived logic and event handlers in `controller`.
4. Put mock data access or future API calls in `services`.
5. Put shape normalization in `model` if the data has a real entity form.
6. Update the global store only to register state slices and bind service-backed actions.

Avoid putting new business rules directly inside page JSX unless the logic is truly presentation-only.
