import FormFieldError from "../../../shared/feedback/FormFieldError";
import { useAuthController } from "../controller/authController";

function LoginPage() {
  const controller = useAuthController();

  return (
    <div className="auth-shell">
      <section className="auth-showcase">
        <p className="eyebrow">Admin access</p>
        <h1>OptiZenqor Dashboard Login</h1>
        <p>
          This is the protected admin entrance for catalog, orders, customers,
          homepage control, support, content, features, and system operations.
        </p>

        <div className="auth-tip-card">
          <strong>Demo admin credentials</strong>
          <span>Email: {controller.adminCredentials.email}</span>
          <span>Password: {controller.adminCredentials.password}</span>
        </div>
      </section>

      <section className="auth-panel">
        <div>
          <div className="auth-panel-head">
            <p className="eyebrow">Sign in</p>
            <h2>Admin Control Center</h2>
            <p>Only authenticated admins can access the dashboard routes.</p>
          </div>

          <form className="auth-form" onSubmit={controller.handleSubmit}>
            <label>
              Email
              <input
                type="email"
                value={controller.form.email}
                onChange={(event) =>
                  controller.setForm((current) => ({ ...current, email: event.target.value }))
                }
              />
              <FormFieldError message={controller.errors.email} />
            </label>

            <label>
              Password
              <input
                type="password"
                value={controller.form.password}
                onChange={(event) =>
                  controller.setForm((current) => ({ ...current, password: event.target.value }))
                }
              />
              <FormFieldError message={controller.errors.password} />
            </label>

            <FormFieldError message={controller.submitError} />

            <button type="submit" className="primary-button auth-button">
              Login to dashboard
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;
