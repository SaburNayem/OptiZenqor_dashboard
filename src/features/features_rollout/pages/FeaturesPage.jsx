import DashboardSection from "../../../shared/ui/DashboardSection";
import { useFeaturesController } from "../controller/featuresController";

function FeaturesPage() {
  const controller = useFeaturesController();

  return (
    <div className="page-stack">
      <DashboardSection title="Feature rollout control" subtitle="Manage enabled state, rollout percentage, and environment targeting.">
        <div className="feature-list">
          {controller.features.map((feature) => (
            <article key={feature.id} className="feature-card">
              <div className="feature-topline">
                <div>
                  <h3>{feature.name}</h3>
                  <p>{feature.owner} • {feature.exposure}</p>
                </div>
                <button
                  type="button"
                  className={`toggle-pill ${feature.enabled ? "enabled" : ""}`}
                  onClick={() => controller.toggleFeature(feature.id)}
                >
                  {feature.enabled ? "Enabled" : "Disabled"}
                </button>
              </div>

              <div className="split-fields">
                <label>
                  Rollout %
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={feature.rollout}
                    onChange={(event) => controller.updateFeatureRollout(feature.id, event.target.value)}
                  />
                </label>
                <label>
                  Environment
                  <select
                    value={feature.environment}
                    onChange={(event) => controller.updateFeatureEnvironment(feature.id, event.target.value)}
                  >
                    <option value="internal">internal</option>
                    <option value="beta">beta</option>
                    <option value="public">public</option>
                  </select>
                </label>
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
