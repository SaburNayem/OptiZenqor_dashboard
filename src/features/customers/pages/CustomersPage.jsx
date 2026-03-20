import DashboardSection from "../../../shared/ui/DashboardSection";
import DataTable from "../../../shared/ui/DataTable";
import SideDetailPanel from "../../../shared/feedback/SideDetailPanel";
import InsightCard from "../../../shared/ui/InsightCard";
import StatusBadge from "../../../shared/ui/StatusBadge";
import { useDashboard } from "../../../store/DashboardContext";
import CustomerFilters from "../components/CustomerFilters";
import { useCustomersController } from "../controller/customersController";

function CustomersPage() {
  const controller = useCustomersController();
  const dashboard = useDashboard();

  return (
    <div className="page-stack">
      <section className="content-grid">
        <div className="primary-column">
          <DashboardSection title="Customer and account management" subtitle="Search, review, and moderate customer states across the OptiZenqor ecosystem.">
            <CustomerFilters filters={controller.filters} setFilters={controller.setFilters} />
            <DataTable
              columns={["User", "Role", "Plan", "Orders", "Favorites", "Status", "Actions"]}
              rows={controller.users.map((user) => (
                <tr key={user.id} onClick={() => controller.setActiveCustomerId(user.id)}>
                  <td>
                    <div className="identity-cell">
                      <strong>{user.name}</strong>
                      <span>{user.email}</span>
                    </div>
                  </td>
                  <td>{user.role}</td>
                  <td>{user.plan}</td>
                  <td>{user.orders}</td>
                  <td>{user.favorites}</td>
                  <td>
                    <StatusBadge value={user.status} toneMap={dashboard.state.system.toneMap} />
                  </td>
                  <td>
                    <div className="action-row">
                      <button type="button" className="table-action" onClick={() => controller.updateCustomerStatus(user.id, "Active")}>
                        Activate
                      </button>
                      <button type="button" className="table-action danger" onClick={() => controller.updateCustomerStatus(user.id, "Suspended")}>
                        Suspend
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            />
          </DashboardSection>
        </div>

        <div className="secondary-column">
          <SideDetailPanel title="Customer detail" subtitle="Quick context for the currently selected account.">
            {controller.activeCustomer ? (
              <div className="feature-list">
                <article className="feature-card">
                  <h3>{controller.activeCustomer.name}</h3>
                  <p>{controller.activeCustomer.email}</p>
                  <p>{controller.activeCustomer.role} • {controller.activeCustomer.plan}</p>
                </article>
                <article className="feature-card">
                  <h3>Action history</h3>
                  <div className="activity-list">
                    {controller.activeCustomer.history.map((item) => (
                      <article key={item.id} className="activity-item">
                        <span className="activity-dot" />
                        <p>{item.action} • {item.time}</p>
                      </article>
                    ))}
                  </div>
                </article>
              </div>
            ) : null}
          </SideDetailPanel>

          <DashboardSection title="Account actions" subtitle="Actions mirrored from the customer-facing account experience.">
            <div className="feature-list">
              {controller.accountActions.map((action) => (
                <article key={action.title} className="feature-card">
                  <h3>{action.title}</h3>
                  <p>{action.subtitle}</p>
                </article>
              ))}
            </div>
          </DashboardSection>
        </div>
      </section>

      <section className="card-grid">
        <InsightCard eyebrow="Customers" title="Active accounts" value={dashboard.state.customers.users.filter((user) => user.status === "Active").length} description="Healthy customer accounts currently able to transact." />
        <InsightCard eyebrow="Customers" title="Under review" value={dashboard.state.customers.users.filter((user) => user.status === "Review").length} description="Accounts that still need admin attention." />
        <InsightCard eyebrow="Customers" title="Favorites" value={dashboard.state.customers.users.reduce((sum, user) => sum + user.favorites, 0)} description="Favorites across the customer base for quick engagement context." />
      </section>
    </div>
  );
}

export default CustomersPage;
