export const checkAuth = async () => {
  const res = await fetch("/api/auth/check", { credentials: "include" });
  const result = await res.json();
  return result;
};
export const logoutUser = async () => {
  const res = await fetch("/api/auth/logout", { credentials: "include" });
  const result = await res.json();
  return result;
};
