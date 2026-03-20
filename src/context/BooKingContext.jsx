import { createContext, useContext, useState } from "react";

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([]);

  const addBooking = (booking) => {
    setBookings((prev) => [...prev, booking]);
  };

  const cancelBooking = (bookingId) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.bookingId === bookingId
          ? { ...booking, status: "CANCELLED" }
          : booking
      )
    );
  };

  const extendBooking = (bookingId, extraMinutes) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.bookingId === bookingId
          ? {
              ...booking,
              duration: booking.duration + extraMinutes,
              extensions: (booking.extensions || 0) + 1,
            }
          : booking
      )
    );
  };

  const getUserBookings = (customerId) => {
    return bookings.filter((booking) => booking.customerId === customerId);
  };

  const getActiveBooking = (customerId) => {
    return (
      bookings.find(
        (booking) =>
          booking.customerId === customerId &&
          (booking.status === "ACTIVE" || booking.status === "CONFIRMED")
      ) || null
    );
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        addBooking,
        cancelBooking,
        extendBooking,
        getUserBookings,
        getActiveBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used inside <BookingProvider>");
  }

  return context;
}
