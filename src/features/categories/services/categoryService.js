export function getCategoryRows(categories, products) {
  return categories.map((category) => ({
    ...category,
    productCount: products.filter((product) => product.categoryIds.includes(category.id)).length,
    readiness: products.some((product) => product.categoryIds.includes(category.id)) ? "Ready" : "Empty",
  }));
}
