import DashboardSection from "../../../shared/ui/DashboardSection";
import InsightCard from "../../../shared/ui/InsightCard";
import StatusBadge from "../../../shared/ui/StatusBadge";
import SummaryGrid from "../../../shared/ui/SummaryGrid";
import { useOverviewController } from "../controller/overviewController";

function OverviewPage() {
  const controller = useOverviewController();

  return (
    <div className="page-stack">
      <SummaryGrid items={controller.stats} />

      <section className="card-grid three-up">
        <InsightCard
          eyebrow="Commerce"
          title="Catalog readiness"
          value={`${controller.products.filter((item) => item.status === "Published").length} products live`}
          description="Products, offers, and visibility settings can now be managed centrally."
        />
        <InsightCard
          eyebrow="Customers"
          title="Account health"
          value={`${controller.users.filter((item) => item.status === "Active").length} active users`}
          description="Customer management now supports search, status handling, and order-linked review."
        />
        <InsightCard
          eyebrow="Platform"
          title="System coverage"
          value={`${controller.systemEndpoints.length} monitored endpoints`}
          description="App, website, and admin platform surfaces now share one operational view."
        />
      </section>

      <section className="content-grid">
        <div className="primary-column">
          <DashboardSection title="Operations feed" subtitle="Current activity across commerce, content, support, and platform surfaces.">
            <div className="activity-list">
              {controller.activityFeed.map((item) => (
                <article key={item} className="activity-item">
                  <span className="activity-dot" />
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </DashboardSection>
        </div>

        <div className="secondary-column">
          <DashboardSection title="Auth flow health" subtitle="A compact view of authentication and access-related flows.">
            <div className="feature-list">
              {controller.authFlows.map((flow) => (
                <article key={flow.key} className="feature-card">
                  <div className="feature-topline">
                    <div>
                      <h3>{flow.key}</h3>
                      <p>{flow.detail}</p>
                    </div>
                    <StatusBadge value={flow.status} toneMap={controller.toneMap} />
                  </div>
                </article>
              ))}
            </div>
          </DashboardSection>
        </div>
      </section>
    </div>
  );
}

export default OverviewPage;
