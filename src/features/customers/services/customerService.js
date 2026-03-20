import { accountActions, users } from "../../../store/data/customers";
import { createCustomerModel } from "../model/customerModel";

export function createCustomerSeed() {
  return {
    users: users.map(createCustomerModel),
    accountActions: [...accountActions],
  };
}

export function updateCustomerStatus(usersList, userId, status) {
  return usersList.map((user) =>
    user.id === userId
      ? {
          ...user,
          status,
          history: [
            { id: `${user.id}-${Date.now()}`, action: `Status changed to ${status}`, time: "Now" },
            ...user.history,
          ],
        }
      : user,
  );
}

export function filterCustomers(usersList, filters) {
  return usersList.filter((user) => {
    const matchesSearch =
      !filters.search ||
      user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      user.email.toLowerCase().includes(filters.search.toLowerCase());
    const matchesRole = filters.role === "All" || user.role === filters.role;
    const matchesPlan = filters.plan === "All" || user.plan === filters.plan;
    const matchesStatus = filters.status === "All" || user.status === filters.status;

    return matchesSearch && matchesRole && matchesPlan && matchesStatus;
  });
}
