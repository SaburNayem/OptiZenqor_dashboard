import { DashboardSection, DataTable, StatusBadge } from "../components/ui";

function PostsPage({
  posts,
  postForm,
  setPostForm,
  handlePostSubmit,
  cyclePostStatus,
  statusToneMap,
}) {
  return (
    <div className="page-stack">
      <section className="content-grid">
        <div className="primary-column">
          <DashboardSection
            title="Editorial workflow"
            subtitle="Handle blog posts, campaigns, and product updates in a separate publishing area."
          >
            <DataTable
              columns={["Post", "Author", "Channel", "Reach", "Status", "Action"]}
              rows={posts.map((post) => (
                <tr key={post.id}>
                  <td>
                    <div className="identity-cell">
                      <strong>{post.title}</strong>
                      <span>{post.publishedAt}</span>
                    </div>
                  </td>
                  <td>{post.author}</td>
                  <td>{post.channel}</td>
                  <td>{post.reach}</td>
                  <td>
                    <StatusBadge value={post.status} statusToneMap={statusToneMap} />
                  </td>
                  <td>
                    <button
                      type="button"
                      className="table-action"
                      onClick={() => cyclePostStatus(post.id)}
                    >
                      Move stage
                    </button>
                  </td>
                </tr>
              ))}
            />
          </DashboardSection>
        </div>

        <div className="secondary-column">
          <DashboardSection
            title="Create new post"
            subtitle="Send new content into review directly from the editorial page."
          >
            <form className="form-card" onSubmit={handlePostSubmit}>
              <label>
                Title
                <input
                  value={postForm.title}
                  onChange={(event) =>
                    setPostForm((current) => ({
                      ...current,
                      title: event.target.value,
                    }))
                  }
                  placeholder="Post headline"
                />
              </label>
              <label>
                Author
                <input
                  value={postForm.author}
                  onChange={(event) =>
                    setPostForm((current) => ({
                      ...current,
                      author: event.target.value,
                    }))
                  }
                  placeholder="Writer name"
                />
              </label>
              <label>
                Channel
                <select
                  value={postForm.channel}
                  onChange={(event) =>
                    setPostForm((current) => ({
                      ...current,
                      channel: event.target.value,
                    }))
                  }
                >
                  <option>Blog</option>
                  <option>News</option>
                  <option>Guide</option>
                  <option>Campaign</option>
                </select>
              </label>
              <button type="submit" className="primary-button alt">
                Create post
              </button>
            </form>
          </DashboardSection>
        </div>
      </section>
    </div>
  );
}

export default PostsPage;
