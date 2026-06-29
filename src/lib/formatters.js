/**
 * String and data formatting utilities
 */

export const formatPhoneNumber = (phone) => {
  if (!phone) return "";
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `+880${cleaned}`;
  }
  if (cleaned.length === 12 && cleaned.startsWith("88")) {
    return `+${cleaned}`;
  }
  return phone;
};

export const formatDateTime = (dateTime) => {
  if (!dateTime) return "";
  return new Date(dateTime).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

export const formatDateOnly = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatTimeOnly = (time) => {
  if (!time) return "";
  if (time.includes(":")) {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  }
  return time;
};

export const truncateText = (text, length = 50) => {
  if (!text) return "";
  return text.length > length ? text.substring(0, length) + "..." : text;
};

export const capitalizeWords = (str) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const getInitials = (name) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const pluralize = (word, count) => {
  return count === 1 ? word : word + "s";
};
