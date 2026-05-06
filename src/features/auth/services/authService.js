import { adminRequest, clearStoredToken, getStoredToken, setStoredToken } from "../../../shared/api/adminApi";

const AUTH_KEY = "optizenqor_admin_session";

export const adminCredentials = {
  email: "admin@optizenqor.com",
  password: "Password123!",
};

export function isAuthenticated() {
  return window.localStorage.getItem(AUTH_KEY) === "active" && Boolean(getStoredToken());
}

export async function signIn(email, password) {
  const result = await adminRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  setStoredToken(result.tokens.accessToken);
  window.localStorage.setItem(AUTH_KEY, "active");
  return result;
}

export function signOut() {
  clearStoredToken();
  window.localStorage.removeItem(AUTH_KEY);
}
