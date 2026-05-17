import { apiRequest } from "./apiClient";

export const reportService = {
  async summary() {
    const data = await apiRequest("/api/reports/summary");
    return data.summary;
  },
};
