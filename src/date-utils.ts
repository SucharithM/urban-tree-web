/**
 * Minimal date utility functions - Essential functions only
 */

// Convert to ISO string (for API calls)
export function toISOString(date: string | Date | undefined | null): string {
  if (!date) return "";
  try {
    const d = typeof date === "string" ? new Date(date) : date;
    if (isNaN(d.getTime())) return "";
    return d.toISOString();
  } catch {
    return "";
  }
}

// Convert to YYYY-MM-DD (for date inputs)
export function toDateInputValue(date: string | Date | undefined | null): string {
  if (!date) return "";
  try {
    const d = typeof date === "string" ? new Date(date) : date;
    if (isNaN(d.getTime())) return "";

    const iso = d.toISOString();
    const [datePart] = iso.split("T");
    return datePart ?? "";
  } catch {
    return "";
  }
}

// Get date range presets
export function getDateRange(period: "today" | "week" | "month" | "year"): {
  from: string;
  to: string;
} {
  const today = new Date();
  const from = new Date(today);

  if (period === "week") from.setDate(today.getDate() - 7);
  else if (period === "month") from.setMonth(today.getMonth() - 1);
  else if (period === "year") from.setFullYear(today.getFullYear() - 1);

  return {
    from: toDateInputValue(from),
    to: toDateInputValue(today),
  };
}

// Validate date range
export function isValidDateRange(
  from: string | undefined | null,
  to: string | undefined | null,
): boolean {
  if (!from || !to) return false;
  try {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    return !isNaN(fromDate.getTime()) && !isNaN(toDate.getTime()) && fromDate <= toDate;
  } catch {
    return false;
  }
}

// Format for display
export function formatDate(dateString: string | undefined | null): string {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";

    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "Invalid Date";
  }
}

// Get today as YYYY-MM-DD
export function getTodayString(): string {
  const iso = new Date().toISOString();
  const [datePart] = iso.split("T");
  return datePart ?? "";
}

// Get N days ago as YYYY-MM-DD
export function getDaysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);

  const iso = date.toISOString();
  const [datePart] = iso.split("T");
  return datePart ?? "";
}
