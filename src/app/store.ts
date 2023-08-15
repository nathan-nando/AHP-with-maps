import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "../features/Root/store/slice";
import criteriaReducer from "../features/Criteria/store/slice";
import subCriteriaReducer from "../features/SubCriteria/store/slice";
import collectionReducer from "../features/Collections/store/slice";
import alternativeReducer from "../features/Alternatives/store/slice";
import calculateReducer from "../features/Calculates/store/slice";
import finalScoreReducer from "../features/FinalScores/store/slice";
import {appLogger} from "../shared/logger/logger";


export const store = configureStore({
    reducer: {
        globalState: rootReducer,
        criteriaState: criteriaReducer,
        subCriteriaState:subCriteriaReducer,
        collectionState: collectionReducer,
        alternativeState: alternativeReducer,
        calculateState: calculateReducer,
        finalScoreState: finalScoreReducer,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(appLogger)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
