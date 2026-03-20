import FormFieldError from "../../../shared/feedback/FormFieldError";

function ProductForm({
  categories,
  offerTabs,
  form,
  setForm,
  errors,
  editingId,
  onSubmit,
  onToggleCategory,
  onToggleOfferTab,
  onImageFileChange,
  onReset,
}) {
  return (
    <form className="form-card" onSubmit={onSubmit}>
      <label>
        Product name
        <input value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} />
        <FormFieldError message={errors.name} />
      </label>
      <label>
        Primary category
        <select
          value={form.primaryCategoryId}
          onChange={(event) => {
            const selected = categories.find((item) => item.id === event.target.value);
            setForm((current) => ({
              ...current,
              primaryCategoryId: event.target.value,
              primaryCategoryName: selected?.name || "",
            }));
          }}
        >
          {categories
            .filter((category) => form.categoryIds.includes(category.id))
            .map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
        </select>
      </label>
      <div>
        <span className="field-label">Choose multiple categories</span>
        <div className="selector-grid">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={`selector-pill ${form.categoryIds.includes(category.id) ? "active" : ""}`}
              onClick={() => onToggleCategory(category)}
            >
              {category.name}
            </button>
          ))}
        </div>
        <FormFieldError message={errors.categoryIds} />
      </div>
      <div>
        <span className="field-label">Offer tags</span>
        <div className="selector-grid">
          {offerTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`selector-pill ${form.offerTags.includes(tab) ? "active offer" : ""}`}
              onClick={() => onToggleOfferTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="split-fields">
        <label>
          Price
          <input value={form.price} onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))} />
          <FormFieldError message={errors.price} />
        </label>
        <label>
          Inventory
          <input value={form.inventory} onChange={(event) => setForm((current) => ({ ...current, inventory: event.target.value }))} />
          <FormFieldError message={errors.inventory} />
        </label>
      </div>
      <div className="split-fields">
        <label>
          Status
          <select value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}>
            <option>Draft</option>
            <option>Published</option>
            <option>Low Stock</option>
          </select>
        </label>
        <label>
          Visibility
          <select
            value={String(form.visible)}
            onChange={(event) => setForm((current) => ({ ...current, visible: event.target.value === "true" }))}
          >
            <option value="true">Visible</option>
            <option value="false">Hidden</option>
          </select>
        </label>
      </div>
      <div className="split-fields">
        <label>
          Featured
          <select
            value={String(form.featured)}
            onChange={(event) => setForm((current) => ({ ...current, featured: event.target.value === "true" }))}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </label>
        <label>
          Popular
          <select
            value={String(form.popular)}
            onChange={(event) => setForm((current) => ({ ...current, popular: event.target.value === "true" }))}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </label>
      </div>
      <label>
        Image URL
        <input value={form.imageUrl} onChange={(event) => setForm((current) => ({ ...current, imageUrl: event.target.value }))} />
        <FormFieldError message={errors.imageUrl} />
      </label>
      <label>
        Upload image directly
        <input type="file" accept="image/*" onChange={onImageFileChange} />
      </label>
      <div className="image-preview-card">
        <img src={form.imageUrl} alt="Product preview" className="image-preview" />
        <div>
          <strong>Preview</strong>
          <p>This uses the direct image URL or uploaded local image preview.</p>
        </div>
      </div>
      <label>
        Description
        <textarea value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} />
        <FormFieldError message={errors.description} />
      </label>
      <div className="action-row">
        <button type="submit" className="primary-button">
          {editingId ? "Update product" : "Add product"}
        </button>
        {editingId ? (
          <button type="button" className="secondary-button" onClick={onReset}>
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}

export default ProductForm;
