// PaymentStatus enum
export const PaymentStatus = {
  PENDING:  "PENDING",
  PAID:     "PAID",
  REFUNDED: "REFUNDED",
  FAILED:   "FAILED",
};

export class Payment {
  constructor({ bookingId, amount, method }) {
    this.paymentId = Date.now();
    this.bookingId = bookingId;
    this.amount    = amount;
    this.method    = method;  // "card" | "cash" | "apple_pay"
    this.status    = PaymentStatus.PENDING;
    this.createdAt = new Date();
  }

  process() {
    // Simulate payment processing
    this.status = PaymentStatus.PAID;
    this.paidAt = new Date();
    return { success: true };
  }

  refund() {
    if (this.status !== PaymentStatus.PAID)
      return { success: false, message: "Only paid payments can be refunded." };
    this.status = PaymentStatus.REFUNDED;
    return { success: true };
  }
}
