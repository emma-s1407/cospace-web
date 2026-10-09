"use client";

import { useId, useState, type ChangeEvent, type FormEvent } from "react";
import styles from "./CreateBookingForm.module.css";

type BookingFormValues = {
	desk: string;
	floor: string;
	date: string;
};

type ValidationErrors = Partial<Record<keyof BookingFormValues, string>>;

export function validateBooking({ desk, floor, date }: BookingFormValues): ValidationErrors {
	const errors: ValidationErrors = {};

	if (desk.trim().length < 3) {
		errors.desk = "Desk name must be at least 3 characters long.";
	}

	if (floor.trim().length < 1) {
		errors.floor = "Floor must be at least 1 character long.";
	}

	const selectedDate = new Date(`${date}T00:00:00`);
	const [year, month, day] = date.split("-").map(Number);
	const isValidDate =
		/^\d{4}-\d{2}-\d{2}$/.test(date) &&
		year > 0 &&
		!Number.isNaN(selectedDate.getTime()) &&
		selectedDate.getFullYear() === year &&
		selectedDate.getMonth() + 1 === month &&
		selectedDate.getDate() === day;

	if (!isValidDate) {
		errors.date = "Enter a valid date.";
	} else {
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		if (selectedDate < today) {
			errors.date = "Date cannot be in the past.";
		}
	}

	return errors;
}

export default function CreateBookingForm() {
	const [desk, setDesk] = useState("");
	const [floor, setFloor] = useState("");
	const [date, setDate] = useState("");
	const [errors, setErrors] = useState<ValidationErrors>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");
	const formId = useId();

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (isSubmitting) {
			return;
		}

		setSuccessMessage("");
		const validationErrors = validateBooking({ desk, floor, date });
		setErrors(validationErrors);

		if (Object.keys(validationErrors).length > 0) {
			return;
		}

		setIsSubmitting(true);
		await new Promise<void>((resolve) => window.setTimeout(resolve, 2000));

		setDesk("");
		setFloor("");
		setDate("");
		setIsSubmitting(false);
		setSuccessMessage("Booking submitted successfully.");
	}

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		const { name, value } = event.currentTarget;
		setSuccessMessage("");

		switch (name) {
			case "desk":
				setDesk(value);
				break;
			case "floor":
				setFloor(value);
				break;
			case "date":
				setDate(value);
				break;
		}
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit} aria-busy={isSubmitting} noValidate>
			<div className={styles.field}>
				<label>
					Desk
					<input
						className={`${styles.input} ${errors.desk ? styles.inputError : ""}`}
						type="text"
						name="desk"
						value={desk}
						onChange={handleChange}
						disabled={isSubmitting}
						aria-invalid={Boolean(errors.desk)}
						aria-describedby={errors.desk ? `${formId}-desk-error` : undefined}
					/>
				</label>
				{errors.desk && <p id={`${formId}-desk-error`} className={styles.error} role="alert">{errors.desk}</p>}
			</div>
			<div className={styles.field}>
				<label>
					Floor
					<input
						className={`${styles.input} ${errors.floor ? styles.inputError : ""}`}
						type="text"
						name="floor"
						value={floor}
						onChange={handleChange}
						disabled={isSubmitting}
						aria-invalid={Boolean(errors.floor)}
						aria-describedby={errors.floor ? `${formId}-floor-error` : undefined}
					/>
				</label>
				{errors.floor && <p id={`${formId}-floor-error`} className={styles.error} role="alert">{errors.floor}</p>}
			</div>
			<div className={styles.field}>
				<label>
					Date
					<input
						className={`${styles.input} ${errors.date ? styles.inputError : ""}`}
						type="date"
						name="date"
						value={date}
						onChange={handleChange}
						disabled={isSubmitting}
						aria-invalid={Boolean(errors.date)}
						aria-describedby={errors.date ? `${formId}-date-error` : undefined}
					/>
				</label>
				{errors.date && <p id={`${formId}-date-error`} className={styles.error} role="alert">{errors.date}</p>}
			</div>
			<button type="submit" disabled={isSubmitting}>
				{isSubmitting ? "Submitting..." : "Submit"}
			</button>
			<p role="status">{successMessage}</p>
		</form>
	);
}
