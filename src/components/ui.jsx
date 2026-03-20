export function DashboardSection({ title, subtitle, action, children }) {
  return (
    <section className="panel-card">
      <div className="section-heading">
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export function DataTable({ columns, rows }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

export function StatusBadge({ value, statusToneMap }) {
  const tone = statusToneMap[value] || "muted";

  return <span className={`status-badge ${tone}`}>{value}</span>;
}

export function QuickSummary({ items }) {
  return (
    <section className="stats-grid">
      {items.map((item) => (
        <article key={item.label} className="stat-card">
          <span>{item.label}</span>
          <strong>{item.value}</strong>
          <small>{item.change}</small>
        </article>
      ))}
    </section>
  );
}
