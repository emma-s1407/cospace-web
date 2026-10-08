"use client";

import { useState, type FormEvent } from "react";
import type { BookingCardProps } from "./BookingCard";
import styles from "./RegistrationForm.module.css";

type RegistrationFormProps = {
  onAdd: (booking: BookingCardProps) => void;
};

export default function RegistrationForm({ onAdd }: RegistrationFormProps) {
  const [desk, setDesk] = useState("");
  const [floor, setFloor] = useState("");
  const [date, setDate] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    // Stop the browser from reloading the page / navigating on submit.
    e.preventDefault();

    onAdd({ desk: desk.trim(), floor: Number(floor), date, active: true });

    setDesk("");
    setFloor("");
    setDate("");
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        Desk
        <input value={desk} onChange={(e) => setDesk(e.target.value)} placeholder="e.g. A12" required />
      </label>
      <label>
        Floor
        <input
          type="number"
          min={0}
          value={floor}
          onChange={(e) => setFloor(e.target.value)}
          required
        />
      </label>
      <label>
        Date
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </label>
      <button type="submit">Add booking</button>
    </form>
  );
}
