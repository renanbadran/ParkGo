import { PickupCode } from "./PicupCode";

// BookingStatus enum
export const BookingStatus = {
  PENDING:   "PENDING",
  CONFIRMED: "CONFIRMED",
  ACTIVE:    "ACTIVE",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
};

export class Booking {
  constructor({ customerId, zoneId, arrivalTime, duration, plateNumber }) {
    this.bookingId    = Date.now();
    this.customerId   = customerId;
    this.zoneId       = zoneId;
    this.spotId       = null;
    this.arrivalTime  = new Date(arrivalTime);
    this.duration     = duration;           // in minutes
    this.plateNumber  = plateNumber;
    this.status       = BookingStatus.PENDING;
    this.pickupCode   = null;
    this.payment      = null;
    this.extensions   = 0;
    this.createdAt    = new Date();
  }

  confirm(spotId) {
    this.spotId = spotId;
    this.status = BookingStatus.CONFIRMED;
  }

  activate() {
    this.status = BookingStatus.ACTIVE;
  }

  complete() {
    this.status = BookingStatus.COMPLETED;
    if (this.pickupCode) this.pickupCode.markUsed();
  }

  cancel() {
    this.status = BookingStatus.CANCELLED;
  }

  extend(extraMinutes) {
    this.duration += extraMinutes;
    this.extensions++;
  }

  generatePickupCode() {
    this.pickupCode = new PickupCode(this.bookingId);
    return this.pickupCode;
  }

  getEndTime() {
    return new Date(this.arrivalTime.getTime() + this.duration * 60000);
  }

  getTimeRemaining() {
    const remaining = this.getEndTime() - new Date();
    if (remaining <= 0) return "Expired";
    const mins = Math.floor(remaining / 60000);
    return `${mins} min remaining`;
  }
}
