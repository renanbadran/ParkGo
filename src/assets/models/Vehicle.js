export class Vehicle {
  constructor({ plateNumber, make, model, color, ownerId }) {
    this.plateNumber = plateNumber;
    this.make        = make    || "Unknown";
    this.model       = model   || "Unknown";
    this.color       = color   || "Unknown";
    this.ownerId     = ownerId;
  }

  toString() {
    return `${this.color} ${this.make} ${this.model} — ${this.plateNumber}`;
  }
}
