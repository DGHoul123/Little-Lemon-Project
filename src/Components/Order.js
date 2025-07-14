import { PiShoppingCartSimpleFill } from "react-icons/pi";

function order({src2,alt2,head2,des2,price}){
    return (
        <>
            <div className="menu">
                <div className="menu-img">
                    <img src={src2} alt={alt2}></img>
                </div>
                <div className="menu-content">
                    <div className="menu-des">
                        <h2>{head2}</h2>
                        <p>{price}</p>
                    </div>
                    <div className="dess">
                        <p>{des2}</p>
                    </div>
                    <div className="order">
                        <p>Add to cart</p>
                        <PiShoppingCartSimpleFill />
                    </div>
                </div>
            </div>
        </>
    );
}

export default order;