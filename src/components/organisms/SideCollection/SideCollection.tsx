import styles from "./style.module.css"
import {Badge, Col, Row} from "react-bootstrap";


type props = {
    text: string,
    totalChildren: number,
}
export const SideCollection = ({text, totalChildren}: props) => {
    return <>
        <div className={`${styles.sideCollectionWrapper} mb-3 border shadow-sm p-3 rounded`}
             style={{cursor: "pointer"}}>
                <Col><span className={"bi bi-menu-app me-2"}></span></Col>
                <Col lg={{offset: 0, span: 10}} className={"mt-2"}><p style={{fontSize: 14}}>{text} </p></Col>
            {/*<Row>*/}
                {/*<Col><Badge bg={"success"} style={{fontSize: 10}} className={"p-1"}>{totalChildren}</Badge></Col>*/}
            {/*</Row>*/}

        </div>
    </>
}