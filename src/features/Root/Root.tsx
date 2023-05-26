import styles from "./style.module.css";
import {FC} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Link, Outlet} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Button} from "react-bootstrap";
import {fakeFetch} from "./rootSlice";

type Props = {};

export const Root: FC = (props: Props) => {
    const loading = useAppSelector(state => state.someState.loading)
    const user = useAppSelector(state => state.someState.user)
    const dispatch = useAppDispatch();

    return (
        <div className={styles.root}>
            <h5>Root pages</h5>

            <Link to={"/other-pages"}>other componenets</Link>
            <div className={"mt-5"}>
                <p>user: {user? user.username : "empty"}</p>
                Loading : {String(loading)}
            </div>
            <Button onClick={() => {
                dispatch(fakeFetch())
            }}>Login</Button>
            <Outlet/>
        </div>
    );
};
