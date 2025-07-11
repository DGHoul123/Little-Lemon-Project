import BookingForm from "./BookingForm";

function Booking({ availableTimes, fetchTimesForSelectedDate }) {
    return (
        <section>
            <h2>Book Your Table</h2>
            <BookingForm
                availableTimes={availableTimes}
                fetchTimesForSelectedDate={fetchTimesForSelectedDate}
            />
        </section>
    );
}

export default Booking;