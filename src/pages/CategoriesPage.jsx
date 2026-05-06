import { useEffect, useState } from "react";
import DashboardSection from "../shared/ui/DashboardSection";
import DataTable from "../shared/ui/DataTable";
import InsightCard from "../shared/ui/InsightCard";
import { adminRequest } from "../shared/api/adminApi";

function CategoriesPage() {
  const [state, setState] = useState({
    loading: true,
    error: "",
    categories: [],
    products: [],
  });

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const [categories, products] = await Promise.all([
          adminRequest("/categories"),
          adminRequest("/admin/products"),
        ]);

        if (!active) return;
        setState({ loading: false, error: "", categories, products });
      } catch (error) {
        if (!active) return;
        setState((current) => ({ ...current, loading: false, error: error.message || "Unable to load categories." }));
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  if (state.loading) {
    return <div className="page-stack"><section className="panel-card"><p>Loading categories...</p></section></div>;
  }

  if (state.error) {
    return <div className="page-stack"><section className="panel-card"><p className="auth-error">{state.error}</p></section></div>;
  }

  const categoriesWithCounts = state.categories.map((category) => ({
    ...category,
    productCount: state.products.filter((product) => product.primaryCategoryId === category.id).length,
  }));

  const largestCategory = categoriesWithCounts.reduce(
    (largest, current) => (current.productCount > largest.productCount ? current : largest),
    categoriesWithCounts[0] || { name: "None", productCount: 0 },
  );

  return (
    <div className="page-stack">
      <section className="card-grid">
        <InsightCard
          eyebrow="Categories"
          title="Active categories"
          value={categoriesWithCounts.length}
          description="All storefront categories are loaded directly from the backend taxonomy."
        />
        <InsightCard
          eyebrow="Categories"
          title="Largest segment"
          value={largestCategory.name}
          description={`${largestCategory.productCount} products currently point at this primary category.`}
        />
        <InsightCard
          eyebrow="Categories"
          title="Navigation health"
          value={`${categoriesWithCounts.filter((item) => item.productCount > 0).length}/${categoriesWithCounts.length}`}
          description="Categories with live products connected to the browsing experience."
        />
      </section>

      <DashboardSection
        title="Category management"
        subtitle="The same category structure used by the storefront browsing and product details flow."
      >
        <DataTable
          columns={["Category", "Icon", "Banner title", "Products", "State"]}
          rows={categoriesWithCounts.map((category) => (
            <tr key={category.id}>
              <td>
                <div className="identity-cell">
                  <strong>{category.name}</strong>
                  <span>{category.id}</span>
                </div>
              </td>
              <td>{category.icon || category.name.slice(0, 1).toUpperCase()}</td>
              <td>{category.bannerTitle || category.name}</td>
              <td>{category.productCount}</td>
              <td>{category.productCount > 0 ? "Ready" : "Empty"}</td>
            </tr>
          ))}
        />
      </DashboardSection>
    </div>
  );
}

export default CategoriesPage;
