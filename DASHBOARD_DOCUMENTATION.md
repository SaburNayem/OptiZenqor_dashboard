# OptiZenqor Dashboard Documentation

## Overview

OptiZenqor Dashboard is the admin control center for the OptiZenqor ecosystem. It is designed to manage the React storefront website, the Flutter mobile app experience, and future backend APIs from one place.

The dashboard currently uses local seeded state and mock service modules, but the architecture is now organized so each domain can be migrated to real APIs without redesigning the UI layer.

## Tech Stack

- React 18
- React Router DOM 6
- Vite 5
- React Context for app state
- Plain CSS in [src/styles.css](/Users/bdcalling/Desktop/nayamProjects/OptiZenqor_dashboard/src/styles.css)

## Current Routes

| Route | Purpose |
| --- | --- |
| `/login` | Demo admin login |
| `/` | Overview |
| `/catalog` | Product and offer management |
| `/categories` | Category and taxonomy visibility |
| `/customers` | Customer management |
| `/orders` | Order management |
| `/content` | Editorial and promo content |
| `/homepage` | Homepage and hero management |
| `/features` | Feature rollout control |
| `/chat` | Support inbox |
| `/system` | System and API health |
| `/settings` | Admin settings |

## Authentication

The dashboard keeps the original protected-route behavior and still uses demo credentials for now.

- Email: `admin@optizenqor.com`
- Password: `admin123`
- Session key: `optizenqor_admin_session`

Relevant files:

- [src/features/auth/services/authService.js](/Users/bdcalling/Desktop/nayamProjects/OptiZenqor_dashboard/src/features/auth/services/authService.js)
- [src/features/auth/ProtectedRoute.jsx](/Users/bdcalling/Desktop/nayamProjects/OptiZenqor_dashboard/src/features/auth/ProtectedRoute.jsx)
- [src/features/auth/pages/LoginPage.jsx](/Users/bdcalling/Desktop/nayamProjects/OptiZenqor_dashboard/src/features/auth/pages/LoginPage.jsx)

## Architecture Summary

The project now follows a feature-based structure:

```text
src/
  app/
  core/
  shared/
  features/
  store/
```

### Layer Roles

- `pages`: UI composition only
- `controller`: page-facing logic, derived data, local UI state
- `services`: mock data operations and future API-ready boundaries
- `model`: entity shape normalization and transformation helpers
- `store`: shared seeded state and global actions

## Main Domains

The dashboard now supports local admin workflows for:

- products
- categories
- offer tabs and promotions
- homepage hero and section content
- customers
- orders
- editorial content
- support chat
- feature rollout flags
- system health
- admin settings

## State Management

React Context is still the main state container, but state is now organized by slices:

- `catalog`
- `customers`
- `orders`
- `content`
- `homepage`
- `featureFlags`
- `chat`
- `system`
- `settings`

Key files:

- [src/store/DashboardContext.jsx](/Users/bdcalling/Desktop/nayamProjects/OptiZenqor_dashboard/src/store/DashboardContext.jsx)
- [src/store/dashboardStore.js](/Users/bdcalling/Desktop/nayamProjects/OptiZenqor_dashboard/src/store/dashboardStore.js)
- [src/store/persistence.js](/Users/bdcalling/Desktop/nayamProjects/OptiZenqor_dashboard/src/store/persistence.js)

## Key Improvements

### Catalog

- cleaner add/edit workflow
- product visibility control
- featured and popular toggles
- low stock visibility
- offer tag management
- validation for product and offer forms

### Customers

- search
- role, plan, and status filters
- side detail panel
- status action history stub

### Orders

- new route and admin surface
- order detail side panel
- status mutation support
- shared app and website order visibility

### Homepage

- new route for homepage control
- hero title and subtitle editing
- CTA editing
- featured collection management
- popular products selector
- trust highlight and offer ribbon editing

### Content

- richer content states
- publish and approval controls
- homepage placement selector

### Features

- enabled state now mutates locally
- rollout percentage updates
- environment targeting controls

### Chat

- unread counts
- status filter
- canned responses
- close and reopen actions

### System

- health cards
- endpoint table with latency
- refresh action
- environment cards

### Settings

- new admin settings route
- admin identity and API base URL form
- dashboard preference controls
- notification settings

## Validation and Feedback

Validation helpers now live in:

- [src/core/utils/validation.js](/Users/bdcalling/Desktop/nayamProjects/OptiZenqor_dashboard/src/core/utils/validation.js)

Reusable feedback components now live in:

- [src/shared/feedback/LoadingState.jsx](/Users/bdcalling/Desktop/nayamProjects/OptiZenqor_dashboard/src/shared/feedback/LoadingState.jsx)
- [src/shared/feedback/EmptyState.jsx](/Users/bdcalling/Desktop/nayamProjects/OptiZenqor_dashboard/src/shared/feedback/EmptyState.jsx)
- [src/shared/feedback/ErrorState.jsx](/Users/bdcalling/Desktop/nayamProjects/OptiZenqor_dashboard/src/shared/feedback/ErrorState.jsx)
- [src/shared/feedback/ConfirmActionModal.jsx](/Users/bdcalling/Desktop/nayamProjects/OptiZenqor_dashboard/src/shared/feedback/ConfirmActionModal.jsx)
- [src/shared/feedback/SideDetailPanel.jsx](/Users/bdcalling/Desktop/nayamProjects/OptiZenqor_dashboard/src/shared/feedback/SideDetailPanel.jsx)
- [src/shared/feedback/FormFieldError.jsx](/Users/bdcalling/Desktop/nayamProjects/OptiZenqor_dashboard/src/shared/feedback/FormFieldError.jsx)
- [src/shared/feedback/NotFoundState.jsx](/Users/bdcalling/Desktop/nayamProjects/OptiZenqor_dashboard/src/shared/feedback/NotFoundState.jsx)

## Important Current Limitation

All changes are still local and in-memory. The service/controller split prepares the codebase for API migration later, but no real backend is connected yet.

## Developer Docs

For deeper guidance, see:

- [docs/DASHBOARD_ARCHITECTURE.md](/Users/bdcalling/Desktop/nayamProjects/OptiZenqor_dashboard/docs/DASHBOARD_ARCHITECTURE.md)
- [docs/CONTROLLER_PATTERN.md](/Users/bdcalling/Desktop/nayamProjects/OptiZenqor_dashboard/docs/CONTROLLER_PATTERN.md)
- [docs/API_MIGRATION_PLAN.md](/Users/bdcalling/Desktop/nayamProjects/OptiZenqor_dashboard/docs/API_MIGRATION_PLAN.md)
- [docs/FEATURE_MODULE_GUIDE.md](/Users/bdcalling/Desktop/nayamProjects/OptiZenqor_dashboard/docs/FEATURE_MODULE_GUIDE.md)
- [docs/ADMIN_ROADMAP.md](/Users/bdcalling/Desktop/nayamProjects/OptiZenqor_dashboard/docs/ADMIN_ROADMAP.md)
