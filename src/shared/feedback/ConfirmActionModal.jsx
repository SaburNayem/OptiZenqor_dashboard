function ConfirmActionModal({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="modal-card" role="dialog" aria-modal="true" aria-label={title}>
        <p className="eyebrow">Confirm</p>
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="action-row">
          <button type="button" className="primary-button" onClick={onConfirm}>
            {confirmLabel}
          </button>
          <button type="button" className="secondary-button" onClick={onCancel}>
            {cancelLabel}
          </button>
        </div>
      </section>
    </div>
  );
}

export default ConfirmActionModal;
