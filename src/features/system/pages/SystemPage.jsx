import DashboardSection from "../../../shared/ui/DashboardSection";
import DataTable from "../../../shared/ui/DataTable";
import StatusBadge from "../../../shared/ui/StatusBadge";
import { useSystemController } from "../controller/systemController";

function SystemPage() {
  const controller = useSystemController();

  return (
    <div className="page-stack">
      <section className="card-grid">
        {controller.system.healthCards.map((card) => (
          <article key={card.label} className="insight-card">
            <p className="eyebrow">Health</p>
            <h3>{card.label}</h3>
            <strong>{card.value}</strong>
            <p>{card.detail}</p>
          </article>
        ))}
      </section>

      <section className="content-grid">
        <div className="primary-column">
          <DashboardSection
            title="API endpoint coverage"
            subtitle="Mock API-ready endpoint monitoring for app, storefront, and admin platform services."
            action={
              <button type="button" className="primary-button" onClick={controller.refreshSystem}>
                Refresh check
              </button>
            }
          >
            <DataTable
              columns={["Endpoint", "Purpose", "Latency", "Status"]}
              rows={controller.system.apiConfig.endpoints.map((endpoint) => (
                <tr key={endpoint.path}>
                  <td>{endpoint.path}</td>
                  <td>{endpoint.purpose}</td>
                  <td>{endpoint.latency}</td>
                  <td>
                    <StatusBadge value={endpoint.status} toneMap={controller.system.toneMap} />
                  </td>
                </tr>
              ))}
            />
          </DashboardSection>
        </div>

        <div className="secondary-column">
          <DashboardSection title="Environment and config" subtitle="Technical settings extracted from the current service layer.">
            <div className="feature-list">
              <article className="feature-card">
                <h3>Base URL</h3>
                <p>{controller.system.apiConfig.baseUrl}</p>
              </article>
              <article className="feature-card">
                <h3>Environment</h3>
                <p>Mock production mirror</p>
              </article>
            </div>
          </DashboardSection>
        </div>
      </section>

      <DashboardSection title="Authentication service flow" subtitle="Current mock auth behavior and route availability.">
        <DataTable
          columns={["Flow", "Behavior", "Status"]}
          rows={controller.system.authFlows.map((flow) => (
            <tr key={flow.key}>
              <td>{flow.key}</td>
              <td>{flow.detail}</td>
              <td>
                <StatusBadge value={flow.status} toneMap={controller.system.toneMap} />
              </td>
            </tr>
          ))}
        />
      </DashboardSection>
    </div>
  );
}

export default SystemPage;
