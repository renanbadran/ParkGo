import { apiRequest } from "./apiClient";

export const messageService = {
  async list(userId) {
    const suffix = userId ? `?userId=${encodeURIComponent(userId)}` : "";
    const data = await apiRequest(`/api/messages${suffix}`);
    return data.messages;
  },
};
