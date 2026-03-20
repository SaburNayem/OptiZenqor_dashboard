import { DashboardSection, QuickSummary, StatusBadge } from "../components/ui";

function OverviewPage({
  stats,
  users,
  products,
  posts,
  features,
  activityFeed,
  statusToneMap,
}) {
  const spotlightCards = [
    {
      title: "User governance",
      value: `${users.filter((user) => user.status === "Active").length} active accounts`,
      description: "Control access, review team roles, and keep account health visible.",
    },
    {
      title: "Catalog health",
      value: `${products.filter((product) => product.status === "Published").length} products live`,
      description: "See inventory pressure and publishing state before customers do.",
    },
    {
      title: "Editorial flow",
      value: `${posts.filter((post) => post.status === "Review").length} waiting review`,
      description: "Move stories from drafts to campaigns with clearer ownership.",
    },
  ];

  return (
    <div className="page-stack">
      <QuickSummary items={stats} />

      <section className="card-grid three-up">
        {spotlightCards.map((card) => (
          <article key={card.title} className="insight-card">
            <p className="eyebrow">Overview</p>
            <h3>{card.title}</h3>
            <strong>{card.value}</strong>
            <p>{card.description}</p>
          </article>
        ))}
      </section>

      <section className="content-grid">
        <div className="primary-column">
          <DashboardSection
            title="Recent operations"
            subtitle="The fastest view into what changed across the back office."
          >
            <div className="activity-list">
              {activityFeed.map((item) => (
                <article key={item} className="activity-item">
                  <span className="activity-dot" />
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </DashboardSection>
        </div>

        <div className="secondary-column">
          <DashboardSection
            title="Feature snapshot"
            subtitle="Current rollout health across live and staged features."
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
                    <StatusBadge
                      value={feature.enabled ? "Enabled" : "Draft"}
                      statusToneMap={statusToneMap}
                    />
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
      </section>
    </div>
  );
}

export default OverviewPage;
