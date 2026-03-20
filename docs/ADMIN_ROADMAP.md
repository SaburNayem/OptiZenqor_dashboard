# Admin Roadmap

## What Changed

The dashboard is no longer just a storefront companion demo. It now has the structural foundation to become the master control panel for:

- website commerce
- mobile app experience
- admin operations
- future backend integrations

## Why It Changed

The dashboard needs to manage multiple surfaces with consistent workflows instead of growing route by route without shared patterns.

## Recommended Next Development Phases

### Phase 1: API Connection

- connect auth to a real admin login
- connect catalog and categories to backend APIs
- connect orders and customer queries

### Phase 2: Operational Depth

- add real order detail timelines
- add support assignment and SLA states
- add richer homepage block management
- add audit logs for customer and settings changes

### Phase 3: Reliability

- add route-level loading and retry states
- add automated tests around controllers and service integrations
- add persistence for drafts and unsaved admin changes where needed

### Phase 4: Permissions

- add role-based admin authorization
- restrict settings and system controls by admin role
- add action audit history across sensitive modules

## How To Continue Correctly

Build depth one feature at a time.

Do not collapse the new feature boundaries just to move faster on a single page.

Prefer extending an existing domain module over creating ad hoc global helpers unless the reuse is real and proven.
