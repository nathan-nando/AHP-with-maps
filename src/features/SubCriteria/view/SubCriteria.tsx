import React, {FC, useEffect} from "react";
import {HeaderText} from "../../../components/atoms/HeaderText/HeaderText";
import {useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../app/store";
import {useAppDispatch} from "../../../app/hooks";
import styles from "./style.module.css"
import {fetchSubCriteria} from "../store/thunk";
import {Loading} from "../../../components/atoms/Loading/Loading";
import {nameSubCriteria, removeUnderScore} from "../../../shared/helpers/helpers";
import {Col, Row, Table} from "react-bootstrap";
import {changeCompSC} from "../store/slice";

export const SubCriteria: FC = () => {
    const state = useSelector((state: RootState) => state.subCriteriaState)
    const dispatch: AppDispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchSubCriteria())
    }, [dispatch]);

    function getTitle():string[]{
        const data = Object.getOwnPropertyNames(state.subCriteria.timbulan_sampah || {})
        data.shift()
        return data
    }

    return <>
        <HeaderText text={"Halaman Sub Criteria"} boxHeight={40}/>
        {state.loading ? <div><Loading width={400} height={400}/></div> : <div className={"mt-5"}>
            <Row className={"text-center"}>
                {nameSubCriteria.map((value, index) => {
                    return <Col className={styles.navSC} key={index} onClick={() => {
                        dispatch(changeCompSC(index))
                    }}>{value}</Col>
                })}
            </Row>
            <div className={"ms-3 mt-3"}>
                <h5>{nameSubCriteria[state.selected]}</h5>
                <Table bordered>
                    <thead>
                    <tr>
                        {getTitle().map((value, index, array)=>{
                            return <td>{removeUnderScore(value) }</td>
                        })}
                    </tr>
                    </thead>
                </Table>
            </div>
        </div>}
    </>
}