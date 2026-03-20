const AUTH_KEY = "optizenqor_admin_session";

export const adminCredentials = {
  email: "admin@optizenqor.com",
  password: "admin123",
};

export function isAuthenticated() {
  return window.localStorage.getItem(AUTH_KEY) === "active";
}

export function signIn(email, password) {
  const valid =
    email === adminCredentials.email && password === adminCredentials.password;

  if (valid) {
    window.localStorage.setItem(AUTH_KEY, "active");
  }

  return valid;
}

export function signOut() {
  window.localStorage.removeItem(AUTH_KEY);
}
