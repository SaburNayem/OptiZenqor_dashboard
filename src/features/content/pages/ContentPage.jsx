import DashboardSection from "../../../shared/ui/DashboardSection";
import DataTable from "../../../shared/ui/DataTable";
import InsightCard from "../../../shared/ui/InsightCard";
import StatusBadge from "../../../shared/ui/StatusBadge";
import { useContentController } from "../controller/contentController";

function ContentPage() {
  const controller = useContentController();

  return (
    <div className="page-stack">
      <section className="content-grid">
        <div className="primary-column">
          <DashboardSection title="Editorial and campaign content" subtitle="Control content status, publish timing, and homepage placement.">
            <DataTable
              columns={["Post", "Author", "Type", "Reach", "Publish date", "Placement", "Status", "Actions"]}
              rows={controller.posts.map((post) => (
                <tr key={post.id}>
                  <td>
                    <div className="identity-cell">
                      <strong>{post.title}</strong>
                      <span>{post.id}</span>
                    </div>
                  </td>
                  <td>{post.author}</td>
                  <td>{post.type}</td>
                  <td>{post.reach}</td>
                  <td>{post.publishedAt}</td>
                  <td>
                    <select
                      value={post.homepagePlacement}
                      onChange={(event) =>
                        controller.updatePost(post.id, { homepagePlacement: event.target.value })
                      }
                    >
                      <option>None</option>
                      <option>Hero</option>
                      <option>Highlights</option>
                      <option>Featured Story</option>
                    </select>
                  </td>
                  <td>
                    <StatusBadge value={post.status} toneMap={controller.toneMap} />
                  </td>
                  <td>
                    <div className="action-row">
                      <button type="button" className="table-action" onClick={() => controller.updatePostStatus(post.id, "Approved")}>
                        Approve
                      </button>
                      <button type="button" className="table-action" onClick={() => controller.updatePostStatus(post.id, "Published")}>
                        Publish
                      </button>
                      <button type="button" className="table-action danger" onClick={() => controller.updatePostStatus(post.id, "Rejected")}>
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            />
          </DashboardSection>
        </div>

        <div className="secondary-column">
          <DashboardSection title="Drawer content" subtitle="Links mirrored from the web drawer and support shell.">
            <div className="pill-grid">
              {controller.drawerItems.map((item) => (
                <span key={item} className="filter-pill">
                  {item}
                </span>
              ))}
            </div>
          </DashboardSection>
        </div>
      </section>

      <section className="card-grid">
        {controller.contentHighlights.map((item) => (
          <InsightCard key={item} eyebrow="Highlights" title="Homepage message" value="Ready" description={item} />
        ))}
      </section>
    </div>
  );
}

export default ContentPage;
