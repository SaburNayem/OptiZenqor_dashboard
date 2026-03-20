const statuses = ["Pending", "Paid", "Packed", "Shipped", "Delivered", "Cancelled", "Refunded"];

function OrderStatusSelect({ value, onChange }) {
  return (
    <select value={value} onChange={(event) => onChange(event.target.value)}>
      {statuses.map((status) => (
        <option key={status}>{status}</option>
      ))}
    </select>
  );
}

export default OrderStatusSelect;
