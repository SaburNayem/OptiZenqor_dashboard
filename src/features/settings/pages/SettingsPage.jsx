import DashboardSection from "../../../shared/ui/DashboardSection";
import FormFieldError from "../../../shared/feedback/FormFieldError";
import { useSettingsController } from "../controller/settingsController";

function SettingsPage() {
  const controller = useSettingsController();

  return (
    <div className="page-stack">
      <DashboardSection title="Admin settings" subtitle="Profile, preferences, notifications, and API configuration.">
        <form className="form-card" onSubmit={controller.handleSubmit}>
          <div className="split-fields">
            <label>
              Admin name
              <input value={controller.form.adminName} onChange={(event) => controller.setForm((current) => ({ ...current, adminName: event.target.value }))} />
              <FormFieldError message={controller.errors.adminName} />
            </label>
            <label>
              Admin email
              <input value={controller.form.adminEmail} onChange={(event) => controller.setForm((current) => ({ ...current, adminEmail: event.target.value }))} />
              <FormFieldError message={controller.errors.adminEmail} />
            </label>
          </div>

          <div className="split-fields">
            <label>
              Role title
              <input value={controller.form.title} onChange={(event) => controller.setForm((current) => ({ ...current, title: event.target.value }))} />
            </label>
            <label>
              API base URL
              <input value={controller.form.apiBaseUrl} onChange={(event) => controller.setForm((current) => ({ ...current, apiBaseUrl: event.target.value }))} />
              <FormFieldError message={controller.errors.apiBaseUrl} />
            </label>
          </div>

          <div className="split-fields">
            <label>
              Theme
              <select value={controller.form.theme} onChange={(event) => controller.setForm((current) => ({ ...current, theme: event.target.value }))}>
                <option>Warm light</option>
                <option>Classic admin</option>
              </select>
            </label>
            <label>
              Density
              <select value={controller.form.density} onChange={(event) => controller.setForm((current) => ({ ...current, density: event.target.value }))}>
                <option>Comfortable</option>
                <option>Compact</option>
              </select>
            </label>
          </div>

          <div className="pill-grid">
            <label className="toggle-chip">
              <input
                type="checkbox"
                checked={controller.form.notifyOrders}
                onChange={(event) => controller.setForm((current) => ({ ...current, notifyOrders: event.target.checked }))}
              />
              Order notifications
            </label>
            <label className="toggle-chip">
              <input
                type="checkbox"
                checked={controller.form.notifySupport}
                onChange={(event) => controller.setForm((current) => ({ ...current, notifySupport: event.target.checked }))}
              />
              Support notifications
            </label>
            <label className="toggle-chip">
              <input
                type="checkbox"
                checked={controller.form.notifyContent}
                onChange={(event) => controller.setForm((current) => ({ ...current, notifyContent: event.target.checked }))}
              />
              Content notifications
            </label>
          </div>

          {controller.savedMessage ? <p className="status-inline">{controller.savedMessage}</p> : null}

          <button type="submit" className="primary-button">
            Save settings
          </button>
        </form>
      </DashboardSection>
    </div>
  );
}

export default SettingsPage;
