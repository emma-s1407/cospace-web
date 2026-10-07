import type { BookingCardProps } from "@/components/BookingCard";

export type Booking = BookingCardProps & { id: number };

export const initialBookings: Booking[] = [
  { id: 1, desk: "A12", floor: 3, date: "2026-10-05", active: true },
  { id: 2, desk: "B07", floor: 5, date: "2026-10-08", active: false },
  { id: 3, desk: "C21", floor: 2, date: "2026-10-12", active: true },
  { id: 4, desk: "A03", floor: 1, date: "2026-10-15", active: false },
  { id: 5, desk: "D14", floor: 4, date: "2026-10-20", active: true },
];