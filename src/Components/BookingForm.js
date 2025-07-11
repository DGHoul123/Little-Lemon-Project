

import React,{useState,useEffect} from "react";

function BookingForm({availableTimes,fetchTimesForSelectedDate }){
    const[guest,setGuest]=useState(1);
    function updateGuest(e){
        setGuest(parseInt(e.target.value));
    }

    const[date,setDate]=useState("");
        function updateDate(e){
        const newDate = e.target.value;
        setDate(newDate);
        fetchTimesForSelectedDate(newDate);
        console.log(`[BookingForm] Date changed to ${newDate}. New times requested.`);
    }

     useEffect(() => {
        if (availableTimes && availableTimes.length > 0) {
            setTime(availableTimes[0]);
        } else {
            setTime("");
        }
    }, [availableTimes]);

    const[time,setTime]=useState(availableTimes.length > 0 ? availableTimes[0] : "");
    function updateTime(e){
        setTime(e.target.value);
    }

    const[occasion,setOccasion]=useState("Select the event");
    function updateOccasion(e){
        setOccasion(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const bookingDetails = { date, time, guest, occasion };
        console.log("[BookingForm] Submitting:", bookingDetails);

        try {
            const success = window.submitAPI(bookingDetails);
            if (success) {
                alert("Reservation submitted successfully!");
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
            <label for='res-date'>Choose Date</label>
            <input type="date" id="res-date" value={date} onChange={updateDate}></input>
            <label for="res-time">Choose Time</label>
            <select id="res-time" onChange={updateTime} value={time}>
                {availableTimes && availableTimes.length > 0 ? (
                    availableTimes.map((availableTime) => (
                        <option key={availableTime} value={availableTime}>{availableTime}</option>
                    ))
                ) : (
                    <option value="" disabled>No times available</option>
                )}
            </select>
            <label for='guests'>Number of Guests</label>
            <input type="number" id="guests" placeholder="1" min={1} max={10} value={guest} onChange={updateGuest}></input>
            <label for='occasion'>Occation</label>
            <select id='occasion' value={occasion} onChange={updateOccasion}>
                <option value="Select the event" disabled>Select the event</option>
                <option>Birthday</option>
                <option>Engagement</option>
            </select>
            <input type="submit" value="Make your Reservation"></input>
        </form>
    );
}

export default BookingForm;