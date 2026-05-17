import { apiRequest } from "./apiClient";

export const subscriberService = {
  async list() {
    const data = await apiRequest("/api/subscribers");
    return data.subscribers;
  },

  async create(payload) {
    const data = await apiRequest("/api/subscribers", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return data.subscriber;
  },
};
