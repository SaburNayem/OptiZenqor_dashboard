import { DashboardSection, DataTable, StatusBadge } from "../components/ui";

function ProductsPage({
  products,
  productForm,
  setProductForm,
  handleProductSubmit,
  cycleProductStatus,
  statusToneMap,
}) {
  return (
    <div className="page-stack">
      <section className="content-grid">
        <div className="primary-column">
          <DashboardSection
            title="Product catalog"
            subtitle="A dedicated area for inventory, pricing, and publish status."
          >
            <DataTable
              columns={["Product", "Category", "Inventory", "Price", "Status", "Action"]}
              rows={products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="identity-cell">
                      <strong>{product.name}</strong>
                      <span>{product.id}</span>
                    </div>
                  </td>
                  <td>{product.category}</td>
                  <td>{product.inventory}</td>
                  <td>{product.price}</td>
                  <td>
                    <StatusBadge value={product.status} statusToneMap={statusToneMap} />
                  </td>
                  <td>
                    <button
                      type="button"
                      className="table-action"
                      onClick={() => cycleProductStatus(product.id)}
                    >
                      Change status
                    </button>
                  </td>
                </tr>
              ))}
            />
          </DashboardSection>
        </div>

        <div className="secondary-column">
          <DashboardSection
            title="Add new product"
            subtitle="Create a new catalog entry without leaving the products page."
          >
            <form className="form-card" onSubmit={handleProductSubmit}>
              <label>
                Product name
                <input
                  value={productForm.name}
                  onChange={(event) =>
                    setProductForm((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  placeholder="Product title"
                />
              </label>
              <label>
                Category
                <select
                  value={productForm.category}
                  onChange={(event) =>
                    setProductForm((current) => ({
                      ...current,
                      category: event.target.value,
                    }))
                  }
                >
                  <option>Productivity</option>
                  <option>Wellness</option>
                  <option>Analytics</option>
                  <option>Collaboration</option>
                </select>
              </label>
              <div className="split-fields">
                <label>
                  Inventory
                  <input
                    type="number"
                    value={productForm.inventory}
                    onChange={(event) =>
                      setProductForm((current) => ({
                        ...current,
                        inventory: event.target.value,
                      }))
                    }
                    placeholder="0"
                  />
                </label>
                <label>
                  Price
                  <input
                    value={productForm.price}
                    onChange={(event) =>
                      setProductForm((current) => ({
                        ...current,
                        price: event.target.value,
                      }))
                    }
                    placeholder="$00"
                  />
                </label>
              </div>
              <button type="submit" className="primary-button">
                Create product
              </button>
            </form>
          </DashboardSection>
        </div>
      </section>
    </div>
  );
}

export default ProductsPage;
