import { contentHighlights, drawerItems, posts } from "../../../store/data/content";
import { createEditorialPostModel } from "../model/editorialPostModel";

export function createContentSeed() {
  return {
    posts: posts.map((post) =>
      createEditorialPostModel({
        ...post,
        status: post.status === "Published" ? "Published" : post.status,
        type: post.channel,
      }),
    ),
    drawerItems: [...drawerItems],
    contentHighlights: [...contentHighlights],
  };
}

export function updatePost(postsList, postId, updates) {
  return postsList.map((post) =>
    post.id === postId ? createEditorialPostModel({ ...post, ...updates }) : post,
  );
}
