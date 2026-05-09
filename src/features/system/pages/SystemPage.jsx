import { useEffect, useState } from "react";
import DashboardSection from "../../../shared/ui/DashboardSection";
import DataTable from "../../../shared/ui/DataTable";
import { adminRequest } from "../../../shared/api/adminApi";

function SystemPage() {
  const [state, setState] = useState({ loading: true, error: "", health: null, config: [] });

  async function load() {
    try {
      const [health, config] = await Promise.all([
        adminRequest("/system/health"),
        adminRequest("/system/config"),
      ]);
      setState({ loading: false, error: "", health, config });
    } catch (error) {
      setState({ loading: false, error: error.message || "Unable to load system status.", health: null, config: [] });
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (state.loading) return <div className="page-stack"><section className="panel-card"><p>Loading system health...</p></section></div>;
  if (state.error) return <div className="page-stack"><section className="panel-card"><p className="auth-error">{state.error}</p></section></div>;

  return (
    <div className="page-stack">
      <section className="card-grid">
        <article className="insight-card">
          <p className="eyebrow">Health</p>
          <h3>Service status</h3>
          <strong>{state.health.status}</strong>
          <p>{state.health.service}</p>
        </article>
        <article className="insight-card">
          <p className="eyebrow">Health</p>
          <h3>Uptime</h3>
          <strong>{Math.round(state.health.uptime)}s</strong>
          <p>Current backend runtime.</p>
        </article>
        <article className="insight-card">
          <p className="eyebrow">Config</p>
          <h3>Tracked keys</h3>
          <strong>{state.config.length}</strong>
          <p>System configuration values managed in the database.</p>
        </article>
      </section>

      <DashboardSection title="System configuration" subtitle="Live configuration values coming from the backend.">
        <DataTable
          columns={["Key", "Value", "Description"]}
          rows={state.config.map((item) => (
            <tr key={item.id}>
              <td>{item.key}</td>
              <td>{item.value}</td>
              <td>{item.description || "System-managed config value"}</td>
            </tr>
          ))}
        />
      </DashboardSection>
    </div>
  );
}

export default SystemPage;
