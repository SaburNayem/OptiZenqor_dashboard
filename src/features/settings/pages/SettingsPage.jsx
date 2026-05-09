import { useEffect, useState } from "react";
import DashboardSection from "../../../shared/ui/DashboardSection";
import { adminRequest } from "../../../shared/api/adminApi";

function SettingsPage() {
  const [state, setState] = useState({ loading: true, error: "", user: null, config: [], status: "" });

  async function load() {
    try {
      const [user, config] = await Promise.all([
        adminRequest("/auth/me"),
        adminRequest("/system/config"),
      ]);
      setState((current) => ({ ...current, loading: false, error: "", user, config }));
    } catch (error) {
      setState((current) => ({ ...current, loading: false, error: error.message || "Unable to load settings." }));
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function saveConfig(key, value) {
    await adminRequest(`/system/config/${key}`, {
      method: "PATCH",
      body: JSON.stringify({ value, description: "Managed from dashboard settings" }),
    });
    await load();
    setState((current) => ({ ...current, status: `${key} updated.` }));
  }

  if (state.loading) return <div className="page-stack"><section className="panel-card"><p>Loading settings...</p></section></div>;
  if (state.error) return <div className="page-stack"><section className="panel-card"><p className="auth-error">{state.error}</p></section></div>;

  return (
    <div className="page-stack">
      <DashboardSection title="Admin settings" subtitle="Admin identity plus live system configuration values.">
        <div className="feature-list">
          <article className="feature-card">
            <h3>{state.user.fullName}</h3>
            <p>{state.user.email}</p>
            <p>{state.user.role}</p>
          </article>
        </div>

        {state.status ? <p className="status-inline">{state.status}</p> : null}

        <div className="feature-list">
          {state.config.map((item) => (
            <article key={item.id} className="feature-card">
              <label>
                {item.key}
                <input defaultValue={item.value} onBlur={(event) => saveConfig(item.key, event.target.value)} />
              </label>
              <p>{item.description || "Managed from dashboard settings"}</p>
            </article>
          ))}
        </div>
      </DashboardSection>
    </div>
  );
}

export default SettingsPage;
