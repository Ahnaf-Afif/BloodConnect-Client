const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${serverUrl}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export const api = {
  register: (userData) =>
    apiRequest("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    }),

  login: (loginData) =>
    apiRequest("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(loginData),
    }),

  me: () => apiRequest("/api/auth/me"),

  getProfile: () => apiRequest("/api/profile/me"),

  updateProfile: (profileData) =>
    apiRequest("/api/profile/me", {
      method: "PATCH",
      body: JSON.stringify(profileData),
    }),

  createDonationRequest: (requestData) =>
    apiRequest("/api/donation-requests", {
      method: "POST",
      body: JSON.stringify(requestData),
    }),

  getDonationRequests: (query = "") =>
    apiRequest(`/api/donation-requests${query}`),
};
