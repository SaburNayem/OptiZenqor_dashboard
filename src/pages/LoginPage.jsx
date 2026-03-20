import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { adminCredentials, signIn } from "../features/auth/auth";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({
    email: adminCredentials.email,
    password: adminCredentials.password,
  });
  const [error, setError] = useState("");

  const redirectTo = location.state?.from || "/";

  function handleSubmit(event) {
    event.preventDefault();

    const success = signIn(form.email, form.password);

    if (!success) {
      setError("Use the admin demo credentials to enter the dashboard.");
      return;
    }

    navigate(redirectTo, { replace: true });
  }

  return (
    <div className="auth-shell">
      <section className="auth-showcase">
        <p className="eyebrow">Admin access</p>
        <h1>OptiZenqor Dashboard Login</h1>
        <p>
          This is the protected admin entrance for catalog, categories, customers,
          content, features, and system control.
        </p>

        <div className="auth-tip-card">
          <strong>Demo admin credentials</strong>
          <span>Email: {adminCredentials.email}</span>
          <span>Password: {adminCredentials.password}</span>
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-panel-head">
          <p className="eyebrow">Sign in</p>
          <h2>Admin Control Center</h2>
          <p>Only authenticated admins can access the dashboard routes.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm((current) => ({ ...current, email: event.target.value }))
              }
              placeholder="admin@optizenqor.com"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={form.password}
              onChange={(event) =>
                setForm((current) => ({ ...current, password: event.target.value }))
              }
              placeholder="Enter password"
            />
          </label>

          {error ? <p className="auth-error">{error}</p> : null}

          <button type="submit" className="primary-button auth-button">
            Login to dashboard
          </button>
        </form>
      </section>
    </div>
  );
}

export default LoginPage;
