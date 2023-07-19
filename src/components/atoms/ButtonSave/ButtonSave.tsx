import styles from "./style.module.css"
import {Button} from "react-bootstrap";
import React from "react";

type props = {
    text: string,
    fontSize?: number,
    onClick?: () => void,
}

export const ButtonSave = ({text, onClick, fontSize} : props)=> {
    return <Button className={styles.btnPrimary} onClick={onClick}>{text}</Button>
}