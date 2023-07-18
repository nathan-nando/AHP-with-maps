import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "../features/Root/slice";
import criteriaReducer from "../features/Criteria/slice";
import {appLogger} from "../shared/logger/logger";


export const store = configureStore({
    reducer: {
        someState: rootReducer,
        criteriaState: criteriaReducer,
    },
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck: false}).concat(appLogger)
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
