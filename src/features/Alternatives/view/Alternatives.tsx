import React, {FC, useEffect, useMemo} from "react";
import {GoogleMap, InfoWindow, Marker, useLoadScript} from "@react-google-maps/api";
import {env} from "../../../shared/configs/configs";
import styles from "./style.module.css"
import {Loading} from "../../../components/atoms/Loading/Loading";
import {Button, Col, Form, Row, Table} from "react-bootstrap";
import {HeaderText} from "../../../components/atoms/HeaderText/HeaderText";
import {SideCollection} from "../../../components/organisms/SideCollection/SideCollection";
import {useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../app/store";
import {useAppDispatch} from "../../../app/hooks";
import {
    fetchCollectionByID,
    fetchCollections,
} from "../../Collections/store/thunk";
import {clearSelectedCollection} from "../../Collections/store/slice";
import {createAlternative, deleteAlternative, fetchAlternativeByID, fetchAlternatives} from "../store/thunk";
import {titleTable} from "../../../shared/helpers/helpers";
import {hideModal, modeModalToCreate, modeModalToUpdate, showModal} from "../../Root/store/slice";
import {ModalCustom} from "../../../components/organisms/ModalCustom/ModalCustom";
import {clearForm, clearMarker, handlerForm, setMarker, setSelectedHint} from "../store/slice";
import {
    optionAksesibilitas,
    optionJarakSungai,
    optionJarakTPA,
    optionTimbulanSampah
} from "../../../shared/utils/options";
import {HintEmptyCollection} from "../../../components/moleculs/HintEmptyCollection/HintEmptyCollection";

export const Alternatives: FC = () => {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: env.GOOGLE_MAPS_API_KEY,
    });
    const center = useMemo(() => ({lat: 2.341430146180227, lng: 99.07260893501477}), []);

    const collectionState = useSelector((state: RootState) => state.collectionState)

    const globalState = useSelector((state: RootState) => state.globalState)
    const state = useSelector((state: RootState) => state.alternativeState)

    const dispatch: AppDispatch = useAppDispatch()

    useEffect(() => {
        dispatch(clearSelectedCollection())
        dispatch(fetchCollections())
    }, [dispatch])

    const handlerUpdate = (id: string) => {
        dispatch(fetchAlternativeByID(id))
        dispatch(modeModalToUpdate())
        dispatch(showModal())
    }

    const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (globalState.modeModal === "create") {
            console.log(state.form.aksesibilitas)
            console.log(state.form.jarakPemukiman)
            console.log(state.form.jarakSungai)
            await dispatch(createAlternative({
                aksesibilitas: state.form.aksesibilitas,
                cakupan_rumah: state.form.cakupanRumah,
                jarak_pemukiman: state.form.jarakPemukiman,
                jarak_sungai: state.form.jarakSungai,
                jarak_tpa: state.form.jarakTPA,
                latitude: state.marker.lat,
                longitude: state.marker.lng,
                name: state.form.name,
                partisipasi_masyarakat: state.form.partisipasiMasyarakat,
                timbulan_sampah: state.form.timbulanSampah,
                id: collectionState.selectedCollection!.id
            }))
        } else {

        }

        dispatch(hideModal())
        dispatch(clearForm())
    }


    return <div>
        <HeaderText text={"Halaman Alternatives"} boxHeight={30}/>
        <Row className={"mt-4"}>
            <Col style={{overflowY: "scroll", display: "block", height: "100vh"}} className={"pe-4"} lg={2}>
                <p>List Collections</p>
                {collectionState.collections.map((collection, index) => {
                    return <div key={collection.id} onClick={async () => {
                        await dispatch(fetchCollectionByID(collection.id!));
                        await dispatch(fetchAlternatives(collection.id!));
                        dispatch(clearMarker())
                    }} className={`${collectionState.selectedCollection!.id === collection.id ? styles.active : "" } ${styles.hover}`}>
                        <SideCollection text={collection.name!} totalChildren={collectionState.collections.length}/>
                    </div>
                })}

            </Col>
            {collectionState.selectedCollection!.id ? <Col className={"mx-auto"}>{!isLoaded ? (
                <div className={"mx-auto text-center"}><Loading/></div>) : (
                <div className={"mx-auto col-lg-12"}>
                    <h5 className={"text-center mb-5"}>{collectionState.selectedCollection!.name}</h5>
                    <div className={styles.cursor}>
                        <GoogleMap
                            options={{draggableCursor: "crosshair"}}
                            center={center}
                            zoom={13}
                            mapContainerClassName={`${styles.mapContainer} mx-auto`}
                            onClick={(e) => {
                                dispatch(modeModalToCreate())
                                dispatch(setMarker({lat: e.latLng?.lat(), lng: e.latLng?.lng(),}))
                                dispatch(showModal())
                            }}
                        >
                            {state.alternatives.map((a, index) => {
                                return <Marker position={{
                                    lat: a.latitude!,
                                    lng: a.longitude!
                                }} onClick={() => {
                                    dispatch(setSelectedHint(a.id!))
                                }}>{state.selectedHint === a.id ? <InfoWindow key={a.id} position={{
                                    lat: a.latitude!,
                                    lng: a.longitude!
                                }}>
                                    <div><p className={"fw-bold"} style={{fontSize: 18}}>{a.name}</p><p>Lat: {a.latitude}</p><p>Lng: {a.longitude}</p></div>
                                </InfoWindow> : <div></div>} </Marker>
                            })}
                            {Object.keys(state.marker).length === 0 ? <div></div> : <Marker position={{
                                lat: state.marker.lat!, lng: state.marker
                                    .lng!,
                            }} onClick={(e) => {
                                dispatch(modeModalToCreate())
                                dispatch(setMarker({lat: e.latLng?.lat(), lng: e.latLng?.lng(),}))
                                dispatch(showModal())
                            }}></Marker>}

                        </GoogleMap>
                    </div>
                    <h5 className={"text-center mt-5"}>Data Alternative</h5>
                    <div className={"col-lg-10 mt-4 mx-auto"}>
                        <Table bordered>
                            <thead>
                            <tr>
                                {titleTable.map((title, index) => {
                                    return <th>{title}</th>
                                })}
                                <th><span className={"bi bi-gear-fill"}></span></th>
                            </tr>
                            </thead>
                            <tbody>
                            {state.alternatives.map((alternative, index) => {
                                return <tr>
                                    {/*<td>{alternative}</td>*/}
                                    <td width={70}>{index}</td>
                                    <td>{alternative.name}</td>
                                    <td>{alternative.timbulan_sampah}</td>
                                    <td>{alternative.jarak_tpa}</td>
                                    <td>{alternative.jarak_pemukiman}</td>
                                    <td>{alternative.jarak_sungai}</td>
                                    <td>{alternative.partisipasi_masyarakat}</td>
                                    <td>{alternative.cakupan_rumah}</td>
                                    <td>{alternative.aksesibilitas}</td>
                                    <td width={200}><Button variant={"success"} className={"me-3"}><span
                                        className={"bi bi-pen-fill"} onClick={(e) => {
                                        handlerUpdate(alternative.id!)
                                    }}></span></Button>
                                        <Button variant={"danger"} onClick={() => {
                                            dispatch(deleteAlternative(alternative.id!))
                                        }}><span className={"bi bi-trash-fill"}></span></Button></td>
                                </tr>
                            })}
                            </tbody>
                        </Table>
                    </div>
                </div>
            )}</Col> : <HintEmptyCollection/>}

        </Row>
        <ModalCustom
            withButton={false}
            modalTitle={globalState.modeModal === "create" ? "Menambah Alternative" : "Mengedit Alternative"}
            buttonTitle={"Tambah Collections"} onSubmit={handlerSubmit}
            modalSize={"xl"}>
            <div className={"p-3"}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama</Form.Label>
                            <Form.Control type="text" onChange={(e) => {
                                dispatch(handlerForm({name: e.target.value}))
                            }} placeholder="Masukkan nama alternative"
                                          value={state.form.name}/>
                        </Form.Group>

                        <Form.Group className={"mb-3"}>
                            <Form.Label>Timbulan Sampah</Form.Label>
                            <Form.Select onChange={(e) => {
                                console.log(e.target.value)
                                dispatch(handlerForm({timbulanSampah: e.target.value}))
                            }}>
                                {optionTimbulanSampah.map((o, index) => {
                                    return <option value={o.value} disabled={o.disabled}
                                                   selected={o.selected}>{o.text}</option>
                                })}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className={"mb-3"}>
                            <Form.Label>Jarak TPA</Form.Label>
                            <Form.Select onChange={(e) => {
                                dispatch(handlerForm({jarakTPA: e.target.value}))
                            }}>
                                {optionJarakTPA.map((o, index) => {
                                    return <option value={o.value} disabled={o.disabled}
                                                   selected={o.selected}>{o.text}</option>
                                })}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className={"mb-3"}>
                            <Form.Label>Jarak Pemukiman</Form.Label>
                            <Form.Control type={"number"} min={0} max={500}
                                          placeholder={"Jarak pemukiman 0m - 500m"} onChange={(e) => {
                                dispatch(handlerForm({jarakPemukiman: Number(e.target.value)}))
                            }} value={state.form.jarakPemukiman}></Form.Control>
                        </Form.Group>

                        <Form.Group className={"mb-3"}>
                            <Form.Label>Jarak Sungai</Form.Label>
                            <Form.Select onChange={(e) => {
                                dispatch(handlerForm({jarakSungai: e.target.value}))
                            }}>
                                {optionJarakSungai.map((o, index) => {
                                    return <option value={o.value} disabled={o.disabled}
                                                   selected={o.selected}>{o.text}</option>
                                })}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className={"mb-3"}>
                            <Form.Label>Partisipasi Masyarakat</Form.Label>
                            <Form.Control type={"number"} min={0} max={100}
                                          placeholder={"Partisipasi Masyarakat 0% - 100%"} onChange={(e) => {
                                dispatch(handlerForm({partisipasiMasyarakat: Number(e.target.value)}))
                            }} value={state.form.partisipasiMasyarakat}></Form.Control>
                        </Form.Group>

                        <Form.Group className={"mb-3"}>
                            <Form.Label>Cakupan Rumah</Form.Label>
                            <Form.Control type={"number"} min={0} max={200}
                                          placeholder={"Cakupan Rumah 0 - 200"} onChange={(e) => {
                                dispatch(handlerForm({cakupanRumah: Number(e.target.value)}))
                            }} value={state.form.cakupanRumah}></Form.Control>
                        </Form.Group>

                        <Form.Group className={"mb-3"}>
                            <Form.Label>Aksesibilitas</Form.Label>
                            <Form.Select onChange={(e) => {
                                dispatch(handlerForm({aksesibilitas: e.target.value}))
                            }}>
                                {optionAksesibilitas.map((o, index) => {
                                    return <option value={o.value} disabled={o.disabled}
                                                   selected={o.selected}>{o.text}</option>
                                })}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                        <GoogleMap
                            options={{draggableCursor: "crosshair"}}
                            center={{lat: state.marker.lat!, lng: state.marker.lng!,}}
                            zoom={16}
                            mapContainerClassName={`${styles.mapContainer} mx-auto`}
                            onClick={(e) => {
                                dispatch(setMarker({lat: e.latLng?.lat(), lng: e.latLng?.lng(),}))
                            }}

                        >
                            <Marker position={{lat: state.marker.lat!, lng: state.marker.lng!,}}></Marker>
                        </GoogleMap>
                    </Col>
                </Row>

            </div>
        </ModalCustom>
    </div>
}