import { initialBookings, type Booking } from "@/data/bookings";

type BookingsTableProps = {
  bookings?: readonly Booking[];
};

export default function BookingsTable({
  bookings = initialBookings,
}: BookingsTableProps) {
  return (
    <table>
      <caption>Desk bookings</caption>
      <thead>
        <tr>
          <th scope="col">Desk</th>
          <th scope="col">Floor</th>
          <th scope="col">Date</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <tr key={booking.id}>
              <th scope="row">{booking.desk}</th>
              <td>{booking.floor}</td>
              <td>
                <time dateTime={booking.date}>{booking.date}</time>
              </td>
              <td>{booking.active ? "Active" : "Inactive"}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4}>No bookings found.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}