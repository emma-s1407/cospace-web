"use client";

import { useState } from "react";
import BookingCard, { type BookingCardProps } from "./BookingCard";
import { initialBookings, type Booking } from "@/data/bookings";
import RegistrationForm from "./RegistrationForm";
import styles from "./BookingList.module.css";

export default function BookingList() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [query, setQuery] = useState("");

  function addBooking(booking: BookingCardProps) {
    setBookings((prev) => [...prev, { ...booking, id: Date.now() }]);
  }

  const term = query.trim().toLowerCase();
  const visible = bookings.filter(
    (b) =>
      b.desk.toLowerCase().includes(term) ||
      String(b.floor).includes(term) ||
      b.date.includes(term),
  );

  return (
    <section className={styles.list}>
      <RegistrationForm onAdd={addBooking} />
      <input
        type="search"
        className={styles.search}
        placeholder="Search by desk, floor or date..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search bookings"
      />
      {visible.length > 0 ? (
        visible.map(({ id, ...booking }) => <BookingCard key={id} id={id} {...booking} />)
      ) : (
        <p>No bookings match &quot;{query}&quot;.</p>
      )}
    </section>
  );
}
