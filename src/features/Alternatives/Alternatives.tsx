import React, {FC, useMemo} from "react";
import {GoogleMap, useLoadScript} from "@react-google-maps/api";
import {env} from "../../shared/configs/configs";
import styles from "./style.module.css"
import {Loading} from "../../components/atoms/Loading/Loading";
import {Col} from "react-bootstrap";

export const Alternatives: FC = () => {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: env.GOOGLE_MAPS_API_KEY,
    });
    const center = useMemo(() => ({lat: 2.341430146180227, lng: 99.07260893501477}), []);
    return <div>{!isLoaded ? (
        <Loading/>) : (
        <Col className={"p-5 mx-auto"}>
            <GoogleMap
            center={center}
            zoom={15}
            mapContainerClassName={styles.mapContainer}
        ></GoogleMap>
        </Col>
    )}</div>
}