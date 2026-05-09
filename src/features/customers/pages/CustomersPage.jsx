import { useEffect, useMemo, useState } from "react";
import DashboardSection from "../../../shared/ui/DashboardSection";
import DataTable from "../../../shared/ui/DataTable";
import InsightCard from "../../../shared/ui/InsightCard";
import { adminRequest } from "../../../shared/api/adminApi";

function CustomersPage() {
  const [state, setState] = useState({ loading: true, error: "", customers: [] });

  async function load() {
    try {
      const customers = await adminRequest("/admin/customers");
      setState({ loading: false, error: "", customers });
    } catch (error) {
      setState({ loading: false, error: error.message || "Unable to load customers.", customers: [] });
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function updateStatus(id, status) {
    await adminRequest(`/admin/customers/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    await load();
  }

  const activeCustomers = useMemo(
    () => state.customers.filter((customer) => customer.status === "ACTIVE").length,
    [state.customers],
  );

  if (state.loading) return <div className="page-stack"><section className="panel-card"><p>Loading customers...</p></section></div>;
  if (state.error) return <div className="page-stack"><section className="panel-card"><p className="auth-error">{state.error}</p></section></div>;

  return (
    <div className="page-stack">
      <section className="card-grid">
        <InsightCard eyebrow="Customers" title="Total customers" value={state.customers.length} description="Customer accounts loaded from the live backend." />
        <InsightCard eyebrow="Customers" title="Active accounts" value={activeCustomers} description="Accounts currently able to log in and transact." />
        <InsightCard eyebrow="Customers" title="Pending review" value={state.customers.filter((customer) => customer.status === "PENDING").length} description="Accounts waiting for admin action or follow-up." />
      </section>

      <DashboardSection title="Customer and account management" subtitle="Review and moderate live customer states across the OptiZenqor ecosystem.">
        <DataTable
          columns={["User", "Email", "Phone", "Orders", "Status", "Actions"]}
          rows={state.customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.fullName}</td>
              <td>{customer.email}</td>
              <td>{customer.phone || "Not provided"}</td>
              <td>{customer.orders.length}</td>
              <td>{customer.status}</td>
              <td>
                <div className="action-row">
                  <button type="button" className="table-action" onClick={() => updateStatus(customer.id, "ACTIVE")}>Activate</button>
                  <button type="button" className="table-action danger" onClick={() => updateStatus(customer.id, "SUSPENDED")}>Suspend</button>
                </div>
              </td>
            </tr>
          ))}
        />
      </DashboardSection>
    </div>
  );
}

export default CustomersPage;
