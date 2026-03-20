import { useState } from "react";
import { validateSettings } from "../../../core/utils/validation";
import { useDashboard } from "../../../store/DashboardContext";

export function useSettingsController() {
  const dashboard = useDashboard();
  const [form, setForm] = useState(dashboard.state.settings);
  const [errors, setErrors] = useState({});
  const [savedMessage, setSavedMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateSettings(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    dashboard.updateSettings(form);
    setSavedMessage("Settings saved locally for this session.");
  }

  return {
    form,
    setForm,
    errors,
    savedMessage,
    handleSubmit,
  };
}
