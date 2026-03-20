function SideDetailPanel({ title, subtitle, children, emptyMessage = "Select an item to inspect details." }) {
  return (
    <section className="panel-card sticky-panel">
      <div className="section-heading">
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
      </div>
      {children || <p className="muted-copy">{emptyMessage}</p>}
    </section>
  );
}

export default SideDetailPanel;
