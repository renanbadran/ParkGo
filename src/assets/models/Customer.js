import { User } from "./User";

export class Customer extends User {
  constructor(data) {
    super({ ...data, role: "subscriber" });
    this.bookings  = [];   // Booking[]
    this.vehicles  = [];   // Vehicle[]
    this.plate     = data.plate || null;
  }

  makeBooking(booking) {
    this.bookings.push(booking);
    return booking;
  }

  cancelBooking(bookingId) {
    const booking = this.bookings.find(b => b.bookingId === bookingId);
    if (!booking) return { success: false, message: "Booking not found." };
    booking.cancel();
    return { success: true };
  }

  getActiveBooking() {
    return this.bookings.find(b => b.status === "ACTIVE" || b.status === "CONFIRMED") || null;
  }

  viewTimeRemaining() {
    const booking = this.getActiveBooking();
    if (!booking) return null;
    return booking.getTimeRemaining();
  }

  receivePickupCode() {
    const booking = this.getActiveBooking();
    if (!booking) return null;
    return booking.pickupCode;
  }

  addVehicle(vehicle) {
    this.vehicles.push(vehicle);
  }
}
