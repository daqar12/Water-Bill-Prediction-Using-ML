const SESSION_KEY = "session_token";
const USER_KEY    = "user";

export const saveSession = (token: string, user: object) => {
  sessionStorage.setItem(SESSION_KEY, token);
  sessionStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getSession = () => {
  const token = sessionStorage.getItem(SESSION_KEY);
  const raw   = sessionStorage.getItem(USER_KEY);
  if (!token || !raw) return null;
  return { token, user: JSON.parse(raw) };
};

export const clearSession = () => {
  sessionStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(USER_KEY);
};

export const isLoggedIn = () => !!sessionStorage.getItem(SESSION_KEY);