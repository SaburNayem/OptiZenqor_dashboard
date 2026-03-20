function ErrorState({ title, message, action }) {
  return (
    <section className="panel-card feedback-card error">
      <p className="eyebrow">Error</p>
      <h2>{title}</h2>
      <p>{message}</p>
      {action ? <div className="action-row">{action}</div> : null}
    </section>
  );
}

export default ErrorState;
