/**
 * Error handling and logging utilities
 */

export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = "AppError";
  }
}

export const handleError = (error) => {
  if (error.response) {
    // API error
    const status = error.response.status;
    const message = error.response.data?.message || error.message;

    if (status === 401) {
      return "Unauthorized. Please login again.";
    }
    if (status === 403) {
      return "You don't have permission to perform this action.";
    }
    if (status === 404) {
      return "Resource not found.";
    }
    if (status >= 500) {
      return "Server error. Please try again later.";
    }

    return message;
  }

  if (error.request) {
    return "Network error. Please check your connection.";
  }

  return error.message || "An unknown error occurred.";
};

export const logError = (error, context = "") => {
  if (process.env.NODE_ENV === "development") {
    console.error(`[Error ${context}]`, error);
  }
};

export const retryAsync = async (fn, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};
