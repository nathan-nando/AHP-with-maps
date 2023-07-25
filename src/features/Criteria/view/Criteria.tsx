import React, {FC, useEffect} from "react";
import {useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../app/store";
import {changeValueCriteria} from "../store/slice";
import {useAppDispatch} from "../../../app/hooks";
import {Loading} from "../../../components/atoms/Loading/Loading";
import styles from "./style.module.css"
import {HeaderText} from "../../../components/atoms/HeaderText/HeaderText";
import {Badge, Form, FormSelect, Table} from "react-bootstrap";
import {ButtonSave} from "../../../components/atoms/ButtonSave/ButtonSave";
import {fetchCriteria, updateCriteria} from "../store/thunk";
import {TransformStream} from "stream/web";
import {titleTable} from "../../../shared/helpers/helpers";

export const Criteria: FC = () => {
    const state = useSelector((state: RootState) => state.criteriaState)
    const dispatch: AppDispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchCriteria())
    }, [dispatch])

    const criteriaTitle: string[] = [
        "",
        "Timbulan Sampah",
        "Jarak Alternatif menuju TPA",
        "Jarak ke Pemukiman",
        "Jarak ke Sungai",
        "Partisipasi Masyarakat",
        "Cakupan Rumah",
        "Aksesibilitas"];


    const handlerChange = (value: number, indexRow: number, indexCol: number) => {
        if (value >= 0 && value <= 9) {
            dispatch(changeValueCriteria({value: value, indexCol: indexCol, indexRow: indexRow}))
        }
    }

    const handlerClick = async () => {
        await dispatch(updateCriteria())
        await dispatch(fetchCriteria())
    }

    return <>
        <HeaderText text={"Halaman Kriteria"} boxHeight={30}/>
        <div className={"mt-5 col-lg-12 mx-auto"}>
            <Badge bg={state.consistencyRatio ? "success" : "danger"}
                   className={"p-3 mb-4"}>{state.consistencyRatio ? "Data matrix konsisten" : "Data matrix tidak konsisten"}</Badge>

            {state.loading ? <div className={"text-center"}><Loading width={400} height={400}/></div> :
                <Table bordered className={"text-center"}>
                    <thead>
                    <tr>
                        {criteriaTitle.map((e, index) => {
                            return <th key={index}>{e}</th>
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {criteriaTitle.shift()}
                    {criteriaTitle.map((criteriaTitle, indexRow) => {
                        return <tr>
                            <th>{criteriaTitle}</th>
                            {state.criteria.pairwise!.map((pairwise, indexCol) => {
                                if (indexCol === 0 && indexRow > 0) {
                                    return <td>
                                        <div
                                            className={styles.mutedShape}> {state.criteria.pairwise![indexRow][indexCol]}</div>
                                    </td>
                                }
                                if (indexRow === indexCol) {
                                    return <td>
                                        <div
                                            className={`mx-auto ${styles.greenShape}`}>{state.criteria.pairwise![indexRow][indexCol]}</div>
                                    </td>
                                }
                                if (indexRow < indexCol) {
                                    return <td>
                                        <div>
                                            <Form.Control type={"number"}
                                                          value={state.criteria.pairwise![indexRow][indexCol]}

                                                          onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
                                                              let e: number = value.target.valueAsNumber || 0
                                                              handlerChange(e, indexRow, indexCol)
                                                          }}/>
                                            {/*<FormSelect value={state.criteria.pairwise![indexRow][indexCol]}*/}
                                            {/*            onChange={(value: React.ChangeEvent<HTMLSelectElement>) => {*/}
                                            {/*                if (Number(value.target.value)  >= 0 && Number(value.target.value)  <= 9) {*/}
                                            {/*                    onChange(value, indexRow, indexCol)*/}
                                            {/*                }*/}
                                            {/*            }}>*/}
                                            {/*    {options.map((option) => {*/}
                                            {/*        return <option value={option} defaultValue={3}>{option}</option>*/}
                                            {/*    })}*/}
                                            {/*</FormSelect>*/}
                                        </div>
                                    </td>
                                }
                                if (indexRow > indexCol && indexCol > 0) {
                                    return <td>
                                        <div
                                            className={styles.mutedShape}>{state.criteria.pairwise![indexRow][indexCol]}</div>
                                    </td>
                                }
                                return <td></td>
                            })}
                        </tr>
                    })}
                    </tbody>
                    <div className={"pt-3 pb-5"}>
                        <ButtonSave text={"Save"} onClick={handlerClick}/>
                    </div>
                </Table>}

            {state.loading ? <div className={"text-center"}><Loading width={400} height={400}></Loading></div> :
                <div className={"col-lg-12 mt-5"}>
                    {state.criteria.weights ?<div style={{overflowY: "scroll", height: "50vh", display: "block"}}
                                                  className={"shadow-sm p-4 border"}>
                        <h5 className={"mb-4"}>Tabel Bobot Kriteria</h5>
                        <Table bordered>
                            <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama Criteria</th>
                                <th>Bobot Criteria</th>
                            </tr>
                            </thead>
                            <tbody>
                            {state.criteria.weights!.map((weight, index) => {
                                return <tr>
                                    <td>{index + 1}</td>
                                    <td>{titleTable[index + 2]}</td>
                                    <td>{weight.toPrecision(3)}</td>
                                </tr>
                            })}
                            </tbody>
                        </Table>
                    </div> :<div></div>}

                </div>}

        </div>

    </>
}

