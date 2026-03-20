import { useMemo, useState } from "react";
import { validateHomepageContent } from "../../../core/utils/validation";
import { useDashboard } from "../../../store/DashboardContext";

export function useHomepageController() {
  const dashboard = useDashboard();
  const homepage = dashboard.state.homepage;
  const [form, setForm] = useState(homepage);
  const [errors, setErrors] = useState({});

  const products = dashboard.state.catalog.products;
  const selectedPopularProducts = useMemo(
    () => products.filter((product) => form.popularProductIds.includes(product.id)),
    [products, form.popularProductIds],
  );

  function togglePopularProduct(productId) {
    setForm((current) => ({
      ...current,
      popularProductIds: current.popularProductIds.includes(productId)
        ? current.popularProductIds.filter((id) => id !== productId)
        : [...current.popularProductIds, productId],
    }));
  }

  function handleHighlightChange(index, value) {
    setForm((current) => ({
      ...current,
      trustHighlights: current.trustHighlights.map((item, itemIndex) =>
        itemIndex === index ? value : item,
      ),
    }));
  }

  function handleRibbonChange(index, value) {
    setForm((current) => ({
      ...current,
      offerRibbons: current.offerRibbons.map((item, itemIndex) =>
        itemIndex === index ? value : item,
      ),
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateHomepageContent(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    dashboard.updateHomepage(form);
  }

  return {
    form,
    setForm,
    errors,
    products,
    selectedPopularProducts,
    togglePopularProduct,
    handleHighlightChange,
    handleRibbonChange,
    handleSubmit,
  };
}
