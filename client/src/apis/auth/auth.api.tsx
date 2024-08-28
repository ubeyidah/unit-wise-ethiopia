export const checkAuth = async () => {
  const res = await fetch("/api/auth/check");
  const result = await res.json();
  return result;
};
