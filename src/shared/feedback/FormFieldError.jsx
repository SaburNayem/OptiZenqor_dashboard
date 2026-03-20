function FormFieldError({ message }) {
  if (!message) return null;

  return <p className="field-error">{message}</p>;
}

export default FormFieldError;
