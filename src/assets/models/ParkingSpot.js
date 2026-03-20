// SpotType enum
export const SpotType = {
  STANDARD: "STANDARD",
  DISABLED: "DISABLED",
  VIP:      "VIP",
  ELECTRIC: "ELECTRIC",
};

export class ParkingSpot {
  constructor({ spotId, spotNumber, type = SpotType.STANDARD, zoneId }) {
    this.spotId      = spotId;
    this.spotNumber  = spotNumber;
    this.type        = type;
    this.zoneId      = zoneId;
    this.isAvailable = true;
    this.bookingId   = null;
  }

  reserve(bookingId) {
    if (!this.isAvailable) return { success: false, message: "Spot already taken." };
    this.isAvailable = false;
    this.bookingId   = bookingId;
    return { success: true };
  }

  release() {
    this.isAvailable = true;
    this.bookingId   = null;
  }
}
