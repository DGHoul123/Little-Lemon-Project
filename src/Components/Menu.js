import Order from "./Order";
import p1 from "./files/greek salad.jpg";
import p2 from "./files/lemon dessert.jpg";
import p3 from "./files/bruchetta.svg";

function Menu(){
    return (
        <>
            <div>
                <div className="menu-heading">
                    <h1>Menu</h1>
                </div>
                <hr class="my-horizontal-line"></hr>
                <div className="mm">
                    <Order
                        src2={p1}
                        des2={"The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons. "}
                        head2={"Greek Salad"}
                        alt2={"Greek Salad"}
                        price={"$12.99"}
                    />
                    <Order
                        src2={p2}
                        des2={"Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil. "}
                        head2={"Bruchetta"}
                        alt2={"Bruchetta"}
                        price={"$5.99"}
                    />
                    <Order
                        src2={p3}
                        des2={"This comes straight from grandma’s recipe book, every last ingredient has been sourced and is as authentic as can be imagined."}
                        head2={"Lemon Dessert"}
                        alt2={"Lemon Dessert"}
                        price={"$5.00"}
                    />
                </div>
            </div>
        </>
    );
}

export default Menu;