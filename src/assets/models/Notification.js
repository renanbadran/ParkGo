// NotificationType enum
export const NotificationType = {
  BOOKING_CONFIRMED: "BOOKING_CONFIRMED",
  REMINDER_15MIN:    "REMINDER_15MIN",
  CAR_READY:         "CAR_READY",
  PICKUP_CODE:       "PICKUP_CODE",
  CANCELLED:         "CANCELLED",
};

export class Notification {
  constructor({ userId, type, message }) {
    this.notifId   = Date.now();
    this.userId    = userId;
    this.type      = type;
    this.message   = message;
    this.isRead    = false;
    this.createdAt = new Date();
  }

  send() {
    console.log(`📩 [${this.type}] → ${this.message}`);
    return this;
  }

  markRead() {
    this.isRead = true;
  }
}
