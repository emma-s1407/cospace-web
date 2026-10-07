import Link from "next/link";
import { notFound } from "next/navigation";
import BookingCard from "@/components/BookingCard";
import { initialBookings } from "@/data/bookings";
import styles from "../../page.module.css";

type BookingPageProps = {
	params: Promise<{ id: string }>;
};

export default async function BookingPage({ params }: BookingPageProps) {
	const { id } = await params;
	const booking = initialBookings.find((booking) => String(booking.id) === id);

	if (!booking) {
		notFound();
	}

	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<section className={styles.intro}>
					<h1>Booking #{booking.id}</h1>
					<BookingCard
						desk={booking.desk}
						floor={booking.floor}
						date={booking.date}
						active={booking.active}
					/>
					<Link href="/">Back to bookings</Link>
				</section>
			</main>
		</div>
	);
}
