export function createCategoryModel(category) {
  return {
    id: category.id,
    name: category.name,
    icon: category.icon,
    bannerTitle: category.bannerTitle,
  };
}
