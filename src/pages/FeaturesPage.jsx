import { DashboardSection } from "../components/ui";

function FeaturesPage({ features, toggleFeature }) {
  return (
    <div className="page-stack">
      <DashboardSection
        title="Feature rollout control"
        subtitle="Own feature flags, release exposure, and staged rollout decisions from a focused page."
      >
        <div className="feature-list">
          {features.map((feature) => (
            <article key={feature.id} className="feature-card">
              <div className="feature-topline">
                <div>
                  <h3>{feature.name}</h3>
                  <p>
                    {feature.owner} • {feature.exposure}
                  </p>
                </div>
                <button
                  type="button"
                  className={`toggle-pill ${feature.enabled ? "enabled" : ""}`}
                  onClick={() => toggleFeature(feature.id)}
                >
                  {feature.enabled ? "Enabled" : "Disabled"}
                </button>
              </div>
              <div className="rollout-row">
                <span>Rollout</span>
                <strong>{feature.rollout}%</strong>
              </div>
              <div className="progress-track">
                <span style={{ width: `${feature.rollout}%` }} />
              </div>
            </article>
          ))}
        </div>
      </DashboardSection>
    </div>
  );
}

export default FeaturesPage;
