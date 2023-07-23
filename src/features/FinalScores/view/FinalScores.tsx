import React, {FC, useEffect, useMemo} from "react";
import {HeaderText} from "../../../components/atoms/HeaderText/HeaderText";
import {useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../app/store";
import {useAppDispatch} from "../../../app/hooks";
import {Col, Row, Table} from "react-bootstrap";
import {fetchCollectionByID, fetchCollections} from "../../Collections/store/thunk";
import {clearMarker, setMarker} from "../../Alternatives/store/slice";
import styles from "../../Calculates/view/style.module.css";
import {SideCollection} from "../../../components/organisms/SideCollection/SideCollection";
import {clearSelectedCollection} from "../../Collections/store/slice";
import {fetchCriteria} from "../../Criteria/store/thunk";
import {calculateFinalScores, getFinalScores} from "../store/thunk";
import {HintEmptyCollection} from "../../../components/moleculs/HintEmptyCollection/HintEmptyCollection";
import {ButtonCustom} from "../../../components/atoms/ButtonCustom/ButtonPrimary";
import {Loading} from "../../../components/atoms/Loading/Loading";
import {titleTable} from "../../../shared/helpers/helpers";
import {GoogleMap, InfoWindow, Marker, useLoadScript} from "@react-google-maps/api";
import {env} from "../../../shared/configs/configs";

export const FinalScores: FC = () => {
    const collectionState = useSelector((state: RootState) => state.collectionState)

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: env.GOOGLE_MAPS_API_KEY,
    });

    const state = useSelector((state: RootState) => state.finalScoreState)

    const dispatch: AppDispatch = useAppDispatch()

    useEffect(() => {
        dispatch(clearSelectedCollection())
        dispatch(fetchCollections())
        dispatch(fetchCriteria())
    }, [dispatch])

    const handlerStartCalculate = () => {
        dispatch(calculateFinalScores(collectionState.selectedCollection!.id!))

    }

    const center = useMemo(() => ({lat: 2.341430146180227, lng: 99.07260893501477}), []);

    return <div>
        <HeaderText text={"Halaman hasil akhir"} boxHeight={20}/>
        <Row className={"mt-4"}>
            <Col style={{overflowY: "scroll", display: "block", height: "100vh"}} className={"pe-4"} lg={2}>
                <p>List Collections</p>
                {collectionState.collections.map((collection, index) => {
                    return <div key={collection.id} onClick={async () => {
                        await dispatch(fetchCollectionByID(collection.id!));
                        await dispatch(getFinalScores(collection.id!))

                        dispatch(clearMarker())
                    }}
                                className={`${collectionState.selectedCollection!.id === collection.id ? styles.active : ""} ${styles.hover}`}>
                        <SideCollection text={collection.name!} totalChildren={collectionState.collections.length}/>
                    </div>
                })}

            </Col>
            <Col>
                <div className={"ms-5"}>
                    {collectionState.selectedCollection!.id ? <div>
                        {collectionState.selectedCollection!.final_score_is_calculated ? <div>
                                <h5 className={"text-center mb-5"}>{collectionState.selectedCollection!.name}</h5>

                                {isLoaded && state.finalScore.length > 0 ? <div><GoogleMap
                                    options={{draggableCursor: "crosshair"}}
                                    zoom={12}
                                    center={{lat: state.finalScore[0].latitude!, lng: state.finalScore[0].longitude!,}}

                                    mapContainerClassName={`${styles.mapContainer} mx-auto`}

                                >
                                    {state.finalScore.map((a, index) => {
                                        return <div>
                                            <Marker position={{lat: a.latitude!, lng: a.longitude!,}}><InfoWindow
                                                position={{lat: a.latitude!, lng: a.longitude!,}}>
                                                <div>
                                                    <h5>Rank {index+1}</h5>
                                                    <p>{a.name}</p>
                                                    <p>Lat: {a.latitude}</p>
                                                    <p>Long: {a.latitude}</p>
                                                </div>
                                            </InfoWindow></Marker>
                                        </div>
                                    })}

                                </GoogleMap></div> : <div></div>}

                                {state.loading ? <div><Loading width={400} height={400}/></div> : <div>
                                    <div style={{overflowY: "scroll", height: "60vh", display: "block"}}
                                         className={"shadow-sm p-4 border mt-5"}>
                                        <h5 className={"text-left mb-4"}>Tabel Final Score</h5>
                                        <Table bordered>
                                            <thead>
                                            <tr>
                                                <th>Nama</th>
                                                <th>Rank</th>
                                                <th>Skor Akhir</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {state.finalScore.map((a, index) => {
                                                return <tr key={index}>
                                                    <td>{a.name}</td>
                                                    <td>{index + 1}</td>
                                                    <td>{a.final_scores!.final_score.toFixed(2)}</td>
                                                </tr>
                                            })}
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>}
                            </div> :
                            <div className={"bg-light col-lg-6 p-5 rounded"}>
                                <h5 className={"mb-4"}>Belum dilakukan perhitungan</h5>
                                <ButtonCustom text={"Mulai perhitungan"} onClick={handlerStartCalculate}/>
                            </div>}

                    </div> : <div><HintEmptyCollection/></div>}
                </div>
            </Col>
        </Row>
    </div>
}