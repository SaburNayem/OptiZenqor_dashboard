import DashboardSection from "../../../shared/ui/DashboardSection";
import FormFieldError from "../../../shared/feedback/FormFieldError";
import InsightCard from "../../../shared/ui/InsightCard";
import { useDashboard } from "../../../store/DashboardContext";
import { useCatalogController } from "../controller/catalogController";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";

function CatalogPage() {
  const controller = useCatalogController();
  const dashboard = useDashboard();

  return (
    <div className="page-stack">
      <section className="card-grid">
        <InsightCard eyebrow="Catalog" title="Products" value={controller.stats.productCount} description="Live and draft items managed for app and website surfaces." />
        <InsightCard eyebrow="Catalog" title="Low stock" value={controller.stats.lowStockCount} description="Products that need replenishment attention." />
        <InsightCard eyebrow="Campaigns" title="Offer tabs" value={controller.stats.offerCount} description="Promotional labels available for merchandising." />
      </section>

      <section className="content-grid">
        <div className="primary-column">
          <DashboardSection title="Product catalog" subtitle="Products carried over from the storefront with richer admin controls.">
            <ProductTable
              products={controller.products}
              toneMap={dashboard.state.system.toneMap}
              onEdit={controller.startEdit}
              onDelete={controller.deleteProduct}
            />
          </DashboardSection>
        </div>

        <div className="secondary-column">
          <DashboardSection title={controller.editingId ? "Edit product" : "Add product"} subtitle="Create, update, or refine catalog records from the admin surface.">
            <ProductForm
              categories={controller.categories}
              offerTabs={controller.offerTabs}
              form={controller.form}
              setForm={controller.setForm}
              errors={controller.formErrors}
              editingId={controller.editingId}
              onSubmit={controller.handleSubmit}
              onToggleCategory={controller.toggleCategory}
              onToggleOfferTab={controller.toggleOfferTab}
              onImageFileChange={controller.handleImageFileChange}
              onReset={controller.resetForm}
            />
          </DashboardSection>

          <DashboardSection title="Offer planning" subtitle="Promotional structures already used in the storefront, with admin add support.">
            <form className="inline-form" onSubmit={controller.handleAddOfferTab}>
              <input value={controller.newOfferTab} onChange={(event) => controller.setNewOfferTab(event.target.value)} placeholder="Add new offer tab" />
              <button type="submit" className="primary-button compact-button">
                Add offer
              </button>
            </form>
            <FormFieldError message={controller.offerError} />
            <div className="pill-grid">
              {controller.offerTabs.map((tab) => (
                <span key={tab} className="filter-pill">
                  {tab}
                </span>
              ))}
            </div>
          </DashboardSection>

          <DashboardSection title="Low stock watch" subtitle="Fast inventory review for products most at risk.">
            <div className="activity-list">
              {controller.lowStockProducts.map((product) => (
                <article key={product.id} className="activity-item">
                  <span className="activity-dot" />
                  <p>{product.name} has {product.inventory} units remaining.</p>
                </article>
              ))}
            </div>
          </DashboardSection>
        </div>
      </section>
    </div>
  );
}

export default CatalogPage;
