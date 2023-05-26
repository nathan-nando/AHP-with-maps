import styles from "./style.module.css";
import {FC} from "react";
import {Container} from "react-bootstrap";
import "../../shared/plugins/plugins"
import {Sidebar} from "../../components/organisms/Sidebar/Sidebar";

export const Root: FC = () => {
    return <Container className={styles.root} fluid>
        <Sidebar/>
    </Container>
};
