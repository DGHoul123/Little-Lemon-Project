import { Link } from "react-router-dom";
import './Components.css';

function CallToAction({props,val}){
    return (
        <Link to={props} className="button">{val}</Link>
    );
}

export default CallToAction;