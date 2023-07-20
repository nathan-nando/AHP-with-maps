import {createSlice} from "@reduxjs/toolkit";
import {collection} from "../../../domain/Collections/model";
import {AxiosError} from "axios";

export interface CollectionState {
    collection: collection[];
    selectedCollection: collection;
    loading: boolean;
    error: any | AxiosError | null
}

const initialState: CollectionState = {
    collection: [],
    selectedCollection: {},
    loading: false,
    error: null
}

export const collectionSlice = createSlice({
    name: "collection_slice",
    initialState,
    reducers: {},
})