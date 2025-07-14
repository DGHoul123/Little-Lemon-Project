import { CiStar } from "react-icons/ci";


function Review({src1,alt1,para1,description1}){
    return (
        <>
            <div className="review">
                <div className="rating">
                    <h3>Rating</h3>
                    <CiStar/>
                </div>
                <div className="rate-img">
                    <img src={src1} alt={alt1}></img>
                    <p>{para1}</p>
                </div>
                <div className="rate-des">
                    <p>{description1}</p>
                </div>
            </div>
        </>
    );
}

export default Review;