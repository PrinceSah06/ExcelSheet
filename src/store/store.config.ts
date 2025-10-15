import {configureStore} from "@reduxjs/toolkit"
import selectedRowsReducer from './selectedRowsSlices'

const store = configureStore({
    reducer:{
        selectedRows : selectedRowsReducer,
    }
});


export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
