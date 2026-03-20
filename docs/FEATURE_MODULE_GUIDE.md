# Feature Module Guide

## What Changed

The dashboard now treats each business domain as its own feature module instead of centering everything around top-level page files.

## Recommended Module Layout

```text
features/<feature-name>/
  pages/
  controller/
  services/
  components/
  model/
```

Some simpler features may not need every folder immediately, but this is the intended shape.

## Folder Responsibilities

### `pages`

Route-level entry points. Keep them thin.

### `controller`

Hooks that adapt store state and expose actions to pages.

### `services`

Mock data access today, real API access later.

### `components`

Feature-specific presentational blocks that should not live in `shared/ui`.

### `model`

Entity helpers for consistent field naming and transformation.

## Shared vs Feature-Specific

Put code in `shared` only if it is reused across multiple domains and does not contain business-specific meaning.

Examples:

- `DataTable` belongs in `shared/ui`
- `ProductForm` belongs in `features/catalog/components`
- `SideDetailPanel` belongs in `shared/feedback`

## How To Continue Correctly

Before adding a new file, ask:

1. Is this domain-specific?
2. Is this UI-only, logic-only, or data-access-only?
3. Will another feature need this exact piece?

Use the answer to place the file in `components`, `controller`, `services`, `model`, or `shared`.
