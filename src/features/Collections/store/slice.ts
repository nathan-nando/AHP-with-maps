import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {collection} from "../../../domain/Collections/model";
import {AxiosError} from "axios";
import {createCollection, deleteCollection, fetchCollectionByID, fetchCollections, updateCollection} from "./thunk";

export interface CollectionState {
    collections: collection[];
    selectedCollection?: collection;
    loading: boolean;
    error: any | AxiosError | null;
    form: formCollection
}

export type formCollection = {
    name?: string,
    description?: string,
}


const initialState: CollectionState = {
    collections: [],
    selectedCollection: {},
    loading: false,
    error: null,
    form: {name: "", description: ""}
}

export const collectionSlice = createSlice({
    name: "collection_slice",
    initialState,
    reducers: {
        handlerForm(state, action: PayloadAction<formCollection>) {
            state.form = Object.assign(state.form, action.payload)
        },

        setUpdateForm(state, action: PayloadAction<formCollection>){
            state.form = action.payload
        },

        clearForm(state) {
            state.form = {name: "", description: ""}
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchCollections.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchCollections.fulfilled, (state, action) => {
            state.loading = false;
            state.collections = action.payload;
        })
        builder.addCase(fetchCollections.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        builder.addCase(fetchCollectionByID.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchCollectionByID.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedCollection = action.payload;
            state.form.name =state.selectedCollection!.name;
            state.form.description =state.selectedCollection!.description;
        })
        builder.addCase(fetchCollectionByID.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        builder.addCase(createCollection.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(createCollection.fulfilled, (state, action) => {
            state.loading = false;
        })
        builder.addCase(createCollection.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        builder.addCase(updateCollection.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(updateCollection.fulfilled, (state, action) => {
            state.loading = false;
        })
        builder.addCase(updateCollection.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        builder.addCase(deleteCollection.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(deleteCollection.fulfilled, (state, action) => {
            state.loading = false;
        })
        builder.addCase(deleteCollection.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

    }
})

export const {handlerForm, clearForm, setUpdateForm} = collectionSlice.actions

export default collectionSlice.reducer