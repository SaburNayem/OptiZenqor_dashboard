import { useMemo, useState } from "react";
import { filterCustomers } from "../services/customerService";
import { useDashboard } from "../../../store/DashboardContext";

export function useCustomersController() {
  const dashboard = useDashboard();
  const [filters, setFilters] = useState({
    search: "",
    role: "All",
    plan: "All",
    status: "All",
  });
  const [activeCustomerId, setActiveCustomerId] = useState(dashboard.state.customers.users[0]?.id ?? "");

  const users = dashboard.state.customers.users;
  const filteredUsers = useMemo(() => filterCustomers(users, filters), [users, filters]);
  const activeCustomer =
    users.find((user) => user.id === activeCustomerId) ?? filteredUsers[0] ?? null;

  return {
    filters,
    setFilters,
    users: filteredUsers,
    activeCustomer,
    accountActions: dashboard.state.customers.accountActions,
    setActiveCustomerId,
    updateCustomerStatus: dashboard.updateCustomerStatus,
  };
}
