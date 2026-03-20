function CustomerFilters({ filters, setFilters }) {
  return (
    <div className="filter-row">
      <input
        placeholder="Search customer"
        value={filters.search}
        onChange={(event) => setFilters((current) => ({ ...current, search: event.target.value }))}
      />
      <select value={filters.role} onChange={(event) => setFilters((current) => ({ ...current, role: event.target.value }))}>
        <option>All</option>
        <option>Admin</option>
        <option>Editor</option>
        <option>Moderator</option>
        <option>Support</option>
      </select>
      <select value={filters.plan} onChange={(event) => setFilters((current) => ({ ...current, plan: event.target.value }))}>
        <option>All</option>
        <option>Enterprise</option>
        <option>Growth</option>
        <option>Starter</option>
      </select>
      <select value={filters.status} onChange={(event) => setFilters((current) => ({ ...current, status: event.target.value }))}>
        <option>All</option>
        <option>Active</option>
        <option>Review</option>
        <option>Suspended</option>
      </select>
    </div>
  );
}

export default CustomerFilters;
