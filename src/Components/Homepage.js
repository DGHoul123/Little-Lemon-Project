import photo from "./files/restauranfood.jpg";
import './Components.css';
import CallToAction from "./CallToAction";
import Specials from "./Specials";
import p1 from "./files/greek salad.jpg";
import p2 from "./files/lemon dessert.jpg";
import p3 from "./files/bruchetta.svg";

function Homepage(){
    return (
        <>
            <div className="home">
                <div className="content">
                    <h1>Little Lemon</h1>
                    <p className="city">Chicago</p>
                    <p>Little Lemon è un ristorante accogliente nel cuore d'Italia, specializzato in cucina mediterranea fresca e genuina. Con un tocco di limone in ogni piatto, offriamo sapori semplici ma raffinati in un'atmosfera calda e familiare.</p>
                    <CallToAction
                        props={"/Booking"}
                        val={"Reserve a Table"}
                    />
                </div>
                <div className="image">
                    <img src={photo} alt="Main chef"/>
                </div>
            </div>

            <div>
                <div className="spe">
                    <h1>This Weeks Special!</h1>
                    <CallToAction
                        props={"/menu"}
                        val={"Online Menu"}
                        className="but"
                    />
                </div>
                <div className="oo">
                    <Specials
                        file={p1}
                        alt={"Greek Salad"}
                        price={"$12.99"}
                        head={"Greek Salad"}
                        descrip={"The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons. "}
                    />
                    <Specials
                        file={p3}
                        alt={"Bruchetta"}
                        price={"$5.99"}
                        head={"Bruchetta"}
                        descrip={"Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil. "}
                    />
                    <Specials
                        file={p2}
                        alt={"Lemon Dessert"}
                        price={"$5.00"}
                        head={"Lemon Dessert"}
                        descrip={"This comes straight from grandma’s recipe book, every last ingredient has been sourced and is as authentic as can be imagined."}
                    />
                </div>
            </div>
        </>

    );
}

export default Homepage;