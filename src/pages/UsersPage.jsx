import { DashboardSection, DataTable, StatusBadge } from "../components/ui";

function UsersPage({ users, cycleUserStatus, statusToneMap }) {
  const activeUsers = users.filter((user) => user.status === "Active").length;
  const reviewUsers = users.filter((user) => user.status === "Review").length;

  return (
    <div className="page-stack">
      <section className="card-grid">
        <article className="insight-card">
          <p className="eyebrow">Users</p>
          <h3>Access summary</h3>
          <strong>{users.length}</strong>
          <p>Total managed users in the dashboard.</p>
        </article>
        <article className="insight-card">
          <p className="eyebrow">Users</p>
          <h3>Currently active</h3>
          <strong>{activeUsers}</strong>
          <p>Accounts with active platform access right now.</p>
        </article>
        <article className="insight-card">
          <p className="eyebrow">Users</p>
          <h3>Needs review</h3>
          <strong>{reviewUsers}</strong>
          <p>Profiles waiting moderation or manual approval.</p>
        </article>
      </section>

      <DashboardSection
        title="User control center"
        subtitle="Manage roles, plans, status changes, and recent user activity from its own page."
      >
        <DataTable
          columns={["User", "Role", "Plan", "Status", "Last seen", "Action"]}
          rows={users.map((user) => (
            <tr key={user.id}>
              <td>
                <div className="identity-cell">
                  <strong>{user.name}</strong>
                  <span>{user.email}</span>
                </div>
              </td>
              <td>{user.role}</td>
              <td>{user.plan}</td>
              <td>
                <StatusBadge value={user.status} statusToneMap={statusToneMap} />
              </td>
              <td>{user.lastSeen}</td>
              <td>
                <button
                  type="button"
                  className="table-action"
                  onClick={() => cycleUserStatus(user.id)}
                >
                  Update state
                </button>
              </td>
            </tr>
          ))}
        />
      </DashboardSection>
    </div>
  );
}

export default UsersPage;
