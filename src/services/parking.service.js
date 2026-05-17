import { apiRequest } from "./apiClient";

export const parkingService = {
  async list() {
    const data = await apiRequest("/api/parkings");
    return data.parkings;
  },

  async verifyPickup(confirmationCode) {
    return apiRequest("/api/parkings/verify-pickup", {
      method: "POST",
      body: JSON.stringify({ confirmationCode }),
    });
  },
};
