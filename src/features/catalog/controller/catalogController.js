import { useMemo, useState } from "react";
import { validateOffer, validateProduct } from "../../../core/utils/validation";
import { useDashboard } from "../../../store/DashboardContext";

export function useCatalogController() {
  const dashboard = useDashboard();
  const categories = dashboard.state.catalog.categories;
  const [editingId, setEditingId] = useState("");
  const [offerError, setOfferError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [newOfferTab, setNewOfferTab] = useState("");
  const [form, setForm] = useState(() => getInitialForm(categories));

  const products = dashboard.state.catalog.products;
  const offerTabs = dashboard.state.catalog.offerTabs;
  const stats = dashboard.catalogStats;

  function resetForm() {
    setEditingId("");
    setForm(getInitialForm(categories));
    setFormErrors({});
  }

  function startEdit(product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      categoryIds: product.categoryIds,
      categoryNames: product.categoryNames,
      primaryCategoryId: product.categoryId,
      primaryCategoryName: product.categoryName,
      offerTags: product.offerTags,
      price: String(product.price),
      inventory: String(product.inventory),
      imageUrl: product.imageUrl,
      description: product.description,
      status: product.status,
      featured: product.featured,
      popular: product.popular,
      visible: product.visible,
    });
  }

  function toggleCategory(category) {
    setForm((current) => {
      const exists = current.categoryIds.includes(category.id);
      const categoryIds = exists
        ? current.categoryIds.filter((id) => id !== category.id)
        : [...current.categoryIds, category.id];
      const categoryNames = categories
        .filter((item) => categoryIds.includes(item.id))
        .map((item) => item.name);
      const primaryCategoryId = categoryIds.includes(current.primaryCategoryId)
        ? current.primaryCategoryId
        : categoryIds[0] || categories[0].id;
      const primaryCategoryName =
        categories.find((item) => item.id === primaryCategoryId)?.name || categories[0].name;

      return {
        ...current,
        categoryIds,
        categoryNames,
        primaryCategoryId,
        primaryCategoryName,
      };
    });
  }

  function toggleOfferTab(tab) {
    setForm((current) => ({
      ...current,
      offerTags: current.offerTags.includes(tab)
        ? current.offerTags.filter((item) => item !== tab)
        : [...current.offerTags, tab],
    }));
  }

  function handleImageFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setForm((current) => ({ ...current, imageUrl: previewUrl }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const errors = validateProduct(form);
    setFormErrors(errors);
    if (Object.keys(errors).length) return;

    const payload = {
      ...form,
      price: Number(form.price),
      inventory: Number(form.inventory),
    };

    if (editingId) {
      dashboard.updateProduct(editingId, payload);
    } else {
      dashboard.addProduct(payload);
    }

    resetForm();
  }

  function handleAddOfferTab(event) {
    event.preventDefault();
    const errors = validateOffer(newOfferTab);
    if (errors.label) {
      setOfferError(errors.label);
      return;
    }

    dashboard.addOfferTab(newOfferTab);
    setNewOfferTab("");
    setOfferError("");
  }

  const lowStockProducts = useMemo(
    () => products.filter((product) => product.inventory <= 10),
    [products],
  );

  return {
    categories,
    products,
    offerTabs,
    stats,
    form,
    setForm,
    formErrors,
    editingId,
    newOfferTab,
    setNewOfferTab,
    offerError,
    setOfferError,
    lowStockProducts,
    startEdit,
    resetForm,
    toggleCategory,
    toggleOfferTab,
    handleImageFileChange,
    handleSubmit,
    handleAddOfferTab,
    deleteProduct: dashboard.deleteProduct,
  };
}

function getInitialForm(categories) {
  return {
    name: "",
    categoryIds: [categories[0]?.id ?? ""],
    categoryNames: [categories[0]?.name ?? ""],
    primaryCategoryId: categories[0]?.id ?? "",
    primaryCategoryName: categories[0]?.name ?? "",
    offerTags: [],
    price: "",
    inventory: "",
    imageUrl:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=80",
    description: "",
    status: "Draft",
    featured: false,
    popular: false,
    visible: true,
  };
}
