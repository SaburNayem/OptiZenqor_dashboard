import { useState } from "react";
import FormFieldError from "../../../shared/feedback/FormFieldError";
import { useAuthController } from "../controller/authController";

function LoginPage() {
  const controller = useAuthController();
  const [showPassword, setShowPassword] = useState(false);

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
              <div className="password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  value={controller.form.password}
                  onChange={(event) =>
                    controller.setForm((current) => ({ ...current, password: event.target.value }))
                  }
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M3 4.5 19.5 21"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                      <path
                        d="M10.6 6.2A10.9 10.9 0 0 1 12 6c5.2 0 9.4 4.7 10 5.4.1.2.1.4 0 .6-.3.4-1.7 1.9-3.8 3.2m-3 1.2A5 5 0 0 1 8 9.3m-2.7 2.1A15.2 15.2 0 0 1 2 12c.6-.8 2.9-3.4 6-4.8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M2 12c.6-.8 4.8-5.5 10-5.5S21.4 11.2 22 12c-.6.8-4.8 5.5-10 5.5S2.6 12.8 2 12Z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                    </svg>
                  )}
                </button>
              </div>
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
