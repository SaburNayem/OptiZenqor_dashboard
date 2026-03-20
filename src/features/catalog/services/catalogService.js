import { categories, homeHighlights, offerTabs, products } from "../../../store/data/catalog";
import { createCategoryModel } from "../../categories/model/categoryModel";
import { createProductModel } from "../model/productModel";

export function createCatalogSeed() {
  return {
    products: products.map((product, index) =>
      createProductModel({
        ...product,
        offerTags: product.offerTags ?? [],
        featured: index < 4,
        popular: product.sales > 100,
        visible: true,
      }),
    ),
    categories: categories.map(createCategoryModel),
    offerTabs: [...offerTabs],
    homeHighlights: [...homeHighlights],
  };
}

export function addProduct(productsList, form) {
  const nextId = `p${productsList.length + 1}`;

  return [
    createProductModel({
      id: nextId,
      ...form,
      sales: 0,
      rating: 4.5,
    }),
    ...productsList,
  ];
}

export function updateProduct(productsList, productId, updates) {
  return productsList.map((product) =>
    product.id === productId ? createProductModel({ ...product, ...updates }) : product,
  );
}

export function deleteProduct(productsList, productId) {
  return productsList.filter((product) => product.id !== productId);
}

export function addOfferTab(offerList, label) {
  const nextLabel = label.trim();
  if (!nextLabel || offerList.includes(nextLabel)) return offerList;
  return [...offerList, nextLabel];
}

export function getCatalogStats(productsList, offerList) {
  return {
    productCount: productsList.length,
    featuredCount: productsList.filter((product) => product.featured).length,
    lowStockCount: productsList.filter((product) => product.inventory <= 10).length,
    visibleCount: productsList.filter((product) => product.visible).length,
    offerCount: offerList.length,
  };
}
