import DashboardSection from "../../../shared/ui/DashboardSection";
import FormFieldError from "../../../shared/feedback/FormFieldError";
import { useHomepageController } from "../controller/homepageController";

function HomepagePage() {
  const controller = useHomepageController();

  return (
    <div className="page-stack">
      <section className="content-grid">
        <div className="primary-column">
          <DashboardSection title="Homepage management" subtitle="Control hero messaging, collections, highlights, and offer ribbons for app and web surfaces.">
            <form className="form-card" onSubmit={controller.handleSubmit}>
              <label>
                Hero title
                <input value={controller.form.heroTitle} onChange={(event) => controller.setForm((current) => ({ ...current, heroTitle: event.target.value }))} />
                <FormFieldError message={controller.errors.heroTitle} />
              </label>
              <label>
                Hero subtitle
                <textarea value={controller.form.heroSubtitle} onChange={(event) => controller.setForm((current) => ({ ...current, heroSubtitle: event.target.value }))} />
                <FormFieldError message={controller.errors.heroSubtitle} />
              </label>
              <div className="split-fields">
                <label>
                  Primary CTA
                  <input value={controller.form.primaryCtaLabel} onChange={(event) => controller.setForm((current) => ({ ...current, primaryCtaLabel: event.target.value }))} />
                  <FormFieldError message={controller.errors.primaryCtaLabel} />
                </label>
                <label>
                  Secondary CTA
                  <input value={controller.form.secondaryCtaLabel} onChange={(event) => controller.setForm((current) => ({ ...current, secondaryCtaLabel: event.target.value }))} />
                  <FormFieldError message={controller.errors.secondaryCtaLabel} />
                </label>
              </div>
              <label>
                Featured collection
                <input value={controller.form.featuredCollection} onChange={(event) => controller.setForm((current) => ({ ...current, featuredCollection: event.target.value }))} />
              </label>
              <button type="submit" className="primary-button">
                Save homepage controls
              </button>
            </form>
          </DashboardSection>
        </div>

        <div className="secondary-column">
          <DashboardSection title="Popular products" subtitle="Select products that should surface in homepage popularity modules.">
            <div className="selector-grid">
              {controller.products.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  className={`selector-pill ${controller.form.popularProductIds.includes(product.id) ? "active" : ""}`}
                  onClick={() => controller.togglePopularProduct(product.id)}
                >
                  {product.name}
                </button>
              ))}
            </div>
          </DashboardSection>

          <DashboardSection title="Trust cards" subtitle="Edit the trust and assurance highlights shown on the homepage.">
            <div className="feature-list">
              {controller.form.trustHighlights.map((item, index) => (
                <label key={`highlight-${index}`}>
                  Highlight {index + 1}
                  <input value={item} onChange={(event) => controller.handleHighlightChange(index, event.target.value)} />
                </label>
              ))}
            </div>
          </DashboardSection>

          <DashboardSection title="Offer ribbons" subtitle="Manage the ribbons and short promo labels used on hero and featured blocks.">
            <div className="feature-list">
              {controller.form.offerRibbons.map((item, index) => (
                <label key={`ribbon-${index}`}>
                  Ribbon {index + 1}
                  <input value={item} onChange={(event) => controller.handleRibbonChange(index, event.target.value)} />
                </label>
              ))}
            </div>
          </DashboardSection>
        </div>
      </section>
    </div>
  );
}

export default HomepagePage;
