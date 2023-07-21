import React, {FC, useEffect} from "react";
import {HeaderText} from "../../../components/atoms/HeaderText/HeaderText";
import {ModalCustom} from "../../../components/organisms/ModalCustom/ModalCustom";
import {Button, Form, Table} from "react-bootstrap";
import {useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../app/store";
import {useAppDispatch} from "../../../app/hooks";
import {
    createCollection,
    deleteCollection,
    fetchCollectionByID,
    fetchCollections,
    updateCollection
} from "../store/thunk";
import {Loading} from "../../../components/atoms/Loading/Loading";
import {hideModal, modeModalToUpdate, showModal} from "../../Root/store/slice";
import {clearForm, handlerForm} from "../store/slice";

export const Collections: FC = () => {

    const globalState = useSelector((state: RootState) => state.globalState);
    const state = useSelector((state: RootState) => state.collectionState)

    const dispatch: AppDispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchCollections())
    }, [dispatch])


    const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (globalState.modeModal === "create") {
            await dispatch(createCollection(
                {
                    name: state.form.name!,
                    description: state.form.description!,
                    center: 0,
                    final_score_is_calculated: false,
                    score_is_calculated: false,
                    latitude: 2.341430146180227,
                    longitude: 99.07260893501477,
                }))
        } else {
            await dispatch(updateCollection({
                id: state.selectedCollection!.id,
                name: state.form.name!,
                description: state.form.description!,
                center: 0,
                final_score_is_calculated: false,
                score_is_calculated: false,
                latitude: 2.341430146180227,
                longitude: 99.07260893501477,
            }))
        }

        dispatch(hideModal())
        dispatch(clearForm())
    }


    const handlerUpdate = (id: string) => {
        dispatch(fetchCollectionByID(id))
        dispatch(modeModalToUpdate())
        dispatch(showModal())
    }


    return <>
        <HeaderText text={"Halaman Collections"} boxHeight={30}/>
        <div className={"mt-4"}>

            <ModalCustom
                withButton={true}
                modalTitle={globalState.modeModal === "create" ? "Menambah Collections" : "Mengedit Collections"}
                buttonTitle={"Tambah Collections"} onSubmit={handlerSubmit}
                modalSize={"lg"}>
                <div className={"p-3"}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nama</Form.Label>
                        <Form.Control type="text" onChange={(e) => {
                            dispatch(handlerForm({name: e.target.value}))
                        }} placeholder="Masukkan nama collection"
                                      value={state.form.name}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Deskripsi</Form.Label>
                        <Form.Control type="text" onChange={(e) => {
                            dispatch(handlerForm({description: e.target.value}))
                        }}
                                      placeholder="Masukkan deskripsi"
                                      value={state.form.description}
                        />
                    </Form.Group>
                </div>
            </ModalCustom>


            <div className={"col-lg-10 mx-auto mt-5"}>
                {state.loading ? <Loading width={400} height={400}></Loading> :
                    <Table bordered>
                        <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Deskripsi</th>
                            <th><span className={"bi bi-gear-fill"}></span></th>
                        </tr>
                        </thead>
                        <tbody>
                        {state.collections.map((collection, index) => {
                            return <tr key={index}>
                                <td>{collection.name}</td>
                                <td>{collection.description}</td>
                                <td>
                                    <Button variant={"success"} className={"me-3"}><span
                                        className={"bi bi-pen-fill"} onClick={(e) => {
                                        handlerUpdate(collection.id!)
                                    }}></span></Button>
                                    <Button variant={"danger"} onClick={() => {
                                        dispatch(deleteCollection(collection.id!))
                                    }}><span className={"bi bi-trash-fill"}></span></Button>
                                </td>
                            </tr>
                        })}
                        </tbody>
                    </Table>}

            </div>
        </div>
    </>
}