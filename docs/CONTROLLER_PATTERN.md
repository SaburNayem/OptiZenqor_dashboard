# Controller Pattern

## What Changed

Page logic is no longer concentrated inside large page components. Each major route now has a controller hook such as:

- `useCatalogController`
- `useCustomersController`
- `useOrdersController`
- `useHomepageController`
- `useFeaturesController`

## Why It Changed

This keeps pages focused on layout and rendering while giving each route a stable place for:

- derived view data
- local UI state
- validation flow
- event handlers
- action composition with the store

## Pattern

### Page

Responsible for:

- composing sections
- passing props to components
- rendering controller data

### Controller

Responsible for:

- reading from `useDashboard()`
- building filtered or derived lists
- holding route-local UI state like selected item IDs or form state
- validating forms before calling actions
- exposing a clean interface to the page

### Service

Responsible for:

- data creation
- mutation helpers
- future API access points

## Example Flow

Catalog flow now works like this:

1. `CatalogPage` renders the feature UI.
2. `useCatalogController` manages form state, edit state, validation, and handlers.
3. The controller calls Context actions like `dashboard.addProduct`.
4. The Context action delegates mutation logic to `catalogService`.

## How To Continue Correctly

Use controllers when:

- a page has filters
- a page has detail panel selection state
- a page has forms
- a page combines multiple store slices
- a page has more than trivial event handlers

Do not move API access directly into a page. Put it in a service and let the controller call the store or service boundary.
