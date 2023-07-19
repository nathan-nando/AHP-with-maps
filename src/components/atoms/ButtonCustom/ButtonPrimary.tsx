import styles from "./style.module.css"
import {Button} from "react-bootstrap";
import React from "react";

type props = {
    text: string,
    fontSize?: number,
    mode?: string,
    onClick?: () => void,
}
export const ButtonCustom = ({fontSize, mode, text, onClick}: props) => {
    if (mode === "primary") {
        return <Button className={styles.btnPrimary} onClick={onClick}>{text}</Button>
    } else if (mode === "secondary") {
        return <Button className={styles.btnSecondary} onClick={onClick}>{text}</Button>
    } else if (mode === "danger") {
        return <Button className={styles.btnDanger} onClick={onClick}>{text}</Button>
    } else {
        return <Button className={styles.btnPrimary} onClick={onClick}>{text}</Button>
    }
}