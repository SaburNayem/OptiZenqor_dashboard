export const initialUsers = [
  {
    id: "USR-104",
    name: "Nafisa Rahman",
    email: "nafisa@optizenqor.com",
    role: "Admin",
    status: "Active",
    plan: "Enterprise",
    lastSeen: "2 min ago",
  },
  {
    id: "USR-231",
    name: "Arif Hasan",
    email: "arif@optizenqor.com",
    role: "Editor",
    status: "Review",
    plan: "Growth",
    lastSeen: "19 min ago",
  },
  {
    id: "USR-418",
    name: "Tania Akter",
    email: "tania@optizenqor.com",
    role: "Moderator",
    status: "Suspended",
    plan: "Starter",
    lastSeen: "Yesterday",
  },
  {
    id: "USR-567",
    name: "Ishraq Khan",
    email: "ishraq@optizenqor.com",
    role: "Support",
    status: "Active",
    plan: "Growth",
    lastSeen: "5 min ago",
  },
];

export const initialProducts = [
  {
    id: "PRD-11",
    name: "Focus Planner",
    category: "Productivity",
    inventory: 84,
    price: "$29",
    status: "Published",
    sales: 1240,
  },
  {
    id: "PRD-12",
    name: "Habit Sprint Kit",
    category: "Wellness",
    inventory: 32,
    price: "$42",
    status: "Draft",
    sales: 490,
  },
  {
    id: "PRD-13",
    name: "Energy Audit Sheet",
    category: "Analytics",
    inventory: 120,
    price: "$19",
    status: "Published",
    sales: 1804,
  },
  {
    id: "PRD-14",
    name: "Team Ritual Pack",
    category: "Collaboration",
    inventory: 17,
    price: "$58",
    status: "Low Stock",
    sales: 665,
  },
];

export const initialPosts = [
  {
    id: "PST-71",
    title: "How to Build a Zero-Overwhelm Workflow",
    author: "Admin Team",
    channel: "Blog",
    status: "Published",
    reach: "18.2K",
    publishedAt: "Mar 18",
  },
  {
    id: "PST-72",
    title: "Weekly Product Release Notes",
    author: "Nafisa Rahman",
    channel: "News",
    status: "Scheduled",
    reach: "7.4K",
    publishedAt: "Mar 22",
  },
  {
    id: "PST-73",
    title: "The Energy Mapping Method",
    author: "Arif Hasan",
    channel: "Guide",
    status: "Review",
    reach: "5.1K",
    publishedAt: "Pending",
  },
];

export const initialFeatures = [
  {
    id: "FTR-1",
    name: "Smart reminders",
    owner: "Product Team",
    exposure: "All users",
    rollout: 100,
    enabled: true,
  },
  {
    id: "FTR-2",
    name: "Advanced analytics",
    owner: "Growth Team",
    exposure: "Pro plans",
    rollout: 60,
    enabled: true,
  },
  {
    id: "FTR-3",
    name: "AI post assistant",
    owner: "Content Team",
    exposure: "Internal",
    rollout: 15,
    enabled: false,
  },
];

export const activityFeed = [
  "Arif moved a post to editorial review.",
  "Low-stock alert triggered for Team Ritual Pack.",
  "New enterprise admin approved for OptiZenqor Labs.",
  "Feature rollout updated for Advanced analytics.",
];

export const statusToneMap = {
  Active: "success",
  Published: "success",
  Enabled: "success",
  Review: "warning",
  Scheduled: "warning",
  "Low Stock": "warning",
  Suspended: "danger",
  Draft: "muted",
};
