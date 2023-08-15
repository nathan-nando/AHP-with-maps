import React, {FC, ReactNode, useEffect} from "react";
import {HeaderText} from "../../../components/atoms/HeaderText/HeaderText";
import {useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../app/store";
import {useAppDispatch} from "../../../app/hooks";
import styles from "./style.module.css"
import {checkConsistencySC, fetchSubCriteria, updateSubCriteria} from "../store/thunk";
import {Loading} from "../../../components/atoms/Loading/Loading";
import {nameSubCriteria, removeUnderScore} from "../../../shared/helpers/helpers";
import {Col, Form, Row, Table} from "react-bootstrap";
import {changeCompSC, changeValueSC} from "../store/slice";
import {ButtonSave} from "../../../components/atoms/ButtonSave/ButtonSave";
import {fetchCriteria} from "../../Criteria/store/thunk";

export const SubCriteria: FC = () => {
    const state = useSelector((state: RootState) => state.subCriteriaState)
    const timbulanSampah = state.subCriteria.timbulan_sampah;
    const jarakTPA = state.subCriteria.jarak_tpa;
    const jarakPemukiman = state.subCriteria.jarak_pemukiman;
    const jarakSungai = state.subCriteria.jarak_sungai;
    const partisipasi = state.subCriteria.partisipasi_masyarakat;
    const cakupanRumah = state.subCriteria.cakupan_rumah;
    const aksesibilitas = state.subCriteria.aksesibilitas;
    const dispatch: AppDispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchSubCriteria())
    }, [dispatch]);

    const handlerChange = (value: number, indexRow: number, indexCol: number) => {
        if (value >= 0 && value <= 9) {
            dispatch(changeValueSC({value: value, indexCol: indexCol, indexRow: indexRow}))
        }
    }

    function getTitle(selected: number, mode: string): string[] {
        let data: string[]
        switch (selected) {
            case 0: {
                data = Object.getOwnPropertyNames(state.subCriteria.timbulan_sampah || {})
                break
            }
            case 1: {
                data = Object.getOwnPropertyNames(state.subCriteria.jarak_tpa || {})
                break
            }
            case 2: {
                data = Object.getOwnPropertyNames(state.subCriteria.jarak_pemukiman || {})
                break
            }
            case 3: {
                data = Object.getOwnPropertyNames(state.subCriteria.jarak_sungai || {})
                break
            }
            case 4: {
                data = Object.getOwnPropertyNames(state.subCriteria.partisipasi_masyarakat || {})
                break
            }
            case 5: {
                data = Object.getOwnPropertyNames(state.subCriteria.cakupan_rumah || {})
                break
            }
            case 6: {
                data = Object.getOwnPropertyNames(state.subCriteria.aksesibilitas || {})
                break
            }
            default: {
                data = Object.getOwnPropertyNames(state.subCriteria.timbulan_sampah || {})
                break
            }
        }
        data.shift()
        data.unshift("")
        if (mode === "horizontal") {
            data.shift()
        }
        return data
    }

    function getSCTableByMode(mode: number, indexRow: number): ReactNode {
        switch (mode) {
            case 0: {
                return timbulanSampah!.pairwise.pairwise!.map((value, indexCol, arr) => {
                    return getSCContentTable(arr, indexRow, indexCol)

                })
            }
            case 1: {
                return jarakTPA!.pairwise.pairwise!.map((value, indexCol, arr) => {
                    return getSCContentTable(arr, indexRow, indexCol)
                })
            }
            case 2: {
                return jarakPemukiman!.pairwise.pairwise!.map((value, indexCol, arr) => {
                    return getSCContentTable(arr, indexRow, indexCol)
                })
            }
            case 3: {
                return jarakSungai!.pairwise.pairwise!.map((value, indexCol, arr) => {
                    return getSCContentTable(arr, indexRow, indexCol)
                })
            }
            case 4: {
                return partisipasi!.pairwise.pairwise!.map((value, indexCol, arr) => {
                    return getSCContentTable(arr, indexRow, indexCol)
                })
            }
            case 5: {
                return cakupanRumah!.pairwise.pairwise!.map((value, indexCol, arr) => {
                    return getSCContentTable(arr, indexRow, indexCol)
                })
            }
            case 6: {
                return aksesibilitas!.pairwise.pairwise!.map((value, indexCol, arr) => {
                    return getSCContentTable(arr, indexRow, indexCol)
                })
            }
            default: {
                return timbulanSampah!.pairwise.pairwise!.map((value, indexCol, arr) => {
                    return getSCContentTable(arr, indexRow, indexCol)
                })
            }
        }


    }

    function getSCContentTable(arr: number[][], indexRow: number, indexCol: number): ReactNode {
        if (indexCol === 0 && indexRow > 0) {
            return <td>
                <div className={styles.mutedShape}>{arr[indexRow][indexCol]}</div>
            </td>
        }
        if (indexRow === indexCol) {
            return <td>
                <div className={`mx-auto ${styles.greenShape}`}>{arr[indexRow][indexCol]}</div>
            </td>
        }
        if (indexRow < indexCol) {
            return <td>
                <div>
                    <Form.Control type={"number"}
                                  value={arr[indexRow][indexCol]}
                                  onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
                                      let e: number = value.target.valueAsNumber || 0
                                      handlerChange(e, indexRow, indexCol)
                                  }}/>
                </div>
            </td>
        }
        if (indexRow > indexCol && indexCol > 0) {
            return <td>
                <div
                    className={styles.mutedShape}>{arr[indexRow][indexCol]}
                </div>
            </td>
        }
        return <td></td>
    }

    const handlerClick = async () => {
        await dispatch(updateSubCriteria())
        await dispatch(fetchCriteria())
    }

    function getWeightSC(mode: number): ReactNode {
        if (timbulanSampah && jarakTPA && jarakPemukiman && jarakSungai && partisipasi && cakupanRumah && aksesibilitas) {
            switch (mode) {
                case 0: {
                    return timbulanSampah!.pairwise.weights!.map((value, index) => {
                        return contentWeightSC(value, index)
                    })
                }
                case 1: {
                    return jarakTPA!.pairwise.weights!.map((value, index) => {
                        return contentWeightSC(value, index)
                    })
                }
                case 2: {
                    return jarakPemukiman!.pairwise.weights!.map((value, index) => {
                        return contentWeightSC(value, index)
                    })
                }
                case 3: {
                    return jarakSungai!.pairwise.weights!.map((value, index) => {
                        return contentWeightSC(value, index)
                    })
                }
                case 4: {
                    return partisipasi!.pairwise.weights!.map((value, index) => {
                        return contentWeightSC(value, index)
                    })
                }
                case 5: {
                    return cakupanRumah!.pairwise.weights!.map((value, index) => {
                        return contentWeightSC(value, index)
                    })
                }
                case 6: {
                    return aksesibilitas!.pairwise.weights!.map((value, index) => {
                        return contentWeightSC(value, index)
                    })
                }
                default : {
                    return timbulanSampah!.pairwise.weights!.map((value, index) => {
                        return contentWeightSC(value, index)
                    })
                }
            }
        }


    }

    function contentWeightSC(value: number, index: number): ReactNode {
        return <tr>
            <td>{index + 1}</td>
            <td> {removeUnderScore(getTitle(state.selected, "horizontal")[index])}</td>
            <td>{value.toPrecision(3)}</td>
        </tr>
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
            <div className={"ms-3 mt-5"}>
                <h5>{nameSubCriteria[state.selected]}</h5>
                <Table bordered className={"mt-4"}>
                    <thead>
                    <tr>
                        {getTitle(state.selected, "vertical").map((value, index, array) => {
                            return <th key={value}>{removeUnderScore(value)}</th>
                        })}
                    </tr>
                    </thead>
                    <tbody>

                    {getTitle(state.selected, "horizontal").map((value, indexRow, array) => {
                        return <tr>
                            <th key={value}>{removeUnderScore(value)}</th>
                            {getSCTableByMode(state.selected, indexRow)}
                        </tr>
                    })}
                    </tbody>

                    <div className={"pt-3 pb-5"}>
                        <ButtonSave text={"Save"} onClick={handlerClick}/>
                    </div>
                </Table>
            </div>


            <div className={"mt-4 col-lg-12"}>
                <div style={{overflowY: "scroll", height: "50vh", display: "block"}}
                     className={"shadow-sm p-4 border"}>
                    <h5 className={"mb-3 mt-2"}>Tabel {nameSubCriteria[state.selected]}</h5>
                    <Table bordered>
                        <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Sub Criteria</th>
                            <th>Bobot Criteria</th>
                        </tr>
                        </thead>
                        <tbody>
                        {getWeightSC(state.selected)}
                        </tbody>
                    </Table>
                </div>

            </div>
        </div>}
    </>
}