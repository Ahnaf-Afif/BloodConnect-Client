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

  logout: () =>
    apiRequest("/api/auth/logout", {
      method: "POST",
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

  getMyDonationRequests: (query = "") =>
    apiRequest(`/api/donation-requests/my-requests${query}`),

  getAllDonationRequests: (query = "") =>
    apiRequest(`/api/donation-requests/all${query}`),

  getDonationRequestById: (id) =>
    apiRequest(`/api/donation-requests/${id}`),

  updateDonationRequest: (id, data) =>
    apiRequest(`/api/donation-requests/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  deleteDonationRequest: (id) =>
    apiRequest(`/api/donation-requests/${id}`, {
      method: "DELETE",
    }),

  updateDonationStatus: (id, status) =>
    apiRequest(`/api/donation-requests/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),

  confirmDonation: (id) =>
    apiRequest(`/api/donation-requests/${id}/donate`, {
      method: "PATCH",
    }),

  searchDonors: (query) => apiRequest(`/api/users/search${query}`),

  getAllUsers: (query = "") => apiRequest(`/api/users${query}`),

  blockUser: (id) =>
    apiRequest(`/api/users/${id}/block`, {
      method: "PATCH",
    }),

  unblockUser: (id) =>
    apiRequest(`/api/users/${id}/unblock`, {
      method: "PATCH",
    }),

  makeVolunteer: (id) =>
    apiRequest(`/api/users/${id}/make-volunteer`, {
      method: "PATCH",
    }),

  makeAdmin: (id) =>
    apiRequest(`/api/users/${id}/make-admin`, {
      method: "PATCH",
    }),

  getStats: () => apiRequest("/api/users/stats"),

  getFunds: () => apiRequest("/api/funds"),

  createFundCheckout: (amount) =>
    apiRequest("/api/funds/checkout", {
      method: "POST",
      body: JSON.stringify({ amount }),
    }),

  confirmFund: (amount) =>
    apiRequest("/api/funds/confirm", {
      method: "POST",
      body: JSON.stringify({ amount }),
    }),

  sendContact: (data) =>
    apiRequest("/api/contacts", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
