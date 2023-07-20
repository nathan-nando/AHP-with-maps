import {Button, Form, Modal, Table} from "react-bootstrap";
import {AppDispatch, RootState} from "../../../app/store";
import {useAppDispatch} from "../../../app/hooks";
import {hideModal, modeModalToCreate, showModal} from "../../../features/Root/store/slice";
import React, {ReactNode} from "react";
import {useSelector} from "react-redux";
import styles from "./style.module.css"
import {clearForm} from "../../../features/Collections/store/slice";

type props = {
    modalTitle: string,
    modalSize: "sm" | "lg" | "xl" | undefined,
    buttonTitle: string,
    children: ReactNode,
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}
export const ModalCustom = ({modalTitle, buttonTitle, children, modalSize, onSubmit}: props) => {
    const state = useSelector((state: RootState) => state.globalState)
    const dispatch: AppDispatch = useAppDispatch();


    return <>
        <Button variant="primary" className={styles.btnPrimary} onClick={() => {
            dispatch(clearForm());
            dispatch(showModal());
            dispatch(modeModalToCreate());
        }}>
            {buttonTitle}
        </Button>
        <Modal show={state.showModal} onHide={() => dispatch(hideModal())} animation={true} size={modalSize}>
            <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>{children}</Modal.Body>
                <Modal.Footer>
                    <Button variant={"secondary"} onClick={() => dispatch(hideModal())}>Close</Button>
                    <Button type={"submit"} variant={"primary"} className={styles.btnPrimary}>Save</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    </>


}