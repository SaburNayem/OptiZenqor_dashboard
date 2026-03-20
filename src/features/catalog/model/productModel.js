export function createProductModel(product) {
  return {
    id: product.id,
    name: product.name,
    categoryId: product.categoryId,
    categoryName: product.categoryName,
    categoryIds: product.categoryIds ?? [product.categoryId],
    categoryNames: product.categoryNames ?? [product.categoryName],
    price: Number(product.price),
    rating: Number(product.rating ?? 0),
    imageUrl: product.imageUrl,
    description: product.description,
    inventory: Number(product.inventory ?? 0),
    status: product.status ?? "Draft",
    offerTags: product.offerTags ?? [],
    sales: Number(product.sales ?? 0),
    featured: Boolean(product.featured),
    popular: Boolean(product.popular),
    visible: product.visible ?? true,
  };
}
