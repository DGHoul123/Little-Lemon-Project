import BookingForm from "./BookingForm";
import './Components.css';

function Booking({ availableTimes, fetchTimesForSelectedDate }) {
    return (
        <section className="se">
            <h1>Reserve a Table</h1>
            <BookingForm
                availableTimes={availableTimes}
                fetchTimesForSelectedDate={fetchTimesForSelectedDate}
            />
        </section>
    );
}

export default Booking;