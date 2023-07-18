import styles from "./style.module.css"

type props = {
    text: string,
    fontSize: number,
    boxHeight: number
}
export const HeaderText = ({text = "default", fontSize = 20, boxHeight = 30,}: props) => {
    return <div className={styles.headerTextWrapper}>
        <h5>{text}</h5>
    </div>
}