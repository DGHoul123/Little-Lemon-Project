import { Route,Routes } from "react-router-dom";
import Homepage from "./Components/Homepage";
import Booking from "./Components/Booking";
import About from "./Components/About";
import Menu from "./Components/Menu";
import Online from "./Components/Online";
import LoginUser from "./Components/LoginUser";

function Main(){
    return (
        <main className="main-container">
            <Routes>
                <Route path="/" element={<Homepage/>}></Route>
                <Route path="/Booking" element={<Booking/>}></Route>
                <Route path="/about" element={<About/>}></Route>
                <Route path="/menu" element={<Menu/>}></Route>
                <Route path="/order-online" element={<Online/>}></Route>
                <Route path="/login" element={<LoginUser/>}></Route>
            </Routes>
        </main>
    );
}

export default Main;