export function cn(...values) {
  return values.filter(Boolean).join(" ");
}

export function formatDateTime(value) {
  if (!value) return "";
  return new Date(value).toLocaleString();
}
