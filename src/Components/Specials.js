import "./Components.css";
import { RiEBike2Fill } from "react-icons/ri";


function Specials({file,alt,head,price,descrip}){
    return (
        <>
            <div className="special">
                <div>
                    <img src={file} alt={alt} className="pp"/>
                </div>
                <div className="container">
                    <div className="head">
                        <h3>{head}</h3>
                        <p>{price}</p>
                    </div>
                    <div className="dis">
                        <p>{descrip}</p>
                    </div>
                    <div className="stick">
                        <p>Order a delivery</p>
                        <RiEBike2Fill />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Specials;