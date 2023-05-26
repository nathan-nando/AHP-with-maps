import styles from "./style.module.css";
import React, {FC} from "react";
import {Col, Container, Row} from "react-bootstrap";
import "../../shared/plugins/plugins"
import {Sidebar} from "../../components/organisms/Sidebar/Sidebar";
import {Outlet} from "react-router-dom";

export const Root: FC = () => {
    return <Container className={styles.root} fluid>
        <Row>
            <Col lg={2}>
                <Sidebar/>
            </Col>
            <Col className={""} >
                <div className={styles.pageWrapper}>

                </div>
                <Outlet/>
            </Col>
        </Row>
    </Container>
};
