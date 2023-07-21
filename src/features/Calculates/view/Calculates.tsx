import React, {FC, useEffect} from "react";
import {HeaderText} from "../../../components/atoms/HeaderText/HeaderText";
import {Col, Row, Table} from "react-bootstrap";
import styles from "./style.module.css"
import {fetchCollectionByID, fetchCollections} from "../../Collections/store/thunk";
import {fetchAlternatives} from "../../Alternatives/store/thunk";
import {clearMarker} from "../../Alternatives/store/slice";
import {SideCollection} from "../../../components/organisms/SideCollection/SideCollection";
import {useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../app/store";
import {useAppDispatch} from "../../../app/hooks";
import {clearSelectedCollection} from "../../Collections/store/slice";
import {Loading} from "../../../components/atoms/Loading/Loading";
import {titleTable, titleTablePoint} from "../../../shared/helpers/helpers";
import {HintEmptyCollection} from "../../../components/moleculs/HintEmptyCollection/HintEmptyCollection";
import {fetchCriteria} from "../../Criteria/store/thunk";
import {calculateScores, fetchPoint} from "../store/thunk";
import {forEach} from "react-bootstrap/ElementChildren";
import {ButtonSave} from "../../../components/atoms/ButtonSave/ButtonSave";
import {ButtonCustom} from "../../../components/atoms/ButtonCustom/ButtonPrimary";

export const Calculates: FC = () => {
    const collectionState = useSelector((state: RootState) => state.collectionState)

    const globalState = useSelector((state: RootState) => state.globalState)
    const criteriaState = useSelector((state: RootState) => state.criteriaState)
    const alternativeState = useSelector((state: RootState) => state.alternativeState)
    const state = useSelector((state: RootState) => state.calculateState)

    const dispatch: AppDispatch = useAppDispatch()

    useEffect(() => {
        dispatch(clearSelectedCollection())
        dispatch(fetchCollections())
        dispatch(fetchCriteria())
    }, [dispatch])

    const handlerStartCalculate = ()=>{
        dispatch(calculateScores(collectionState.selectedCollection!.id!))

    }

    return <div>
        <HeaderText text={"Halaman Perhitungan"} boxHeight={30}/>
        <Row className={"mt-4"}>
            <Col style={{overflowY: "scroll", display: "block", height: "100vh"}} className={"pe-4"} lg={2}>
                <p>List Collections</p>
                {collectionState.collections.map((collection, index) => {
                    return <div key={collection.id} onClick={async () => {
                        await dispatch(fetchCollectionByID(collection.id!));
                        await dispatch(fetchAlternatives(collection.id!));
                        await dispatch(fetchPoint(collection.id!));
                        dispatch(clearMarker())
                    }}
                                className={`${collectionState.selectedCollection!.id === collection.id ? styles.active : ""} ${styles.hover}`}>
                        <SideCollection text={collection.name!} totalChildren={collectionState.collections.length}/>
                    </div>
                })}

            </Col>
            <Col>
                <div className={"ms-5"}>
                    {collectionState.selectedCollection!.id ? <div className={"mx-auto col-lg-12"}>
                        <h5 className={"text-center mb-5"}>{collectionState.selectedCollection!.name}</h5>

                        {collectionState.selectedCollection!.score_is_calculated ? <div>{state.loading ?
                            <div className={"text-center"}><Loading width={400} height={400}></Loading></div> :
                            <div className={"col-lg-12 mt-4"}>
                                <div className={"mb-4"}>
                                <ButtonCustom text={"Hitung ulang"} onClick={handlerStartCalculate}/>
                                </div>
                                <div className={"bg-light p-4 mb-3 rounded"} style={{fontSize: 14}}>
                                    <h5 className={"text-left"}>Langkah Pertama</h5>
                                    <ul>
                                        <li>Memperoleh data dari halaman alternative</li>
                                    </ul>
                                </div>
                                <div style={{overflowY: "scroll", height: "50vh", display: "block"}}
                                     className={"shadow-sm p-4 border"}>
                                    <h5 className={"text-left mb-4"}>Tabel Alternative</h5>
                                    <Table bordered>
                                        <thead>
                                        <tr>
                                            {titleTable.map((title, index) => {
                                                return <th>{title}</th>
                                            })}
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {alternativeState.alternatives.map((alternative, index) => {
                                            return <tr>
                                                {/*<td>{alternative}</td>*/}
                                                <td width={70}>{index + 1}</td>
                                                <td>{alternative.name}</td>
                                                <td>{alternative.timbulan_sampah}</td>
                                                <td>{alternative.jarak_tpa}</td>
                                                <td>{alternative.jarak_pemukiman}</td>
                                                <td>{alternative.jarak_sungai}</td>
                                                <td>{alternative.partisipasi_masyarakat}</td>
                                                <td>{alternative.cakupan_rumah}</td>
                                                <td>{alternative.aksesibilitas}</td>
                                            </tr>
                                        })}
                                        </tbody>
                                    </Table>
                                </div>
                            </div>}

                            {alternativeState.alternatives.length > 0 ? <div>
                                {state.loading ? <div className={"mx-auto text-center"}><Loading></Loading></div> :
                                    <div className={"col-lg-12 mt-5"}>
                                        <div className={"bg-light p-4 mb-3 rounded"} style={{fontSize: 14}}>
                                            <h5 className={"text-left"}>Langkah kedua</h5>
                                            <ul>
                                                <li>Mengkonversi data alternative dengan nilai bobot sub kriteria</li>
                                            </ul>
                                        </div>
                                        <div style={{overflowY: "scroll", height: "50vh", display: "block"}}
                                             className={"shadow-sm p-4 border"}>
                                            <h5 className={"mb-4"}>Tabel Kriteria</h5>
                                            <Table bordered>
                                                <thead>
                                                <tr>
                                                    {titleTable.map((title, index) => {
                                                        return <th>{title}</th>
                                                    })}
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {state.multiplyPoint!.map((point, index) => {
                                                    return <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{alternativeState.alternatives[index].name}</td>
                                                        {point.map((p, index) => {
                                                            return <td key={index}>{p}</td>
                                                        })}
                                                    </tr>
                                                })}
                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>}
                            </div> : <div></div>}


                            {criteriaState.loading ?
                                <div className={"text-center"}><Loading width={400} height={400}></Loading></div> :
                                <div className={"col-lg-12 mt-5"}>
                                    <div className={"bg-light p-4 mb-3 rounded"} style={{fontSize: 14}}>
                                        <h5 className={"text-left"}>Langkah ketiga</h5>
                                        <ul>
                                            <li>Mendapatkan nilai bobot kriteria dari perhitungan matriks pada halaman
                                                kriteria
                                            </li>
                                        </ul>
                                    </div>
                                    <div style={{overflowY: "scroll", height: "50vh", display: "block"}}
                                         className={"shadow-sm p-4 border"}>
                                        <h5 className={"mb-4"}>Tabel Kriteria</h5>
                                        <Table bordered>
                                            <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Nama Criteria</th>
                                                <th>Bobot Criteria</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {criteriaState.criteria.weights!.map((weight, index) => {
                                                return <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{titleTable[index + 2]}</td>
                                                    <td>{weight}</td>
                                                </tr>
                                            })}
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            }</div> : <div>
                            <div className={"bg-light col-lg-6 p-5 rounded"}>
                                <h5 className={"mb-4"}>Belum dilakukan perhitungan</h5>
                                <ButtonCustom text={"Mulai perhitungan"} onClick={handlerStartCalculate}/>
                            </div>
                        </div>}


                    </div> : <HintEmptyCollection/>}
                </div>

            </Col>
        </Row>
    </div>
}