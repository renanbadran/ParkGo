export class PickupCode {
  constructor(bookingId) {
    this.code      = Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit code
    this.bookingId = bookingId;
    this.isUsed    = false;
    this.createdAt = new Date();
    this.expiresAt = new Date(Date.now() + 30 * 60 * 1000); // expires in 30 min
  }

  isValid() {
    return !this.isUsed && new Date() < this.expiresAt;
  }

  validate(inputCode) {
    if (this.isUsed)           return { success: false, message: "Code already used." };
    if (new Date() > this.expiresAt) return { success: false, message: "Code expired." };
    if (this.code !== inputCode)     return { success: false, message: "Invalid code." };
    return { success: true };
  }

  markUsed() {
    this.isUsed = true;
  }
}
