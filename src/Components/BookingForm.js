

import React,{useState,useEffect,useCallback} from "react";

function BookingForm({availableTimes,fetchTimesForSelectedDate }){
    const[guest,setGuest]=useState(0);
    function updateGuest(e){
        setGuest(parseInt(e.target.value));
    }

    const [isFormValid, setIsFormValid] = useState(false);

    const[date,setDate]=useState("");
        function updateDate(e){
        const newDate = e.target.value;
        setDate(newDate);
        fetchTimesForSelectedDate(newDate);
        console.log(`[BookingForm] Date changed to ${newDate}. New times requested.`);
    }

     useEffect(() => {
        if (availableTimes && availableTimes.length > 0) {
            setTime("");
        } else {
            setTime("");
        }
    }, [availableTimes]);

    const[time,setTime]=useState("");
    function updateTime(e){
        setTime(e.target.value);
    }

    const[occasion,setOccasion]=useState("Select the event");
    function updateOccasion(e){
        setOccasion(e.target.value);
    }

    const resetForm = () => {
        setGuest(0);
        setDate("");
        setTime("");
        setOccasion("Select the event");
    };

    const validateForm = useCallback(() => {
        const isValidDate = date !== "";
        const isValidTime = time !== "";
        const isValidGuest = guest >= 1 && guest <= 10;
        const isValidOccasion = occasion !== "Select the event";
        setIsFormValid(isValidDate && isValidTime && isValidGuest && isValidOccasion);
    }, [date, time, guest, occasion]);

    useEffect(() => {
        validateForm();
    }, [date, time, guest, occasion, validateForm]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const bookingDetails = { date, time, guest, occasion };
        console.log("[BookingForm] Submitting:", bookingDetails);

        try {
            const success = window.submitAPI(bookingDetails);
            if (success) {
                alert("Reservation submitted successfully!");
                resetForm();
            } else {
                alert("Failed to submit reservation. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting reservation:", error);
            alert("An error occurred during submission. Please try again.");
        }
    };

    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor='res-date'>Choose Date</label>
            <input type="date" id="res-date" value={date} onChange={updateDate} required></input>
            <label htmlFor="res-time">Choose Time</label>
            <select id="res-time" onChange={updateTime} value={time} required>
                <option value="" disabled>Select the time</option>
                {availableTimes && availableTimes.length > 0 ? (
                    availableTimes.map((availableTime) => (
                        <option key={availableTime} value={availableTime}>{availableTime}</option>
                    ))
                ) : (
                    <option value="" disabled>No times available</option>
                )}
            </select>
            <label htmlFor='guests' required>Number of Guests</label>
            <input type="number" id="guests" placeholder="1" min={1} max={10} value={guest} onChange={updateGuest} required></input>
            <label htmlFor='occasion'>Occation</label>
            <select id='occasion' value={occasion} onChange={updateOccasion}>
                <option value="Select the event" disabled>Select the event</option>
                <option>Birthday</option>
                <option>Engagement</option>
            </select>
            <input type="submit" value="Make your Reservation" disabled={!isFormValid}  aria-label="On Click"></input>
        </form>
    );
}

export default BookingForm;