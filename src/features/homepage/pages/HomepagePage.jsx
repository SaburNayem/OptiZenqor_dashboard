import { useEffect, useState } from "react";
import DashboardSection from "../../../shared/ui/DashboardSection";
import { adminRequest } from "../../../shared/api/adminApi";

function HomepagePage() {
  const [state, setState] = useState({ loading: true, error: "", sections: [], status: "" });

  async function load() {
    try {
      const sections = await adminRequest("/homepage/admin");
      setState((current) => ({ ...current, loading: false, error: "", sections }));
    } catch (error) {
      setState((current) => ({ ...current, loading: false, error: error.message || "Unable to load homepage sections." }));
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function updateSection(section, updates) {
    setState((current) => ({ ...current, status: "Saving changes..." }));
    await adminRequest(`/homepage/${section.key}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    });
    await load();
    setState((current) => ({ ...current, status: `Updated "${section.title}".` }));
  }

  if (state.loading) return <div className="page-stack"><section className="panel-card"><p>Loading homepage...</p></section></div>;
  if (state.error) return <div className="page-stack"><section className="panel-card"><p className="auth-error">{state.error}</p></section></div>;

  return (
    <div className="page-stack">
      {state.status ? <section className="panel-card"><p className="status-inline">{state.status}</p></section> : null}
      <DashboardSection title="Homepage management" subtitle="Control live homepage sections for app and web surfaces.">
        <div className="feature-list">
          {state.sections.map((section) => (
            <article key={section.key} className="feature-card">
              <div className="feature-topline">
                <div>
                  <h3>{section.title}</h3>
                  <p>{section.key}</p>
                </div>
                <button type="button" className={`toggle-pill ${section.isActive ? "enabled" : ""}`} onClick={() => updateSection(section, { isActive: !section.isActive })}>
                  {section.isActive ? "Visible" : "Hidden"}
                </button>
              </div>
              <textarea
                rows="5"
                defaultValue={JSON.stringify(section.contentJson || {}, null, 2)}
                onBlur={(event) => {
                  try {
                    const contentJson = JSON.parse(event.target.value);
                    updateSection(section, { contentJson });
                  } catch {
                    setState((current) => ({ ...current, status: `Invalid JSON for "${section.title}".` }));
                  }
                }}
              />
            </article>
          ))}
        </div>
      </DashboardSection>
    </div>
  );
}

export default HomepagePage;
