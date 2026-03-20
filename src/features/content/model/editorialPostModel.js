export function createEditorialPostModel(post) {
  return {
    id: post.id,
    title: post.title,
    author: post.author,
    channel: post.channel,
    type: post.type ?? post.channel,
    status: post.status,
    reach: post.reach,
    publishedAt: post.publishedAt,
    homepagePlacement: post.homepagePlacement ?? "None",
  };
}
