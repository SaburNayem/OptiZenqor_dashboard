import DataTable from "../../../shared/ui/DataTable";
import StatusBadge from "../../../shared/ui/StatusBadge";

function ProductTable({ products, toneMap, onEdit, onDelete }) {
  return (
    <DataTable
      columns={["Product", "Primary", "Offers", "Price", "Inventory", "Visibility", "Status", "Actions"]}
      rows={products.map((product) => (
        <tr key={product.id}>
          <td>
            <div className="identity-cell product-cell">
              <img src={product.imageUrl} alt={product.name} className="product-thumb" />
              <strong>{product.name}</strong>
              <span>{product.id}</span>
            </div>
          </td>
          <td>{product.categoryName}</td>
          <td>{product.offerTags.length ? product.offerTags.join(", ") : "None"}</td>
          <td>${product.price}</td>
          <td>{product.inventory}</td>
          <td>{product.visible ? "Visible" : "Hidden"}</td>
          <td>
            <StatusBadge value={product.inventory <= 10 ? "Low Stock" : product.status} toneMap={toneMap} />
          </td>
          <td>
            <div className="action-row">
              <button type="button" className="table-action" onClick={() => onEdit(product)}>
                Edit
              </button>
              <button type="button" className="table-action danger" onClick={() => onDelete(product.id)}>
                Delete
              </button>
            </div>
          </td>
        </tr>
      ))}
    />
  );
}

export default ProductTable;
