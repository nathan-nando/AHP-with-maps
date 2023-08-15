import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {subCriteria, subCriteriaCR} from "../../../domain/SubCriteria/model";
import {AxiosError} from "axios";
import {checkConsistencySC, fetchSubCriteria, updateSubCriteria} from "./thunk";
import {requestCriteria} from "../../../domain/Criteria/dto";

export interface SubCriteriaState {
    subCriteria: subCriteria;
    loading: boolean;
    consistencyRatio: subCriteriaCR,
    error: any | AxiosError | null,
    selected: number
}

const initialState: SubCriteriaState = {
    selected: 0,
    subCriteria: {},
    loading: false,
    error: null,
    consistencyRatio: {},
}

const slice = createSlice({
    name: "subCriteria_slice",
    initialState,
    reducers: {
        changeCompSC(state, action) {
            state.selected = action.payload
        },
        changeValueSC(state, action: PayloadAction<requestCriteria>) {
            const mode = state.selected
            switch (mode) {
                case 0 : {
                    state.subCriteria.timbulan_sampah!.pairwise.pairwise![action.payload.indexRow][action.payload.indexCol] = action.payload.value
                    state.subCriteria.timbulan_sampah!.pairwise.pairwise![action.payload.indexCol][action.payload.indexRow] = parseFloat((1 / action.payload.value).toFixed(3))
                    break
                }
                case 1 : {
                    state.subCriteria.jarak_tpa!.pairwise.pairwise![action.payload.indexRow][action.payload.indexCol] = action.payload.value
                    state.subCriteria.jarak_tpa!.pairwise.pairwise![action.payload.indexCol][action.payload.indexRow] = parseFloat((1 / action.payload.value).toFixed(3))
                    break
                }
                case 2 : {
                    state.subCriteria.jarak_pemukiman!.pairwise.pairwise![action.payload.indexRow][action.payload.indexCol] = action.payload.value
                    state.subCriteria.jarak_pemukiman!.pairwise.pairwise![action.payload.indexCol][action.payload.indexRow] = parseFloat((1 / action.payload.value).toFixed(3))
                    break
                }
                case 3 : {
                    state.subCriteria.jarak_sungai!.pairwise.pairwise![action.payload.indexRow][action.payload.indexCol] = action.payload.value
                    state.subCriteria.jarak_sungai!.pairwise.pairwise![action.payload.indexCol][action.payload.indexRow] = parseFloat((1 / action.payload.value).toFixed(3))
                    break
                }
                case 4 : {
                    state.subCriteria.partisipasi_masyarakat!.pairwise.pairwise![action.payload.indexRow][action.payload.indexCol] = action.payload.value
                    state.subCriteria.partisipasi_masyarakat!.pairwise.pairwise![action.payload.indexCol][action.payload.indexRow] = parseFloat((1 / action.payload.value).toFixed(3))
                    break
                }
                case 5 : {
                    state.subCriteria.cakupan_rumah!.pairwise.pairwise![action.payload.indexRow][action.payload.indexCol] = action.payload.value
                    state.subCriteria.cakupan_rumah!.pairwise.pairwise![action.payload.indexCol][action.payload.indexRow] = parseFloat((1 / action.payload.value).toFixed(3))
                    break
                }
                case 6 : {
                    state.subCriteria.aksesibilitas!.pairwise.pairwise![action.payload.indexRow][action.payload.indexCol] = action.payload.value
                    state.subCriteria.aksesibilitas!.pairwise.pairwise![action.payload.indexCol][action.payload.indexRow] = parseFloat((1 / action.payload.value).toFixed(3))
                    break
                }
                default : {
                    state.subCriteria.timbulan_sampah!.pairwise.pairwise![action.payload.indexRow][action.payload.indexCol] = action.payload.value
                    state.subCriteria.timbulan_sampah!.pairwise.pairwise![action.payload.indexCol][action.payload.indexRow] = parseFloat((1 / action.payload.value).toFixed(3))
                    break
                }
            }
        }

    },
    extraReducers: builder => {
        builder.addCase(fetchSubCriteria.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchSubCriteria.fulfilled, (state, action) => {
            state.loading = false;
            state.subCriteria = action.payload.data
        })
        builder.addCase(fetchSubCriteria.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        })

        builder.addCase(updateSubCriteria.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(updateSubCriteria.fulfilled, (state, action) => {
            state.loading = false;
            state.subCriteria = action.payload.data
        })
        builder.addCase(updateSubCriteria.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        })

        builder.addCase(checkConsistencySC.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(checkConsistencySC.fulfilled, (state, action) => {
            state.loading = false;
            state.consistencyRatio = action.payload.data
        })
        builder.addCase(checkConsistencySC.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        })

    }
})

export const {changeCompSC, changeValueSC} = slice.actions

export default slice.reducer