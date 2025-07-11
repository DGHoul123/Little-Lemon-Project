

import { Route,Routes } from "react-router-dom";
import Homepage from "./Components/Homepage";
import Booking from "./Components/Booking";
import About from "./Components/About";
import Menu from "./Components/Menu";
import Online from "./Components/Online";
import LoginUser from "./Components/LoginUser";
import { useReducer,useEffect } from "react";


function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function Main(){

    const[availableTimes,dispatch]=useReducer(updateTimes,initializeTimes);

    function updateTimes(state,action){
         switch (action.type) {
        case 'SET_TIMES':
            console.log(`[Reducer] Setting times to:`, action.payload);
            return action.payload;
        case 'UPDATE_TIMES':
            console.log(`[Reducer] Date changed. Clearing old times.`);
            return [];
        default:
            return state;
    }}

    function initializeTimes(){
        console.log("[Main] Initializing availableTimes state.");
        return [];
    }
    useEffect(() => {
        const today = new Date();
        console.log(`[Main] useEffect: Initial fetchAPI call for today (${formatDate(today)})...`);
        try {
            const times = window.fetchAPI(today);
            dispatch({ type: 'SET_TIMES', payload: times });
        } catch (error) {
            console.error("Error fetching initial times:", error);
            dispatch({ type: 'SET_TIMES', payload: [] });
        }
    }, []);
    const fetchTimesForSelectedDate = (selectedDateString) => {
        const selectedDate = new Date(selectedDateString);
        console.log(`[Main] Date selected: ${selectedDateString}. Calling fetchAPI...`);
        dispatch({ type: 'UPDATE_TIMES', payload: selectedDateString });

        try {
            const times = window.fetchAPI(selectedDate);
            dispatch({ type: 'SET_TIMES', payload: times });
        } catch (error) {
            console.error(`Error fetching times for ${selectedDateString}:`, error);
            dispatch({ type: 'SET_TIMES', payload: [] });
        }
    };
    return (
        <main className="main-container">
            <Routes>
                <Route path="/" element={<Homepage/>}></Route>
                <Route path="/Booking" element={<Booking
                    availableTimes={availableTimes}
                    fetchTimesForSelectedDate={fetchTimesForSelectedDate}
                />}></Route>
                <Route path="/about" element={<About/>}></Route>
                <Route path="/menu" element={<Menu/>}></Route>
                <Route path="/order-online" element={<Online/>}></Route>
                <Route path="/login" element={<LoginUser/>}></Route>
            </Routes>
        </main>
    );
}

export default Main;