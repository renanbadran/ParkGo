import { ParkingSpot, SpotType } from "./ParkingSpot";

export class ParkingZone {
  constructor({ zoneId, name, totalSpots }) {
    this.zoneId     = zoneId;
    this.name       = name;
    this.spots      = [];

    // Auto-create spots
    for (let i = 1; i <= totalSpots; i++) {
      this.spots.push(new ParkingSpot({
        spotId:     `${zoneId}-${i}`,
        spotNumber: i,
        type:       SpotType.STANDARD,
        zoneId,
      }));
    }
  }

  get totalSpots()     { return this.spots.length; }
  get availableSpots() { return this.spots.filter(s => s.isAvailable).length; }

  getAvailableSpot() {
    return this.spots.find(s => s.isAvailable) || null;
  }

  reserveSpot(bookingId) {
    const spot = this.getAvailableSpot();
    if (!spot) return { success: false, message: "No spots available." };
    spot.reserve(bookingId);
    return { success: true, spot };
  }

  releaseSpot(spotId) {
    const spot = this.spots.find(s => s.spotId === spotId);
    if (spot) spot.release();
  }
}
