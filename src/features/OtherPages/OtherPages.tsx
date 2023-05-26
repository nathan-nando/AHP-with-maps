import {FC} from "react";
import {Link} from "react-router-dom";

export const OtherPages:FC = () =>{
    return <div className={"mt-5"}>
        <h5>Some component</h5>
        <Link to={"/"}>back to root</Link>
    </div>
}