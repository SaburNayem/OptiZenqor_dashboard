import { useDashboard } from "../../../store/DashboardContext";

export function useContentController() {
  const dashboard = useDashboard();

  function updatePostStatus(postId, status) {
    dashboard.updatePost(postId, {
      status,
      publishedAt: status === "Published" || status === "Approved" ? "Today" : "Pending",
    });
  }

  return {
    posts: dashboard.state.content.posts,
    drawerItems: dashboard.state.content.drawerItems,
    contentHighlights: dashboard.state.content.contentHighlights,
    toneMap: dashboard.state.system.toneMap,
    updatePost: dashboard.updatePost,
    updatePostStatus,
  };
}
