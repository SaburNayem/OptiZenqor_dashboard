import { useEffect, useState } from "react";
import DashboardSection from "../../../shared/ui/DashboardSection";
import DataTable from "../../../shared/ui/DataTable";
import { adminRequest } from "../../../shared/api/adminApi";

function ContentPage() {
  const [state, setState] = useState({ loading: true, error: "", posts: [] });

  async function load() {
    try {
      const posts = await adminRequest("/admin/content");
      setState({ loading: false, error: "", posts });
    } catch (error) {
      setState({ loading: false, error: error.message || "Unable to load content.", posts: [] });
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function updatePost(postId, status) {
    await adminRequest(`/content/${postId}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    await load();
  }

  if (state.loading) return <div className="page-stack"><section className="panel-card"><p>Loading content...</p></section></div>;
  if (state.error) return <div className="page-stack"><section className="panel-card"><p className="auth-error">{state.error}</p></section></div>;

  return (
    <div className="page-stack">
      <DashboardSection title="Editorial and campaign content" subtitle="Control content status and publishing with live backend records.">
        <DataTable
          columns={["Post", "Type", "Published", "Status", "Actions"]}
          rows={state.posts.map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.type}</td>
              <td>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "Draft"}</td>
              <td>{post.status}</td>
              <td>
                <div className="action-row">
                  <button type="button" className="table-action" onClick={() => updatePost(post.id, "APPROVED")}>Approve</button>
                  <button type="button" className="table-action" onClick={() => updatePost(post.id, "PUBLISHED")}>Publish</button>
                  <button type="button" className="table-action danger" onClick={() => updatePost(post.id, "REJECTED")}>Reject</button>
                </div>
              </td>
            </tr>
          ))}
        />
      </DashboardSection>
    </div>
  );
}

export default ContentPage;
