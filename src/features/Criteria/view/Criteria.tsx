import React, {FC, useEffect} from "react";
import {useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../app/store";
import {changeValueCriteria} from "../store/slice";
import {useAppDispatch} from "../../../app/hooks";
import {Loading} from "../../../components/atoms/Loading/Loading";
import styles from "./style.module.css"
import {HeaderText} from "../../../components/atoms/HeaderText/HeaderText";
import {Badge, FormSelect, Table} from "react-bootstrap";
import {ButtonSave} from "../../../components/atoms/ButtonSave/ButtonSave";
import {fetchCriteria, updateCriteria} from "../store/thunk";

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

    const options: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>, indexRow: number, indexCol: number) => {
        let value = parseInt(event.target.value ?? 1)
        dispatch(changeValueCriteria({value: value, indexCol: indexCol, indexRow: indexRow}))
        // state.criteria.pairwise[indexCol][indexRow] = parseFloat((1 / tempValue).toFixed(3))
    }

    const handlerClick = () => {
        dispatch(updateCriteria())
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
                                            <FormSelect value={state.criteria.pairwise![indexRow][indexCol]}
                                                        onChange={(value: React.ChangeEvent<HTMLSelectElement>) => {
                                                            onChangeSelect(value, indexRow, indexCol)
                                                        }}>
                                                {options.map((option) => {
                                                    return <option value={option} defaultValue={3}>{option}</option>
                                                })}
                                            </FormSelect>
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
                </Table>}

        </div>
        <ButtonSave text={"Save"} onClick={handlerClick}/>
    </>
}

