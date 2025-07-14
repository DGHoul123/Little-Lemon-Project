import photo from "./files/restauranfood.jpg";
import './Components.css';
import CallToAction from "./CallToAction";
import Specials from "./Specials";
import p1 from "./files/greek salad.jpg";
import p2 from "./files/lemon dessert.jpg";
import p3 from "./files/bruchetta.svg";
import Review from "./Review";
import ph1 from "./files/images/Giulia.jpeg";
import ph2 from "./files/images/5.jpeg";
import ph3 from "./files/images/4.jpeg";
import ph4 from "./files/images/1.jpeg";
import chef1 from "./files/Mario and Adrian A.jpg";
import chef2 from "./files/Mario and Adrian b.jpg"

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
            <div className="hreview">
                <div>
                    <h1 className="heading">Testimonial</h1>
                </div>
                <div className="hreview1">
                    <Review
                        src1={ph1}
                        alt1={"photo"}
                        para1={"Giulia"}
                        description1={"Cozy atmosphere and fresh ingredients. You can really taste the love in every bite."}
                    />
                    <Review
                        src1={ph2}
                        alt1={"photo"}
                        para1={"Marco"}
                        description1={"A hidden gem! The flavors are authentic, and the touch of lemon makes every dish stand out."}
                    />
                    <Review
                        src1={ph3}
                        alt1={"photo"}
                        para1={"Elena"}
                        description1={"Perfect for a quiet dinner. The lemon pasta was incredible—simple, yet unforgettable."}
                    />
                    <Review
                        src1={ph4}
                        alt1={"photo"}
                        para1={"Luca"}
                        description1={"Great service, warm vibe, and amazing food. I’ll definitely be coming back!"}
                    />
                </div>
            </div>
            <div className="intro1">
                <div className="intro">
                    <h1>Little Lemon</h1>
                    <p className="intro2">Chicago</p>
                    <p>Situato in una pittoresca via italiana, Little Lemon è un ristorante che unisce tradizione mediterranea e creatività moderna. I piatti sono preparati con ingredienti freschi e locali, arricchiti da un tocco di limone che dona freschezza e carattere a ogni portata. L’ambiente è intimo e accogliente, perfetto per una cena rilassante o un pranzo tra amici.</p>
                </div>
                <div className="chef">
                    <img src={chef1} alt="Chef 1"></img>
                    <img src={chef2} alt="Chef 2"></img>
                </div>
            </div>
        </>
    );
}

export default Homepage;