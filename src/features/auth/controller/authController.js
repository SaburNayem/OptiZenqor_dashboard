import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { appRoutes } from "../../../core/constants/routes";
import { validateLogin } from "../../../core/utils/validation";
import { adminCredentials, signIn } from "../services/authService";

export function useAuthController() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({
    email: adminCredentials.email,
    password: adminCredentials.password,
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateLogin(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const success = signIn(form.email, form.password);

    if (!success) {
      setSubmitError("Use the demo admin credentials to enter the dashboard.");
      return;
    }

    navigate(location.state?.from || appRoutes.overview, { replace: true });
  }

  return {
    adminCredentials,
    form,
    setForm,
    errors,
    submitError,
    handleSubmit,
  };
}
