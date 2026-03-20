function LoadingState({ title = "Loading", message = "Preparing dashboard data." }) {
  return (
    <section className="panel-card feedback-card">
      <p className="eyebrow">Loading</p>
      <h2>{title}</h2>
      <p>{message}</p>
    </section>
  );
}

export default LoadingState;
