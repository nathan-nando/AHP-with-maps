import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {alternative} from "../../../domain/Alternatives/model";
import {AxiosError} from "axios";
import {createAlternative, deleteAlternative, fetchAlternatives} from "./thunk";
import {requestCreateAlternative} from "../../../domain/Alternatives/dto";

export interface AlternativeState {
    alternatives: alternative[];
    selectedAlternatives?: alternative;
    loading: boolean;
    error: any | AxiosError | null;
    form: formAlternative;
    marker:marker;
    selectedHint: string;
}

export type marker = {
    lat?:number
    lng?:number
}

export type formAlternative = {
    name?: string,
    timbulanSampah?: string,
    jarakTPA?: string,
    jarakPemukiman?: number,
    jarakSungai?:string,
    partisipasiMasyarakat?:number,
    cakupanRumah?: number,
    aksesibilitas?: string


}

const initialState: AlternativeState = {
    alternatives: [],
    selectedAlternatives: {},
    loading: false,
    error: null,
    form: {},
    marker: {},
    selectedHint: "",
}
export const alternativeSlice = createSlice({
    name: 'alternative_slice',
    initialState,
    reducers: {
        handlerForm(state, action:PayloadAction<formAlternative>){
            state.form = Object.assign(state.form, action.payload)
        },
        clearForm(state){
            state.form ={}
        },
        setMarker(state,action:PayloadAction<marker>){
            state.marker = action.payload
        },
        clearMarker(state){
            state.marker = {}
        },
        setSelectedHint(state, action:PayloadAction<string>){
            state.selectedHint = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAlternatives.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchAlternatives.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(fetchAlternatives.fulfilled, (state, action) => {
            state.loading = false;
            state.alternatives = action.payload;
        })

        builder.addCase(deleteAlternative.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(deleteAlternative.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(deleteAlternative.fulfilled, (state, action) => {
            state.loading = false;
        })

        builder.addCase(createAlternative.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(createAlternative.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(createAlternative.fulfilled, (state, action) => {
            state.loading = false;
        })
    }
})

export const {setMarker, clearMarker, setSelectedHint, clearForm, handlerForm}= alternativeSlice.actions

export default alternativeSlice.reducer