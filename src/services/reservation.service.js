import { apiRequest } from "./apiClient";

export const reservationService = {
  async list(subscriberId) {
    const suffix = subscriberId ? `?subscriberId=${encodeURIComponent(subscriberId)}` : "";
    const data = await apiRequest(`/api/reservations${suffix}`);
    return data.reservations;
  },

  async create(payload) {
    const data = await apiRequest("/api/reservations", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return data.reservation;
  },

  async cancel(reservationId) {
    const data = await apiRequest("/api/reservations/cancel", {
      method: "POST",
      body: JSON.stringify({ reservationId }),
    });
    return data.reservation;
  },
};
