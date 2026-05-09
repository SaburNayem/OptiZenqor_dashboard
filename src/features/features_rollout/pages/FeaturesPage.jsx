import { useEffect, useState } from "react";
import DashboardSection from "../../../shared/ui/DashboardSection";
import { adminRequest } from "../../../shared/api/adminApi";

function FeaturesPage() {
  const [state, setState] = useState({ loading: true, error: "", features: [] });

  async function load() {
    try {
      const features = await adminRequest("/features");
      setState({ loading: false, error: "", features });
    } catch (error) {
      setState({ loading: false, error: error.message || "Unable to load features.", features: [] });
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function updateFeature(id, updates) {
    await adminRequest(`/features/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    });
    await load();
  }

  if (state.loading) return <div className="page-stack"><section className="panel-card"><p>Loading feature flags...</p></section></div>;
  if (state.error) return <div className="page-stack"><section className="panel-card"><p className="auth-error">{state.error}</p></section></div>;

  return (
    <div className="page-stack">
      <DashboardSection title="Feature rollout control" subtitle="Manage enabled state, rollout percentage, and environment targeting from the backend.">
        <div className="feature-list">
          {state.features.map((feature) => (
            <article key={feature.id} className="feature-card">
              <div className="feature-topline">
                <div>
                  <h3>{feature.label}</h3>
                  <p>{feature.key} · {feature.environment}</p>
                </div>
                <button type="button" className={`toggle-pill ${feature.isEnabled ? "enabled" : ""}`} onClick={() => updateFeature(feature.id, { isEnabled: !feature.isEnabled })}>
                  {feature.isEnabled ? "Enabled" : "Disabled"}
                </button>
              </div>
              <div className="split-fields">
                <label>
                  Rollout %
                  <input type="number" min="0" max="100" value={feature.rolloutPercentage} onChange={(event) => updateFeature(feature.id, { rolloutPercentage: Number(event.target.value) })} />
                </label>
                <label>
                  Environment
                  <select value={feature.environment} onChange={(event) => updateFeature(feature.id, { environment: event.target.value })}>
                    {["INTERNAL", "BETA", "PUBLIC"].map((value) => <option key={value} value={value}>{value}</option>)}
                  </select>
                </label>
              </div>
            </article>
          ))}
        </div>
      </DashboardSection>
    </div>
  );
}

export default FeaturesPage;
