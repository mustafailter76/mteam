export function getErrorMessage(err, fallback = "Bir hata oluştu") {
  if (!err) return fallback;

  const data = err?.response?.data;

  if (typeof data === "string" && data.trim()) return data;

  if (data && typeof data === "object") {
    if (data.message) {
      const details = data.details;
      if (details && typeof details === "object") {
        const key = Object.keys(details)[0];
        if (key) return `${data.message}: ${key} - ${details[key]}`;
      }
      return data.message;
    }
    if (data.error) return data.error;
  }

  if (err.message) return err.message;

  return fallback;
}