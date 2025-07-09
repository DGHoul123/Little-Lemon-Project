import photo from "./important document/restauranfood.jpg";
import './Components.css';

function Homepage(){
    return (
        <>
            <div className="home">
                <div className="content">
                    <h1>Little Lemon</h1>
                    <p className="city">Chicago</p>
                    <p>Little Lemon è un ristorante accogliente nel cuore d'Italia, specializzato in cucina mediterranea fresca e genuina. Con un tocco di limone in ogni piatto, offriamo sapori semplici ma raffinati in un'atmosfera calda e familiare.</p>
                </div>
                <div className="image">
                    <img src={photo} alt="Photo"/>
                </div>
            </div>
        </>

    );
}

export default Homepage;