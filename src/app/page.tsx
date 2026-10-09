"use client";

import { useState } from "react";
import Link from "next/link";
import BaseModal from "@/components/BaseModal";
import BookingsTable from "@/components/BookingsTable";
import CreateBookingForm from "@/components/CreateBookingForm";
import RegistrationForm from "@/components/RegistrationForm";
import type { BookingCardProps } from "@/components/BookingCard";
import { initialBookings, type Booking } from "@/data/bookings";
import styles from "./dashboard.module.css";

export default function Home() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [isOpen, setIsOpen] = useState(false);

  function addBooking(booking: BookingCardProps) {
    setBookings((previous) => [...previous, { ...booking, id: Date.now() }]);
    setIsOpen(false);
  }

  return (
    <div className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <nav aria-label="Dashboard navigation" className={styles.navigation}>
          <Link href="/" aria-current="page">Dashboard</Link>
          <Link href="#bookings">Bookings</Link>
        </nav>
      </aside>
      <main className={styles.main}>
        <header className={styles.heading}>
          <h1>Dashboard</h1>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={() => setIsOpen(true)}
            aria-haspopup="dialog"
          >
            New booking
          </button>
        </header>
        <section id="bookings" aria-labelledby="bookings-heading">
          <h2 id="bookings-heading" className={styles.sectionTitle}>My bookings</h2>
          <div className={styles.tableScroll}>
            <BookingsTable bookings={bookings} />
          </div>
        </section>
        <section aria-labelledby="create-booking-heading">
          <h2 id="create-booking-heading" className={styles.sectionTitle}>
            Create booking
          </h2>
          <CreateBookingForm onAdd={addBooking} />
        </section>
      </main>
      <BaseModal isOpen={isOpen} onClose={() => setIsOpen(false)} title="New booking">
        <RegistrationForm onAdd={addBooking} />
      </BaseModal>
    </div>
  );
}
